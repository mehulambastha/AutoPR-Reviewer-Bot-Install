'use client'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import RepoSelector from './components/RepoSelector'
import WebhookList from './components/WebhookList'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const { data: session } = useSession()
  const [repos, setRepos] = useState([])
  const [selectedRepo, setSelectedRepo] = useState('')
  const [isLoadingRepos, setIsLoadingRepos] = useState(false)
  const [isLoadingWebhooks, setIsLoadingWebhooks] = useState(false)
  const [webhooks, setWebhooks] = useState([])

  useEffect(() => {
    if (session) {
      fetchRepos()
      fetchWebhooks()
    }
  }, [session])

  const fetchRepos = async () => {
    setIsLoadingRepos(true)
    try {
      const response = await fetch('/api/repos')
      const data = await response.json()
      setRepos(data)
    } catch (error) {
      toast.error('Failed to fetch repositories')
    }
    setIsLoadingRepos(false)
  }

  const fetchWebhooks = async () => {
    setIsLoadingWebhooks(true)
    try {
      const response = await fetch('/api/webhooks')
      const data = await response.json()
      setWebhooks(data)
    } catch (error) {
      toast.error('Failed to fetch webhooks')
    }
    setIsLoadingWebhooks(false)
  }

  const handleInstall = async () => {
    setIsLoadingWebhooks(true)
    try {
      const response = await fetch('/api/install', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repo: selectedRepo }),
      })
      const data = await response.json()
      toast.success(data.message)
      fetchWebhooks() // Refresh the webhook list after installation
    } catch (error) {
      toast.error('Failed to install bot')
    }
    setIsLoadingWebhooks(false)
  }

  const handleUninstall = async (repo, webhookId) => {
    setIsLoadingWebhooks(true)
    try {
      const response = await fetch('/api/uninstall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repo, webhookId }),
      })
      const data = await response.json()
      toast.success(data.message)
      fetchWebhooks() // Refresh the webhook list after uninstallation
    } catch (error) {
      toast.error('Failed to uninstall bot')
    }
    setIsLoadingWebhooks(false)
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">GitHub PR Bot</h1>
          <button
            onClick={() => signIn('github')}
            className="px-4 py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {session.user.name}</h1>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            Sign out
          </button>
        </div>
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Your Repositories</h2>
          <RepoSelector repos={repos} setSelectedRepo={setSelectedRepo} isLoading={isLoadingRepos} />
          <button
            onClick={handleInstall}
            disabled={!selectedRepo || isLoadingRepos}
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoadingWebhooks ? 'Installing...' : 'Install Bot'}
          </button>
        </div>
        <div className="p-6 bg-white relative rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Installed Webhooks</h2>
          {
            isLoadingWebhooks &&
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          }
          <WebhookList webhooks={webhooks} onUninstall={handleUninstall} isLoading={isLoadingWebhooks} />
        </div>
      </div>
    </div>
  )
}
