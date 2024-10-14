// app/api/repos/route.js
import { getServerSession } from 'next-auth/next'
import { Octokit } from '@octokit/rest'
import { authOptions } from '../auth/[...nextauth]/route.js'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  console.log('Session: ', session)
  if (!session || !session.accessToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const octokit = new Octokit({ auth: session.accessToken })
    const { data } = await octokit.repos.listForAuthenticatedUser({ per_page: 100, affiliation: 'owner' })
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })

  } catch (error) {
    console.error('Github API Error: ', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

}

