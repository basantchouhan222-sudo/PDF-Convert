import React from 'react'
import Uploader from './components/Uploader'

export default function App() {
  return (
    <div className="app-container">
      <div className="app-card">
        <h1 className="app-title">PDF Converter</h1>
        <p className="app-subtitle">Drag & drop images or click to select. Convert to a single PDF.</p>
        <Uploader />
      </div>
    </div>
  )
}
