
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/authContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf3ef] px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#dce7df] bg-white shadow-xl">
        <div className="bg-[#104735] px-8 py-9 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-[#b4ff35]">
            <LockKeyhole size={27} />
          </div>

          <h1 className="font-serif text-2xl font-bold text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-[#d1e2d8]">
            Sign in to manage your Specterra website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#173c2d]"
            >
              Admin Email
            </label>

            <div className="flex items-center rounded-lg border border-[#d5e0d9] px-3 focus-within:border-[#57951e]">
              <Mail size={18} className="text-[#57951e]" />

              <input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#173c2d]"
            >
              Password
            </label>

            <div className="flex items-center rounded-lg border border-[#d5e0d9] px-3 focus-within:border-[#57951e]">
              <LockKeyhole size={18} className="text-[#57951e]" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-[#65756b] hover:text-[#104735]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#104735] py-3 font-semibold text-white transition hover:bg-[#17613e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-sm text-[#607067] transition hover:text-[#104735]"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>
        </form>
      </div>
    </main>
  );
}
