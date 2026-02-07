"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/users/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-[#0a0a0a] rounded-2xl shadow-lg border border-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className={`w-full p-3 rounded-lg font-medium transition ${
              loading || !email
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-gray-300">{message}</p>
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

