"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-950 px-4">
      <div className="w-full max-w-md border border-charcoal-700 p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          <span className="gold-text">AdSphere</span> Admin
        </h1>
        <p className="text-charcoal-400 text-center text-sm mb-8">
          Secure administration dashboard
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-charcoal-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-charcoal-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-3 py-2 text-white focus:border-gold-500 outline-none"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-500 text-charcoal-950 font-semibold rounded-sm hover:bg-gold-400 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-xs text-charcoal-500 text-center mt-6">
          Default: admin@adsphereawards.com / Admin@AdSphere2027
        </p>
      </div>
    </div>
  );
}
