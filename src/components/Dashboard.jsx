import { useEffect, useState } from 'react'

export default function Dashboard({ token }) {
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    const res = await fetch(`${backend}/files`, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    setFiles(data.files || [])
  }

  useEffect(()=>{ load() }, [])

  const onUpload = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 50*1024*1024) { alert('Max 50MB'); return }
    setUploading(true)
    const form = new FormData()
    form.append('pdf', f)
    const res = await fetch(`${backend}/files/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
    setUploading(false)
    await load()
  }

  const onDrop = async (ev) => {
    ev.preventDefault()
    const f = ev.dataTransfer.files?.[0]
    if (!f) return
    const fake = { target: { files: [f] } }
    onUpload(fake)
  }

  return (
    <div className="space-y-6">
      <div id="upload" onDragOver={e=>e.preventDefault()} onDrop={onDrop} className="border-2 border-dashed border-neutral-700 bg-neutral-900 rounded-xl p-6 text-center">
        <p className="text-neutral-300">Drag and drop a PDF here, or</p>
        <div className="mt-3">
          <input type="file" accept="application/pdf" onChange={onUpload} className="hidden" id="filepick" />
          <label htmlFor="filepick" className="inline-block px-4 py-2 rounded bg-white text-black cursor-pointer">Choose file</label>
        </div>
        {uploading && <p className="mt-2 text-sm text-neutral-400">Uploading...</p>}
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl">
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="font-semibold text-white">Your files</h3>
          <span className="text-xs text-neutral-400">Auto-deletes after 30 days</span>
        </div>
        <div className="divide-y divide-neutral-800">
          {files.length === 0 && (
            <div className="p-4 text-neutral-400">No files yet.</div>
          )}
          {files.map(f => (
            <div key={f._id} className="p-4 text-sm text-neutral-300 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-white font-medium">{f.filename}</div>
                <div className="text-xs text-neutral-500">{Math.round((f.size_bytes||0)/1024)} KB</div>
              </div>
              <div>
                <div className="text-neutral-400">Uploaded</div>
                <div className="text-white">{new Date(f.upload_date).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-neutral-400">Status</div>
                <div className="text-white">{f.status || 'processing'}</div>
              </div>
              <div>
                <div className="text-neutral-400">Last queried</div>
                <div className="text-white">{f.last_queried ? new Date(f.last_queried).toLocaleString() : '-'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
