"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="w-full border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* PROJECT NAME (LEFT) */}
          <div className="text-xl font-semibold tracking-wide">
            AuthForge
          </div>

          {/* LOGOUT (RIGHT) */}
          <button
            onClick={logout}
            className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <div className="inline-block mb-6 px-4 py-1 text-sm bg-blue-900/30 text-blue-400 rounded-full">
            v2.0 is now live
          </div>

          <h1 className="text-5xl font-semibold leading-tight mb-4">
            
            <span className="text-blue-400">AuthForge</span> - Secure. Scalable. Built for Developers.
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            A modern authentication platform that handles the hard security work,
            so you can ship features faster and with confidence.
          </p>

          <Link
            href="/profile"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Go to Dashboard →
          </Link>
        </div>
      </main>

      <section className="max-w-6xl mx-auto px-6 pb-20 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-2">🔐 Secure Auth</h3>
          <p className="text-sm text-gray-400">
            Cookie-based authentication with protected routes and middleware.
          </p>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-2">⚡ Fast & Modern</h3>
          <p className="text-sm text-gray-400">
            Built using the Next.js App Router with clean API routes and
            scalable structure.
          </p>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-2">📧 Email Flows</h3>
          <p className="text-sm text-gray-400">
            Built-in email verification and password reset using Mailtrap.
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Abhinav Sinha
          </p>
        </div>
      </footer>
    </div>
  );
}
