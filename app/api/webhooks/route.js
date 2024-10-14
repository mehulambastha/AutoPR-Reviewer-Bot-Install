// app/api/webhooks/route.js
import { getServerSession } from 'next-auth/next'
import { Octokit } from '@octokit/rest'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.accessToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const octokit = new Octokit({ auth: session.accessToken })
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({ per_page: 100, affiliation: 'owner' })

    const webhooks = []
    for (const repo of repos) {
      const { data: repoWebhooks } = await octokit.repos.listWebhooks({
        owner: repo.owner.login,
        repo: repo.name,
      })

      const filteredWebhooks = repoWebhooks.filter(webhook =>
        webhook.config.url === `${process.env.NEXT_PUBLIC_API_URL}/webhook`
      )

      webhooks.push(...filteredWebhooks.map(webhook => ({
        id: webhook.id,
        repository: repo.full_name,
      })))
    }

    return new Response(JSON.stringify(webhooks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Github API Error: ', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
