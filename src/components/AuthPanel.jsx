import { useState } from 'react'

export default function AuthPanel({ onAuthed }) {
  const [email, setEmail] = useState('')
  const [loginToken, setLoginToken] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [step, setStep] = useState('email')
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const requestLink = async () => {
    const res = await fetch(`${backend}/auth/magiclink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    const data = await res.json()
    setLoginToken(data.login_token || '')
    setStep('verify')
  }

  const verify = async () => {
    const form = new FormData()
    form.append('email', email)
    form.append('token', loginToken)
    const res = await fetch(`${backend}/auth/verify`, { method: 'POST', body: form })
    const data = await res.json()
    if (data.access_token) {
      setAccessToken(data.access_token)
      onAuthed(data.access_token, email)
    }
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white">
      {step === 'email' && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Sign in with magic link</h3>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
          <button onClick={requestLink} className="w-full bg-white text-black rounded px-3 py-2">Send link</button>
        </div>
      )}
      {step === 'verify' && (
        <div className="space-y-3">
          <p className="text-sm text-neutral-400">Email sent (simulated). Paste the one-time code here to sign in.</p>
          <input value={loginToken} onChange={e=>setLoginToken(e.target.value)} placeholder="one-time code" className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
          <button onClick={verify} className="w-full bg-white text-black rounded px-3 py-2">Verify & Sign in</button>
        </div>
      )}
    </div>
  )
}
