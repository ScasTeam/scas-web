"use client";

import Link from "next/link";

interface LoginFormProps {
  onGoogleLogin: () => void;
  onEmailLogin: (e: React.FormEvent) => void;
  isLoading: boolean;
  email: string;
  setEmail: (email: string) => void;
  password?: string;
  setPassword?: (password: string) => void;
}

export default function LoginForm({
  onGoogleLogin,
  onEmailLogin,
  isLoading,
  email,
  setEmail,
  password,
  setPassword,
}: LoginFormProps) {
  return (
    <div className="z-10 w-full max-w-md flex flex-col items-center">
      <header className="text-center mb-16">
        <h1 className="font-days text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-8">
          SCAS <br /> Portal.
        </h1>
        <p className="font-abel text-lg opacity-60 uppercase tracking-[0.2em] max-w-xs mx-auto">
          Identify yourself to continue.
        </p>
      </header>

      <div className="w-full relative group mb-6">
        <form onSubmit={onEmailLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword?.(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black font-days text-xs uppercase tracking-[0.2em] py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In / Sign Up"}
          </button>
        </form>
      </div>

      <div className="flex items-center w-full gap-4 mb-6 opacity-50">
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-xs uppercase tracking-widest font-abel">or</span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>

      <div className="relative group w-full">
        <div className="absolute -inset-4 border border-white/5 rounded-[2rem] pointer-events-none transition-all duration-700 group-hover:border-white/10"></div>

        <button
          onClick={onGoogleLogin}
          disabled={isLoading}
          type="button"
          className="relative w-full bg-transparent border border-white/20 text-white font-days text-xs uppercase tracking-[0.2em] py-4 rounded-xl flex items-center justify-center gap-4 hover:bg-white/5 active:scale-95 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <span className="animate-pulse">Authorizing...</span>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google SSO
            </>
          )}
        </button>
      </div>


    </div>
  );
}
