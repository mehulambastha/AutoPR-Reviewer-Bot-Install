// app/api/install/route.js
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { Octokit } from '@octokit/rest'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.accessToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { repo } = await request.json()
    const [owner, repo_name] = repo.split('/')

    const octokit = new Octokit({ auth: session.accessToken })

    const { data: webhook } = await octokit.repos.createWebhook({
      owner,
      repo: repo_name,
      config: {
        url: `${process.env.NEXT_PUBLIC_API_URL}/webhook`,
        content_type: 'json',
        secret: process.env.WEBHOOK_SECRET,
      },
      events: ['issues', 'issue_comment', 'pull_request'],
    })

    return new Response(JSON.stringify({
      message: `Bot successfully installed on ${repo}`,
      webhook_id: webhook.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error creating webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

