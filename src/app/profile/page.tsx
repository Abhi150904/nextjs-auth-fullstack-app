"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<{
    id: string | null;
    email: string | null;
    isVerified: boolean | null;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.replace("/login");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");

      setUserInfo({
        id: res.data.user._id,
        email: res.data.user.email,
        isVerified: res.data.user.isVerified,
      });

      toast.success("User details refreshed");
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
  try {
    const res = await axios.post("/api/users/verifyemail", {
      resend: email,
    });
    toast.success(res.data.message);
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to send link"
    );
  }
};


  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-xl bg-[#0a0a0a] rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Profile Dashboard</h1>
            <p className="text-sm text-gray-400">
              Manage your account details
            </p>
          </div>
        </div>

        {userInfo && (
          <div
            className={`rounded-xl p-4 mb-5 border ${
              userInfo.isVerified
                ? "bg-[#051405] border-green-800"
                : "bg-[#120f00] border-yellow-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`font-medium ${
                    userInfo.isVerified
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {userInfo.isVerified
                    ? " Account Verified"
                    : " Account Unverified"}
                </p>

                <p
                  className={`text-sm mt-1 ${
                    userInfo.isVerified
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {userInfo.isVerified
                    ? "Your email has been successfully verified."
                    : "Please verify your email to access all features."}
                </p>
              </div>

              {!userInfo.isVerified && (
                <button
                  onClick={() =>
                    resendVerification(userInfo.email || "")
                  }
                  disabled={!userInfo.email}
                  className="px-4 py-2 bg-[#0a0a0a] border border-yellow-700 text-yellow-400 rounded-lg text-sm hover:bg-[#120f00]"
                >
                  Send Link
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-[#050505] border border-gray-800 rounded-xl p-4 mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">USER IDENTITY</span>
            <button
              onClick={getUserDetails}
              disabled={loading}
              className="text-sm text-gray-400 hover:text-white"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {userInfo?.id ? (
            <Link
              href={`/profile/${userInfo.id}`}
              className="block w-full p-2 bg-black border border-gray-700 rounded-lg text-green-400 font-mono text-sm break-all"
            >
              {userInfo.id}
            </Link>
          ) : (
            <div className="w-full p-2 bg-black border border-gray-700 rounded-lg text-gray-500 text-sm">
              Loading user details...
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-5">
          <button
            onClick={logout}
            className="flex-1 py-2 rounded-lg bg-[#120505] border border-red-800 text-red-400 hover:bg-[#1a0808]"
          >
            Logout
          </button>

          <Link
            href="/"
            className="flex-1 text-center py-2 rounded-lg bg-black border border-gray-700 text-gray-300 hover:bg-gray-900"
          >
            Home Page →
          </Link>
        </div>
      </div>
    </div>
  );
}
