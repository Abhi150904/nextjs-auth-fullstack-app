export default async function UserProfile({ params }: any) {
  const { id } = await params;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-lg p-8 bg-[#0a0a0a] rounded-2xl shadow-lg border border-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-2">
          User Profile
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Dynamic profile page
        </p>

        <div className="border border-gray-800 rounded-xl p-4 bg-black">
          <p className="text-gray-400 text-sm mb-2">User ID</p>
          <p className="text-green-400 break-all font-mono">{id}</p>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/profile"
            className="text-gray-400 hover:text-white underline"
          >
            ← Back to Profile
          </a>
        </div>
      </div>
    </div>
  );
}
