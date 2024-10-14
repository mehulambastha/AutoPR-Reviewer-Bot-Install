// app/auth/signin/page.js
'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <div>
      <h1>Sign in to GitHub PR Bot</h1>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
    </div>
  )
}

