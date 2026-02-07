"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/users/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      setMsg(data.message);
    } catch (error) {
      setMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-[#0a0a0a] rounded-2xl shadow-lg border border-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Reset Password
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Enter your new password below.
        </p>

        {!token && (
          <p className="text-red-400 text-center mb-4">
             Invalid or missing reset token.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password || !token}
            className={`w-full p-3 rounded-lg font-medium transition ${
              loading || !password || !token
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-center text-gray-300">{msg}</p>
        )}

        <p className="text-center text-gray-400 mt-6">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-white font-medium hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
