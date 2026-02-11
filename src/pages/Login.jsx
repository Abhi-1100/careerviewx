import React from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/Loginimg.png";

import { useState } from "react";
import OptionCard from "../components/OptionCard";
import StepHeader from "../components/StepHeader";
import Button from "../components/Button";
import IconInput from "../components/IconInput";
import { signup as signupAPI, login as loginAPI } from "../Services/api";
import { saveUserData, clearUserData } from "../utils/auth";

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [education, setEducation] = useState("");
  const [stream, setStream] = useState("");
  const totalSteps = 3;

  // Signup Form States
  const [isSignup, setIsSignup] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const signupTotalSteps = 3;

  // Error and Loading states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async (e) => {
    e && e.preventDefault && e.preventDefault();

    // Step 1: Login - Call backend API
    if (step === 1) {
      setError("");
      setLoading(true);

      try {
        const response = await loginAPI({ email, password });
        const { token, user } = response.data;

        // Clear any old user data first
        clearUserData();

        // Save token and user data to localStorage
        saveUserData(token, user);

        // Move to next step
        setStep((s) => s + 1);
      } catch (err) {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    // Other steps: just navigate
    else if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      Navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
    else Navigate(-1);
  };

  // Signup handlers
  const handleSignupNext = async (e) => {
    e && e.preventDefault && e.preventDefault();

    // Step 1: Create account - Call backend API
    if (signupStep === 1) {
      setError("");
      setLoading(true);

      try {
        const fullName = `${firstName} ${lastName}`;
        await signupAPI({
          name: fullName,
          email: signupEmail,
          password: signupPassword
        });

        // Move to next step after successful signup
        setSignupStep((s) => s + 1);
      } catch (err) {
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    // Other steps: just navigate
    else if (signupStep < signupTotalSteps) {
      setSignupStep((s) => s + 1);
    } else {
      // Step 3 (Final): Send all data to backend and auto-login
      setError("");
      setLoading(true);

      try {
        const fullName = `${firstName} ${lastName}`;
        const response = await signupAPI({
          name: fullName,
          email: signupEmail,
          password: signupPassword,
          education: education,
          stream: stream
        });


        // Backend now returns token and user data
        const { token, user } = response.data;

        // Clear any old user data first
        clearUserData();

        // Save new user data to localStorage
        saveUserData(token, user);

        // Redirect to dashboard with full page reload to ensure fresh data
        window.location.href = "/dashboard";
      } catch (err) {
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignupBack = () => {
    if (signupStep > 1) setSignupStep((s) => s - 1);
    else {
      // Go back to login
      setIsSignup(false);
      setSignupStep(1);
      setFirstName("");
      setLastName("");
      setSignupEmail("");
      setSignupPassword("");
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setSignupStep(1);
    setFirstName("");
    setLastName("");
    setSignupEmail("");
    setSignupPassword("");
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // final submission (placeholder) — include stream selection
    console.log({ email, password, education, stream });
    // TODO: call API / persist profile details
    Navigate("/dashboard");
  };

  const stepHeaders = {
    1: { title: 'Welcome back', subtitle: 'Sign in to continue your career journey.' },
    2: { title: 'Education Level', subtitle: 'Select the highest qualification you have completed to date.' },
    3: { title: 'Select Stream', subtitle: 'Choose your academic or professional focus to help us customize your experience.' },
  };

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

        {/* RIGHT LOGIN/SIGNUP SECTION */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

          <div className="w-full max-w-md relative z-10">

            {/* ========== SIGNUP FORM VIEW ========== */}
            {isSignup ? (
              <>
                {/* Signup Step 1: Create Account */}
                {signupStep === 1 && (
                  <div className="space-y-6">
                    {/* HEADER */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-widest text-primary uppercase">Step 1 of 3</span>
                        <div className="flex gap-1">
                          <div className="h-1 w-8 rounded-full bg-primary"></div>
                          <div className="h-1 w-8 rounded-full bg-white/10"></div>
                          <div className="h-1 w-8 rounded-full bg-white/10"></div>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Create your account</h1>
                        <p className="text-gray-400 text-sm">Join thousands of students building their dream careers.</p>
                      </div>
                    </div>

                    {/* SIGNUP FORM */}
                    <form onSubmit={handleSignupNext} className="space-y-4">
                      {/* FIRST NAME & LAST NAME */}
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

                      {/* EMAIL ADDRESS */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative group">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-sm">mail</span>
                          <input
                            type="email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            placeholder="name@email.com"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      {/* PASSWORD */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative group">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-sm">lock</span>
                          <input
                            type={showSignupPassword ? "text" : "password"}
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-sm"
                          >
                            <span className="material-symbols-outlined">
                              {showSignupPassword ? "visibility_off" : "visibility"}
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

                      {/* CONTINUE BUTTON */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-xl glow-button transition-all duration-300 flex items-center justify-center gap-2 group text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Creating account..." : "Continue"}
                        {!loading && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-sm">arrow_forward</span>}
                      </button>
                    </form>

                    {/* DIVIDER */}
                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-white/5"></div>
                      <span className="flex-shrink mx-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Or sign up with</span>
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

                    {/* LOGIN LINK */}
                    <p className="text-center text-gray-500 text-xs">
                      Already have an account?{" "}
                      <button
                        onClick={toggleSignup}
                        className="text-primary font-bold hover:underline"
                      >
                        Log in
                      </button>
                    </p>
                  </div>
                )}

                {/* Signup Step 2: Education */}
                {signupStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-widest text-primary uppercase">Step 2 of 3</span>
                        <div className="flex gap-1">
                          <div className="h-1 w-8 rounded-full bg-primary"></div>
                          <div className="h-1 w-8 rounded-full bg-primary"></div>
                          <div className="h-1 w-8 rounded-full bg-white/10"></div>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Education Level</h1>
                        <p className="text-gray-400 text-xs">Select your highest qualification.</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {[
                        { value: 'Masters / PhD', title: 'Masters / PhD', desc: 'Post-graduate degree', icon: 'history_edu' },
                        { value: 'Graduate', title: 'Graduate', desc: "Bachelor's degree", icon: 'school' },
                        { value: '12th Grade', title: '12th Grade', desc: 'Higher secondary', icon: 'menu_book' },
                        { value: '10th Grade', title: '10th Grade', desc: 'Secondary certificate', icon: 'edit_note' },
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

                    <div className="mt-3 flex flex-col gap-2">
                      <Button onClick={handleSignupNext} disabled={!education} variant="primary" className="w-full flex items-center justify-center gap-2 text-sm py-3">
                        Continue
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Button>
                      <button onClick={handleSignupBack} className="w-full h-10 bg-transparent text-white/30 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 group">
                        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Back
                      </button>
                    </div>
                  </div>
                )}

                {/* Signup Step 3: Stream */}
                {signupStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-widest text-primary uppercase">Step 3 of 3</span>
                        <div className="flex gap-1">
                          <div className="h-1 w-8 rounded-full bg-primary"></div>
                          <div className="h-1 w-8 rounded-full bg-primary"></div>
                          <div className="h-1 w-8 rounded-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white">Select Stream</h1>
                        <p className="text-gray-400 text-xs">Choose your academic focus.</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { value: 'science', title: 'Science & Technology', desc: 'Engineering, Medicine, Research', icon: 'science' },
                        { value: 'commerce', title: 'Commerce & Business', desc: 'Finance, Marketing, Management', icon: 'payments' },
                        { value: 'humanities', title: 'Humanities & Arts', desc: 'Design, Literature, Psychology', icon: 'palette' },
                        { value: 'vocational', title: 'Diploma & Vocational', desc: 'Technical & Professional Certs', icon: 'handyman' },
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

                    <div className="space-y-2">
                      <Button onClick={(e) => handleSubmit(e)} disabled={!stream} variant="primary" className="w-full text-sm py-3">
                        Finish Setup
                      </Button>

                      <div className="flex items-center gap-2">
                        <button onClick={handleSignupBack} className="flex-1 h-10 bg-transparent text-white/30 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 group">
                          <span className="material-symbols-outlined text-xs">arrow_back</span>
                          Back
                        </button>
                        <button onClick={() => Navigate("/dashboard")} className="flex-1 h-10 text-primary text-xs font-medium hover:text-primary/80 transition-all">
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // ========== LOGIN FORM VIEW ==========
              <>
                {/* HEADER */}
                <StepHeader step={step} totalSteps={totalSteps} title={stepHeaders[step].title} subtitle={stepHeaders[step].subtitle} />

                {/* Step 1: Login Form */}
                {step === 1 && (
                  <form onSubmit={handleNext} className="space-y-4">
                    {/* EMAIL */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-300 ml-1">Email Address</label>
                      <div>
                        <IconInput
                          iconLeft="mail"
                          inputProps={{
                            type: 'email',
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: 'name@example.com',
                            required: true,
                            className: "text-sm",
                          }}
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center ml-1">
                        <label className="block text-xs font-medium text-gray-300">Password</label>
                        <a href="#forgot_pass" className="text-xs text-primary hover:underline">Forgot Password?</a>
                      </div>
                      <div>
                        <IconInput
                          iconLeft="lock"
                          inputProps={{
                            type: showPassword ? 'text' : 'password',
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: '••••••••',
                            required: true,
                            className: "text-sm",
                          }}
                          rightElement={
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-gray-500 hover:text-white"
                            >
                              <span className="material-symbols-outlined text-sm">
                                {showPassword ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          }
                        />
                      </div>
                    </div>

                    {/* ERROR MESSAGE */}
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {error}
                      </div>
                    )}

                    {/* SUBMIT goes to next step */}
                    <div className="flex flex-col gap-2">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Signing in..." : "Continue"}
                        {!loading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                      </Button>

                      <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-white/5" />
                        <span className="mx-3 text-xs font-semibold text-gray-500 uppercase">Or login with</span>
                        <div className="flex-grow border-t border-white/5" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="ghost" className="flex items-center justify-center gap-2 text-xs py-2.5">
                          <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-4 h-4 opacity-80"
                          />
                          Google
                        </Button>

                        <Button variant="ghost" className="flex items-center justify-center gap-2 text-xs py-2.5">
                          <span className="material-symbols-outlined text-[#0A66C2] text-sm">person</span>
                          LinkedIn
                        </Button>
                      </div>

                      <p className="text-center text-gray-500 text-xs">
                        New to CareerViewX? <button onClick={toggleSignup} className="text-primary font-semibold hover:underline">Create an account</button>
                      </p>
                    </div>
                  </form>
                )}

                {/* Step 2: Education */}
                {step === 2 && (
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      {[
                        { value: 'Masters / PhD', title: 'Masters / PhD', desc: 'Post-graduate degree', icon: 'history_edu' },
                        { value: 'Graduate', title: 'Graduate', desc: "Bachelor's degree", icon: 'school' },
                        { value: '12th Grade', title: '12th Grade', desc: 'Higher secondary', icon: 'menu_book' },
                        { value: '10th Grade', title: '10th Grade', desc: 'Secondary certificate', icon: 'edit_note' },
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

                    <div className="mt-3 flex flex-col gap-2">
                      <Button onClick={handleNext} disabled={!education} variant="primary" className="w-full flex items-center justify-center gap-2 text-sm py-3">
                        Continue
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Button>
                      <button onClick={handleBack} className="w-full h-10 bg-transparent text-white/30 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 group">
                        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Back
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Stream Selection (Finish) */}
                {step === 3 && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {[
                        { value: 'science', title: 'Science & Technology', desc: 'Engineering, Medicine, Research', icon: 'science' },
                        { value: 'commerce', title: 'Commerce & Business', desc: 'Finance, Marketing, Management', icon: 'payments' },
                        { value: 'humanities', title: 'Humanities & Arts', desc: 'Design, Literature, Psychology', icon: 'palette' },
                        { value: 'vocational', title: 'Diploma & Vocational', desc: 'Technical & Professional Certs', icon: 'handyman' },
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

                    <div className="space-y-2">
                      <Button onClick={(e) => handleSubmit(e)} disabled={!stream} variant="primary" className="w-full text-sm py-3">
                        Finish Setup
                      </Button>

                      <div className="flex items-center gap-2">
                        <button onClick={handleBack} className="flex-1 h-10 bg-transparent text-white/30 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 group">
                          <span className="material-symbols-outlined text-xs">arrow_back</span>
                          Back
                        </button>
                        <button onClick={() => Navigate("/dashboard")} className="flex-1 h-10 text-primary text-xs font-medium hover:text-primary/80 transition-all">
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
