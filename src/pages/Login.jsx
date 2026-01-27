import React from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/Loginimg.png";

import { useState } from "react";

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="dark">

    
    <div className="dark bg-charcoal font-display text-white min-h-screen overflow-hidden">
      <div className="flex min-h-screen w-full">
        {/* LEFT IMAGE SECTION */}
        <div className="relative hidden lg:block w-1/2 overflow-hidden">
          <img
            src={loginBg}
            alt="Career Guidance"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/70 via-primary/20 to-charcoal/80" />

          <div className="absolute top-12 left-12 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/40">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <span className="text-2xl font-bold"> CareerViewX</span>
          </div>

          <div className="absolute bottom-12 left-12 right-12 glass-panel p-8 rounded-2xl max-w-lg">
            <h2 className="text-2xl font-semibold mb-2">Build your future.</h2>
            <p className="text-gray-300 text-sm">
              Access AI-powered career guidance and personalized opportunities tailored to your skills.
            </p>
          </div>
        </div>

        {/* RIGHT LOGIN SECTION */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

          <div className="w-full max-w-md space-y-8 relative z-10">
            {/* HEADER */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-primary uppercase">Step 1 of 4</span>
                <div className="flex gap-1">
                  <div className="h-1 w-8 rounded-full bg-primary" />
                  <div className="h-1 w-8 rounded-full bg-white/10" />
                  <div className="h-1 w-8 rounded-full bg-white/10" />
                  <div className="h-1 w-8 rounded-full bg-white/10" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-400">Sign in to continue your career journey.</p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 ml-1">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary">mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <a href="#forgot_pass" className="text-xs text-primary hover:underline">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary">lock</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 font-bold py-4 px-6 rounded-xl glow-button flex items-center justify-center gap-2 group"
                onClick={(e) => {
                  e.preventDefault();
                  Navigate("/dashboard");
                }}
              >
                Continue
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

            {/* SOCIAL LOGIN */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-white/5" />
              <span className="mx-4 text-xs font-semibold text-gray-500 uppercase">Or login with</span>
              <div className="flex-grow border-t border-white/5" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5 opacity-80"
                />
                Google
              </button>

              <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium">
                <span className="material-symbols-outlined text-[#0A66C2]">person</span>
                LinkedIn
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm">
              New to CareerViewX? <a href="#creat_Account" className="text-primary font-semibold hover:underline">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
