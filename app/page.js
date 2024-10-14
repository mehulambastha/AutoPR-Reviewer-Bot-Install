// app/page.js
'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import RepoSelector from './components/RepoSelector'

export default function Home() {
  const { data: session } = useSession()
  const [repos, setRepos] = useState([])
  const [selectedRepo, setSelectedRepo] = useState('')
  const [installationStatus, setInstallationStatus] = useState('')

  useEffect(() => {
    if (session) {
      fetchRepos()
    }
  }, [session])

  const fetchRepos = async () => {
    console.log('ABOUT TO FETCH')
    const response = await fetch('/api/repos')
    const data = await response.json()
    console.log('Fetched Repos: ', data)
    setRepos(data)
  }

  const handleInstall = async () => {
    const response = await fetch('/api/install', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repo: selectedRepo }),
    })
    const data = await response.json()
    setInstallationStatus(data.message)
  }

  if (!session) {
    return (
      <div>
        <h1>GitHub PR Bot</h1>
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <button onClick={() => signOut()}>Sign out</button>
      <h2>Your Repositories</h2>
      <RepoSelector repos={repos} setSelectedRepo={setSelectedRepo} />
      <button onClick={handleInstall} disabled={!selectedRepo}>
        Install Bot
      </button>
      {installationStatus && <p>{installationStatus}</p>}
    </div>
  )
}

