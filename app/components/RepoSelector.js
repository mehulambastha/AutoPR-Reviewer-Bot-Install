// app/components/RepoSelector.js
export default function RepoSelector({ repos, setSelectedRepo, isLoading }) {
  return (
    <div className="relative">
      <select
        onChange={(e) => setSelectedRepo(e.target.value)}
        disabled={isLoading}
        className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a repository</option>
        {Array.isArray(repos) && repos.map((repo) => (
          <option key={repo.id} value={repo.full_name}>
            {repo.full_name}
          </option>
        ))}
      </select>
      {isLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </div>
  )
}
