"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyUserEmail = async (token: string) => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Email verified successfully");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Invalid or expired verification link"
      );
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("No verification token found in URL");
      setLoading(false);
      return;
    }

    verifyUserEmail(token);
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-[#0a0a0a] rounded-2xl shadow-lg border border-gray-800 text-center">
        <h1 className="text-2xl font-semibold mb-2">Verify Email</h1>
        <p className="text-gray-400 mb-6">
          We are verifying your email address...
        </p>

        {loading && (
          <div className="text-gray-400 mb-4">
            ⏳ Verifying your email...
          </div>
        )}

        {verified && (
          <div>
            <div className="text-green-400 text-lg mb-4">
              ✅ Email Verified Successfully!
            </div>
        <Link href="/profile">Go to Profile</Link>


          </div>
        )}

        {error && (
          <div>
            <div className="text-red-400 text-lg mb-4">
              ❌ {error}
            </div>
            <Link
              href="/signup"
              className="text-gray-400 hover:text-white underline"
            >
              Create a new account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
