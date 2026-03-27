import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/Loginimg.png";
import { forgotPassword } from "../Services/api";
import { ThemeContext } from "../context/ThemeContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email) {
        setError("Please enter your email address");
        setLoading(false);
        return;
      }

      const response = await forgotPassword(email);

      if (response.data.success) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(response.data.message || "Failed to send password reset email");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to process request. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`font-display min-h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
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
            <img src="/logo.png" alt="CareerviewX Logo" className="w-10 h-10 rounded-xl" />
            <span className="text-2xl font-bold text-white">CareerviewX</span>
          </div>

          <div className={`absolute bottom-12 left-12 right-12 p-8 rounded-2xl max-w-lg ${isDarkMode ? "bg-white/10 backdrop-blur-md" : "bg-white/10 backdrop-blur-md"}`}>
            <h2 className="text-2xl font-semibold mb-2 text-white">Reset your password.</h2>
            <p className="text-gray-200 text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
        </div>

        {/* RIGHT FORGOT PASSWORD SECTION */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden ${isDarkMode ? "bg-background-dark" : "bg-surface-light"}`}>
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

          <div className="w-full max-w-md relative z-10">
            <div className="space-y-6">
              {/* HEADER */}
              <div className="space-y-2">
                <h1 className={`text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"}`}>Forgot Password?</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                  No worries! Just enter your email and we'll send you a password reset link.
                </p>
              </div>

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 text-sm flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <p className="font-medium">Email sent successfully!</p>
                    <p className="text-xs mt-1">Check your email for the password reset link. Redirecting to login...</p>
                  </div>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">error</span>
                  <p>{error}</p>
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* EMAIL */}
                <div className="space-y-1.5">
                  <label className={`block text-xs font-medium ml-1 ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                    Email Address
                  </label>
                  <div className="relative group">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined group-focus-within:text-primary transition-colors text-sm ${isDarkMode ? "text-gray-500 group-focus-within:text-primary" : "text-gray-400"}`}>
                      mail
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      disabled={loading || success}
                      className={`w-full rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-600 disabled:opacity-50" : "bg-slate-50 border border-slate-300 text-charcoal focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-slate-400 disabled:opacity-50"}`}
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm mt-6"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                  {!loading && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                </button>

                {/* BACK TO LOGIN */}
                <p className={`text-center text-xs ${isDarkMode ? "text-gray-500" : "text-slate-600"}`}>
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-primary font-bold hover:underline"
                  >
                    Back to Login
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
