import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/Loginimg.png";
import OptionCard from "../components/OptionCard";
import { signup as signupAPI, login as loginAPI, updateProfile } from "../Services/api";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  // ============= LOGIN STATE =============
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // ============= SIGNUP STATE =============
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // ============= PROFILE SETUP STATE =============
  const [education, setEducation] = useState("");
  const [stream, setStream] = useState("");

  // ============= UI STATE =============
  const [isSignup, setIsSignup] = useState(false);
  const [step, setStep] = useState(1); // 1 = signup account, 2 = profile setup
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ============= HELPER FUNCTIONS =============
  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setLoginEmail("");
    setLoginPassword("");
    setFirstName("");
    setLastName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setEducation("");
    setStream("");
    setStep(1);
    setError("");
  };

  // ============= LOGIN HANDLER =============
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!loginEmail || !loginPassword) {
        setError("Please enter email and password");
        setLoading(false);
        return;
      }

      const response = await loginAPI({ email: loginEmail, password: loginPassword });

      if (response.data.success) {
        auth.login(response.data.token, response.data.user);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMsg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ============= SIGNUP STEP 1: CREATE ACCOUNT =============
  const handleSignupStep1 = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!firstName || !lastName || !signupEmail || !signupPassword) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (signupPassword.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      if (signupPassword !== signupConfirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      const response = await signupAPI({
        name: fullName,
        email: signupEmail,
        password: signupPassword
      });

      if (response.data.success) {
        auth.login(response.data.token, response.data.user);
        setStep(2); // Move to profile setup
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Signup failed. Please try again.";
      setError(errorMsg);
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ============= SIGNUP STEP 2: PROFILE SETUP =============
  const handleProfileSetup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!education || !stream) {
        setError("Please select both education level and stream");
        setLoading(false);
        return;
      }

      const response = await updateProfile({ education, stream });

      if (response.data.success) {
        auth.login(auth.token, response.data.user);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to update profile. Please try again.";
      setError(errorMsg);
      console.error("Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipProfileSetup = () => {
    navigate("/dashboard");
  };

  // ============= LOGIN VIEW =============
  if (!isSignup) {
    return (
      <div className="bg-charcoal font-display text-white min-h-screen overflow-hidden">
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
              <span className="text-2xl font-bold">CareerViewX</span>
            </div>

            <div className="absolute bottom-12 left-12 right-12 glass-panel p-8 rounded-2xl max-w-lg">
              <h2 className="text-2xl font-semibold mb-2">Build your future.</h2>
              <p className="text-gray-300 text-sm">
                Access AI-powered career guidance and personalized opportunities tailored to your skills.
              </p>
            </div>
          </div>

          {/* RIGHT LOGIN SECTION */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

            <div className="w-full max-w-md relative z-10">
              <div className="space-y-6">
                {/* HEADER */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                  <p className="text-gray-400 text-sm">Sign in to continue your career journey.</p>
                </div>

                {/* LOGIN FORM */}
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* EMAIL */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300 ml-1">Email Address</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-sm">mail</span>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                      <label className="block text-xs font-medium text-gray-300">Password</label>
                      <a href="#forgot_pass" className="text-xs text-primary hover:underline">Forgot Password?</a>
                    </div>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-sm">lock</span>
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {showLoginPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* ERROR MESSAGE */}
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {error}
                    </div>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                    {!loading && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                  </button>
                </form>

                {/* DIVIDER */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Or sign in with</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                {/* SOCIAL BUTTONS */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-white">
                    <img
                      alt="Google"
                      className="w-4 h-4 opacity-80"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                    />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-white">
                    <span className="material-symbols-outlined text-[#0A66C2] text-sm">person</span>
                    LinkedIn
                  </button>
                </div>

                {/* SIGNUP LINK */}
                <p className="text-center text-gray-500 text-xs">
                  Don't have an account?{" "}
                  <button
                    onClick={toggleAuthMode}
                    className="text-primary font-bold hover:underline"
                  >
                    Create one
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============= SIGNUP VIEW =============
  return (
    <div className="bg-charcoal font-display text-white min-h-screen overflow-hidden">
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
            <span className="text-2xl font-bold">CareerViewX</span>
          </div>

          <div className="absolute bottom-12 left-12 right-12 glass-panel p-8 rounded-2xl max-w-lg">
            <h2 className="text-2xl font-semibold mb-2">Start your journey.</h2>
            <p className="text-gray-300 text-sm">
              Get personalized career recommendations based on your skills and interests.
            </p>
          </div>
        </div>

        {/* RIGHT SIGNUP SECTION */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

          <div className="w-full max-w-md relative z-10">
            {/* STEP 1: ACCOUNT CREATION */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold tracking-widest text-primary uppercase">Step 1 of 2</span>
                    <div className="flex gap-1">
                      <div className="h-1 w-8 rounded-full bg-primary"></div>
                      <div className="h-1 w-8 rounded-full bg-white/10"></div>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-white">Create your account</h1>
                  <p className="text-gray-400 text-sm">Join thousands of students building their dream careers.</p>
                </div>

                <form onSubmit={handleSignupStep1} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-300 ml-1">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-300 ml-1">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300 ml-1">Email Address</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-sm">mail</span>
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300 ml-1">Password</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-sm">lock</span>
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {showSignupPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 ml-1">At least 6 characters</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300 ml-1">Confirm Password</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-sm">lock</span>
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating account..." : "Continue"}
                    {!loading && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                  </button>
                </form>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Or sign up with</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-white">
                    <img alt="Google" className="w-4 h-4 opacity-80" src="https://www.svgrepo.com/show/475656/google-color.svg" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-white">
                    <span className="material-symbols-outlined text-[#0A66C2] text-sm">person</span>
                    LinkedIn
                  </button>
                </div>

                <p className="text-center text-gray-500 text-xs">
                  Already have an account?{" "}
                  <button onClick={toggleAuthMode} className="text-primary font-bold hover:underline">
                    Sign in
                  </button>
                </p>
              </div>
            )}

            {/* STEP 2: PROFILE SETUP */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold tracking-widest text-primary uppercase">Step 2 of 2</span>
                    <div className="flex gap-1">
                      <div className="h-1 w-8 rounded-full bg-primary"></div>
                      <div className="h-1 w-8 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-white">Tell us about yourself</h1>
                  <p className="text-gray-400 text-sm">This helps us personalize your career guidance (optional).</p>
                </div>

                <form onSubmit={handleProfileSetup} className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-300">Education Level</label>
                    <div className="space-y-2">
                      {[
                        { value: "10th Grade", title: "10th Grade", desc: "Secondary certificate", icon: "edit_note" },
                        { value: "12th Grade", title: "12th Grade", desc: "Higher secondary", icon: "menu_book" },
                        { value: "Graduate", title: "Graduate", desc: "Bachelor's degree", icon: "school" },
                        { value: "Masters / PhD", title: "Masters / PhD", desc: "Post-graduate degree", icon: "history_edu" },
                      ].map((opt) => (
                        <OptionCard
                          key={opt.value}
                          inputType="radio"
                          name="education"
                          value={opt.value}
                          title={opt.title}
                          desc={opt.desc}
                          icon={opt.icon}
                          selected={education === opt.value}
                          onSelect={setEducation}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-300">Academic Stream</label>
                    <div className="space-y-2">
                      {[
                        { value: "science", title: "Science & Technology", desc: "Engineering, Medicine, Research", icon: "science" },
                        { value: "commerce", title: "Commerce & Business", desc: "Finance, Marketing, Management", icon: "payments" },
                        { value: "humanities", title: "Humanities & Arts", desc: "Design, Literature, Psychology", icon: "palette" },
                        { value: "vocational", title: "Diploma & Vocational", desc: "Technical & Professional Certs", icon: "handyman" },
                      ].map((opt) => (
                        <OptionCard
                          key={opt.value}
                          inputType="button"
                          value={opt.value}
                          title={opt.title}
                          desc={opt.desc}
                          icon={opt.icon}
                          selected={stream === opt.value}
                          onSelect={setStream}
                        />
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {error}
                    </div>
                  )}

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={!education || !stream || loading}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Completing setup..." : "Finish Setup"}
                      {!loading && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                    </button>

                    <button
                      type="button"
                      onClick={handleSkipProfileSetup}
                      className="w-full py-3 text-primary font-semibold hover:text-primary/80 transition-colors text-sm"
                    >
                      Skip for now
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
