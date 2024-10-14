# GitHub PR Bot - Next.js Application

This Next.js application allows users to install a GitHub PR bot on their repositories. The bot can be easily installed and uninstalled, and users can manage their installations through a user-friendly interface.

## Key Features

1. GitHub OAuth authentication
2. List user's GitHub repositories
3. Install bot on selected repositories
4. View list of repositories with installed bot
5. Uninstall bot from repositories
6. Responsive and user-friendly interface

## Tech Stack

- Next.js 13 (App Router)
- React
- NextAuth.js for authentication
- Octokit for GitHub API interactions
- Tailwind CSS for styling
- React Hot Toast for notifications

## Setup Process

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A GitHub account
- A GitHub OAuth App (for authentication)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/mehulambastha/AutoPR-Reviewer-Bot-Install.git
   cd AutoPR-Reviewer-Bot-Install
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env.local` file in the root directory (see Environment Variables section below)

4. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root directory of your project and add the following variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

GITHUB_ID=your_github_oauth_app_client_id
GITHUB_SECRET=your_github_oauth_app_client_secret

NEXT_PUBLIC_API_URL=http://localhost:3000/api

WEBHOOK_SECRET=your_webhook_secret
```

### How to obtain the required keys/tokens/secrets:

1. `NEXTAUTH_SECRET`: This is a random string used to hash tokens and sign cookies. You can generate it using this command:
   ```
   openssl rand -base64 32
   ```

2. `GITHUB_ID` and `GITHUB_SECRET`:
   - Go to your GitHub account settings
   - Navigate to "Developer settings" > "OAuth Apps"
   - Click "New OAuth App"
   - Fill in the application details:
     - Application name: "GitHub PR Bot" (or your preferred name)
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Click "Register application"
   - You'll see the `Client ID` (GITHUB_ID) and you can generate a new `Client Secret` (GITHUB_SECRET)

3. `NEXT_PUBLIC_API_URL`: This should be the base URL of your API. For local development, it's typically `http://localhost:3000/api`.

4. `WEBHOOK_SECRET`: This is a secret key used to secure your webhook endpoints. Generate a random string (you can use the same method as for NEXTAUTH_SECRET).

## Usage

1. Start the application and navigate to http://localhost:3000
2. Sign in with your GitHub account
3. You'll see a list of your repositories
4. Select a repository and click "Install Bot" to install the bot
5. The installed webhooks section will show repositories where the bot is installed
6. Click "Remove" next to a repository to uninstall the bot

## API Routes

- `/api/auth/[...nextauth]`: Handles authentication
- `/api/repos`: Fetches user's repositories
- `/api/webhooks`: Fetches installed webhooks
- `/api/install`: Installs the bot on a repository
- `/api/uninstall`: Uninstalls the bot from a repository

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
