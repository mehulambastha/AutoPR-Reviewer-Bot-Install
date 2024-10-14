// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: { scope: 'repo' },
      },
      httpOptions: {
        timeout: 10000,
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      try {
        if (account) {
          token.accessToken = account.access_token
          console.log('Access token set: ', token.accessToken)
        }
        return token
      } catch (error) {
        console.error('Error in jwt callback:', error)
        return token
      }
    },
    async session({ session, token }) {
      try {
        session.accessToken = token.accessToken
        console.log('Sessoin Access Token: ', session.accessToken)
        return session
      } catch (error) {
        console.error('Error in session callback:', error)
        return session
      }
    }
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

