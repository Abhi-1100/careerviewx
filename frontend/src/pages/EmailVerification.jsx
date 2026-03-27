import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail, resendVerificationEmail } from "../Services/api";
import { ThemeContext } from "../context/ThemeContext";
import { getCurrentUser } from "../utils/auth";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isDarkMode } = useContext(ThemeContext);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showResendForm, setShowResendForm] = useState(false);
  const [resendEmail, setResendEmail] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const userEmail = getCurrentUser()?.email || "";

    if (!tokenFromUrl) {
      setError("Invalid verification link. Please check the link in your email.");
      setShowResendForm(true);
    } else {
      setToken(tokenFromUrl);
      setEmail(userEmail);
      // Auto-verify if token is present
      verifyTokenAutomatically(tokenFromUrl);
    }
  }, [searchParams]);

  const verifyTokenAutomatically = async (verificationToken) => {
    setVerifying(true);
    try {
      const response = await verifyEmail(verificationToken);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      } else {
        setError(response.data.message || "Failed to verify email");
        setShowResendForm(true);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to verify email. Link may have expired.";
      setError(errorMsg);
      setShowResendForm(true);
    } finally {
      setVerifying(false);
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!resendEmail) {
        setError("Please enter your email address");
        setLoading(false);
        return;
      }

      const response = await resendVerificationEmail(resendEmail);

      if (response.data.success) {
        setSuccess(true);
        setResendEmail("");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        setError(response.data.message || "Failed to resend verification email");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to resend verification email.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`font-display min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
      <div className={`max-w-md w-full rounded-2xl p-8 ${isDarkMode ? "bg-card-dark border border-primary/10" : "bg-white border border-border-light shadow-sm"}`}>
        {/* VERIFYING STATE */}
        {verifying && !success && !error && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Verifying Email</h1>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                Please wait while we verify your email address...
              </p>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {success && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-green-500 text-4xl">check_circle</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                Your email has been successfully verified. Redirecting to dashboard...
              </p>
            </div>
          </div>
        )}

        {/* ERROR/RESEND STATE */}
        {(error || showResendForm) && !success && (
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-start gap-3">
                <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">error</span>
                <p>{error}</p>
              </div>
            )}

            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                Didn't receive the verification email? No problem! Enter your email and we'll send it again.
              </p>
            </div>

            <form onSubmit={handleResendVerification} className="space-y-4">
              <div className="space-y-1.5">
                <label className={`block text-xs font-medium ml-1 ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  Email Address
                </label>
                <div className="relative group">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined group-focus-within:text-primary transition-colors text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                    mail
                  </span>
                  <input
                    type="email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={loading}
                    className={`w-full rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-600 disabled:opacity-50" : "bg-slate-50 border border-slate-300 text-charcoal focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-slate-400 disabled:opacity-50"}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                {loading ? "Sending..." : "Resend Verification Email"}
                {!loading && <span className="material-symbols-outlined text-sm">send</span>}
              </button>
            </form>

            <div className={`text-center text-xs ${isDarkMode ? "text-gray-500" : "text-slate-600"}`}>
              <p>
                Already verified?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-primary font-bold hover:underline"
                >
                  Go to Login
                </button>
              </p>
            </div>
          </div>
        )}

        {/* HELP TEXT */}
        {!error && !showResendForm && (
          <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-200"}`}>
            <p className={`text-xs ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
              <span className="font-semibold">💡 Tip:</span> Check your spam or promotions folder if you don't see the verification email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
