const fs = require('fs').promises;

async function deleteFiles(paths = []) {
  const deletes = paths.map(async p => {
    try {
      await fs.unlink(p);
    } catch (e) {
      // ignore if file already removed
    }
  });
  await Promise.all(deletes);
}

module.exports = { deleteFiles };
