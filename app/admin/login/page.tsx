"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Zap, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setAttempts((a) => a + 1);
        setError(data.error ?? "Invalid password.");
        setPassword("");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-5">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/8 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div className="relative rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl p-8">
          {/* Top gradient line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-600/20 border border-white/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-violet-400" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                <Zap className="h-2.5 w-2.5 text-violet-400 fill-violet-400" />
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-black text-white tracking-tight">Admin Panel</h1>
            <p className="font-mono text-xs text-zinc-600 mt-1">
              aiforge.dev · restricted access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  autoFocus
                  className="
                    w-full bg-black/40 border border-white/8 rounded-xl
                    px-4 py-3 pr-11 text-sm text-white
                    placeholder:text-zinc-700 font-mono
                    outline-none focus:border-violet-500/50
                    transition-colors duration-200
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="font-mono text-xs text-red-400">{error}</span>
                  {attempts >= 3 && (
                    <span className="ml-auto font-mono text-[10px] text-red-500/60">
                      {attempts} attempts
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading || !password}
              whileHover={{ scale: loading || !password ? 1 : 1.02 }}
              whileTap={{ scale: loading || !password ? 1 : 0.97 }}
              className="
                w-full flex items-center justify-center gap-2
                py-3 rounded-xl font-mono text-sm font-bold tracking-wide
                bg-gradient-to-r from-violet-600 to-cyan-500
                text-white shadow-lg shadow-violet-500/25
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-shadow hover:shadow-violet-500/40
              "
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full block"
                  />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  Unlock Panel
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center font-mono text-[10px] text-zinc-700">
            This page is not linked from the public site
          </p>
        </div>
      </motion.div>
    </main>
  );
}