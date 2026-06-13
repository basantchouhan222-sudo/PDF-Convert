import React, { useState, useRef } from 'react'
import axios from 'axios'

function Spinner() {
  return <div className="loader" />
}

export default function Uploader() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const inputRef = useRef()

  function onFilesSelected(e) {
    setError(null)
    const list = Array.from(e.target.files || [])
    setFiles(list)
  }

  function onDrop(e) {
    e.preventDefault()
    const list = Array.from(e.dataTransfer.files || [])
    setFiles(list)
  }

  async function upload() {
    setError(null)
    if (!files.length) return setError('Please select at least one image')
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    for (const f of files) {
      if (!allowed.includes(f.type)) return setError('Unsupported file type: ' + f.name)
      if (f.size > 10 * 1024 * 1024) return setError('File too large: ' + f.name)
    }

    const fd = new FormData()
    files.forEach(f => fd.append('images', f))

    try {
      setLoading(true)
      setProgress(0)
      setDownloadUrl(null)
      const res = await axios.post('https://backend-lovat-kappa-12.vercel.app/api/convert', fd, {
        responseType: 'blob',
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100))
        }
      })

      const blob = new Blob([res.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      setDownloadUrl(url)
    } catch (e) {
      setError(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="dropzone"
        onClick={() => inputRef.current.click()}
      >
        <input ref={inputRef} type="file" multiple accept="image/*" onChange={onFilesSelected} className="hidden" />
        <p className="dropzone-text">Drop images here or click to select</p>
        {files.length > 0 && (
          <div className="file-grid">
            {files.map((f, i) => (
              <div key={i} className="file-item">
                <img src={URL.createObjectURL(f)} alt={f.name} className="file-thumb" />
                <div className="file-name">{f.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="error-text">{error}</div>}

      <div className="actions">
        <button onClick={upload} disabled={loading} className="action-button">
          {loading ? <Spinner /> : 'Convert to PDF'}
        </button>
        {loading && <div className="progress-text">Uploading... {progress}%</div>}
        {downloadUrl && (
          <a href={downloadUrl} download="converted.pdf" className="download-link">Download PDF</a>
        )}
      </div>
    </div>
  )
}
