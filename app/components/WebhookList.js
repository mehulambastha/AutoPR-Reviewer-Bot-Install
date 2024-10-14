// app/components/WebhookList.js
export default function WebhookList({ webhooks, onUninstall, isLoading }) {
  return (
    <div>
      {
        (webhooks.length === 0 && isLoading) ? (
          <p className="text-gray-600">No webhooks installed yet.</p>
        ) : (
          <ul className="space-y-4">
            {webhooks.map((webhook) => (
              <li key={webhook.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">{webhook.repository}</span>
                <button
                  onClick={() => onUninstall(webhook.repository, webhook.id)}
                  disabled={isLoading}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Removing...' : 'Remove'}
                </button>
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}
