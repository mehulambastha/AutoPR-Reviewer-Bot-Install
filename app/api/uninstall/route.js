// app/api/uninstall/route.js
import { getServerSession } from 'next-auth/next'
import { Octokit } from '@octokit/rest'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.accessToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { repo, webhookId } = await request.json()
    const [owner, repo_name] = repo.split('/')

    const octokit = new Octokit({ auth: session.accessToken })
    await octokit.repos.deleteWebhook({
      owner,
      repo: repo_name,
      hook_id: webhookId,
    })

    return new Response(JSON.stringify({
      message: `Bot successfully uninstalled from ${repo}`,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error deleting webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
