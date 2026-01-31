import React from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/Loginimg.png";

import { useState } from "react";
import OptionCard from "../components/OptionCard";
import StepHeader from "../components/StepHeader";
import Button from "../components/Button";
import IconInput from "../components/IconInput";

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [education, setEducation] = useState("");
  const [stream, setStream] = useState("");
  const totalSteps = 3; 

  const handleNext = (e) => {
    e && e.preventDefault && e.preventDefault();
    if (step < totalSteps) setStep((s) => s + 1);
    else Navigate("/dashboard");
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
    else Navigate(-1);
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
            <StepHeader step={step} totalSteps={totalSteps} title={stepHeaders[step].title} subtitle={stepHeaders[step].subtitle} />

            {/* Step 1: Login Form */}
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-5">
                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 ml-1">Email Address</label>
                  <div>
                    <IconInput
                      iconLeft="mail"
                      inputProps={{
                        type: 'email',
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: 'name@example.com',
                        required: true,
                      }}
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="block text-sm font-medium text-gray-300">Password</label>
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
                      }}
                      rightElement={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-500 hover:text-white"
                        >
                          <span className="material-symbols-outlined">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      }
                    />
                  </div>
                </div>

                {/* SUBMIT goes to next step */}
                <div className="flex flex-col gap-3">
                  <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2">
                    Continue
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Button>

                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-white/5" />
                    <span className="mx-4 text-xs font-semibold text-gray-500 uppercase">Or login with</span>
                    <div className="flex-grow border-t border-white/5" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="ghost" className="flex items-center justify-center gap-3">
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5 opacity-80"
                      />
                      Google
                    </Button>

                    <Button variant="ghost" className="flex items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-[#0A66C2]">person</span>
                      LinkedIn
                    </Button>
                  </div>

                  <p className="text-center text-gray-500 text-sm">
                    New to CareerViewX? <a href="#creat_Account" className="text-primary font-semibold hover:underline">Create an account</a>
                  </p>
                </div>
              </form>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex flex-col gap-3.5">
                  {/* radio options */}
                  {[
                    { value: 'Masters / PhD', title: 'Masters / PhD', desc: 'Post-graduate degree or professional doctorate', icon: 'history_edu' },
                    { value: 'Graduate', title: 'Graduate', desc: "Bachelor's degree or equivalent certification", icon: 'school' },
                    { value: '12th Grade', title: '12th Grade', desc: 'Higher secondary or vocational education', icon: 'menu_book' },
                    { value: '10th Grade', title: '10th Grade', desc: 'Secondary school certificate completion', icon: 'edit_note' },
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

                <div className="mt-4 flex flex-col gap-3">
                  <Button onClick={handleNext} disabled={!education} variant="primary" className="w-full flex items-center justify-center gap-2">
                    Continue
                    <span className={`material-symbols-outlined transition-transform ${!education ? '' : 'group-hover:translate-x-1'}`}>arrow_forward</span>
                  </Button>
                  <button onClick={handleBack} className="w-full h-12 bg-transparent text-white/30 hover:text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 group">
                    <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Previous Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Stream Selection (Finish) */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Select Stream</h1>
                  <p className="text-gray-400 text-sm">Choose your academic or professional focus to help us customize your experience.</p>
                </div>

                <div className="space-y-3 mb-4">
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

                <div className="space-y-6">
                  <Button onClick={(e) => handleSubmit(e)} disabled={!stream} variant="primary" className="w-full">
                    Finish Setup
                  </Button>

                  <div className="flex items-center justify-between px-1">
                    <button onClick={handleBack} className="text-primary text-sm font-medium hover:text-primary/80 transition-all">
                      Go Back
                    </button>
                    <button onClick={() => Navigate('/dashboard')} className="text-primary text-sm font-medium hover:text-primary/80 transition-all">
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
