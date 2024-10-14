// app/components/RepoSelector.js
export default function RepoSelector({ repos, setSelectedRepo }) {
  return (
    <select onChange={(e) => setSelectedRepo(e.target.value)}>
      <option value="">Select a repository</option>
      {Array.isArray(repos) && repos && repos.map((repo) => (
        <option key={repo.id} value={repo.full_name}>
          {repo.full_name}
        </option>
      ))}
    </select>
  )
}

