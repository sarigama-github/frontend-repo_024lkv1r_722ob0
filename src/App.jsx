import { useState } from 'react'
import Hero from './components/Hero'
import AuthPanel from './components/AuthPanel'
import Dashboard from './components/Dashboard'

function App() {
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)

  const onAuthed = (t, e) => {
    setToken(t)
    setEmail(e)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <main className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
        {!token ? (
          <div className="grid md:grid-cols-2 gap-6">
            <AuthPanel onAuthed={onAuthed} />
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Why Finanalyzer?</h3>
              <ul className="list-disc list-inside text-neutral-300 text-sm space-y-1">
                <li>Magic-link login, no passwords to forget</li>
                <li>Secure, encrypted file storage</li>
                <li>AI-powered analysis and chat with context</li>
                <li>Export or delete your data anytime</li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">Not financial advice. For educational purposes.</p>
            </div>
          </div>
        ) : (
          <Dashboard token={token} email={email} />
        )}
      </main>
    </div>
  )
}

export default App
