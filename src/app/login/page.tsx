"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'



export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile");
        }catch(error: any) {
            toast.error("Something went wrong");
        }
        finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
       if (user.email.length > 0 && user.password.length > 0) {
           setButtonDisabled(false);
       } 
       else {
           setButtonDisabled(true);
       }
    },[user])
    return(
     <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-[#0a0a0a] rounded-2xl shadow-lg border border-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-2">Login</h1>
        <p className="text-gray-400 text-center mb-6">
          Welcome back! Please sign in.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              placeholder="you@example.com"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              placeholder="••••••••"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgotpassword"
              className="text-sm text-gray-400 hover:text-white"
            >
              Forgot password?
            </Link>
          </div>

          <button
            onClick={onLogin}
            disabled={buttonDisabled || loading}
            className={`w-full p-3 rounded-lg font-medium transition ${
              buttonDisabled || loading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-white font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
    )
}