import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { generateAllQuestions, getFinalResult } from "../Services/api";
import InternalNavbar from "../components/InternalNavbar";
import { ThemeContext } from "../context/ThemeContext";

const TOTAL_QUESTIONS = 10;

const Assessment = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  // Phase: 'start' | 'generating' | 'question' | 'analyzing' | 'error'
  const [phase, setPhase] = useState("start");
  const [questions, setQuestions] = useState([]); // all 10 questions pre-loaded
  const [currentIndex, setCurrentIndex] = useState(0); // 0-based index into questions array
  const [allQnA, setAllQnA] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  // Animated dots for loading text
  const [dots, setDots] = useState("");
  useEffect(() => {
    if (phase === "generating" || phase === "analyzing") {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Load ALL questions at the start (single AI call)
  const loadAllQuestions = async () => {
    try {
      setPhase("generating");
      const response = await generateAllQuestions();

      if (response.data.success && response.data.questions) {
        setQuestions(response.data.questions);
        setCurrentIndex(0);
        setAllQnA([]);
        setSelectedOption(null);
        setPhase("question");
      } else {
        throw new Error(response.data.message || "Failed to generate questions");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      setErrorMessage(
        "Something went wrong generating questions. Please try again."
      );
      setPhase("error");
    }
  };

  // Handle starting the assessment
  const handleStart = () => {
    loadAllQuestions();
  };

  // Handle selecting an option
  const handleOptionClick = async (option) => {
    if (selectedOption !== null) return; // Prevent double-click

    setSelectedOption(option);

    const currentQuestion = questions[currentIndex];
    const newQnA = {
      question: currentQuestion.question,
      answer: option.text,
      category: currentQuestion.category,
      traits: option.traits || [],
    };

    const updatedQnA = [...allQnA, newQnA];
    setAllQnA(updatedQnA);

    // Small delay for visual feedback
    await new Promise((r) => setTimeout(r, 350));

    if (currentIndex >= questions.length - 1) {
      // Last question answered — get final results
      try {
        setPhase("analyzing");
        const response = await getFinalResult({ allQnA: updatedQnA });

        if (response.data.success) {
          navigate("/assessments/result", {
            state: {
              summary: response.data.summary,
              careers: response.data.careers,
              allQnA: updatedQnA,
            },
          });
        } else {
          throw new Error(response.data.message || "Analysis failed");
        }
      } catch (error) {
        console.error("Error getting final results:", error);
        setErrorMessage(
          "Something went wrong analyzing your responses. Please try again."
        );
        setPhase("error");
      }
    } else {
      // Move to next question instantly — no API call needed!
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    }
  };

  // Handle retry on error
  const handleRetry = () => {
    if (questions.length > 0 && currentIndex >= questions.length - 1 && allQnA.length === questions.length) {
      // Retry final analysis
      setPhase("analyzing");
      getFinalResult({ allQnA })
        .then((response) => {
          if (response.data.success) {
            navigate("/assessments/result", {
              state: {
                summary: response.data.summary,
                careers: response.data.careers,
                allQnA: allQnA,
              },
            });
          }
        })
        .catch(() => {
          setErrorMessage("Still having trouble. Please try again later.");
          setPhase("error");
        });
    } else {
      // Retry question generation
      loadAllQuestions();
    }
  };

  const questionNumber = currentIndex + 1;
  const progress = Math.round((questionNumber / TOTAL_QUESTIONS) * 100);
  const currentQuestion = questions[currentIndex];

  // ==================== START SCREEN ====================
  if (phase === "start") {
    return (
      <div
        className={`min-h-screen font-display transition-colors duration-300 ${
          isDarkMode
            ? "bg-background-dark text-white"
            : "bg-surface-light text-charcoal"
        }`}
      >
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 min-h-[calc(100vh-80px)]">
          <div className="relative max-w-xl w-full">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none"></div>

            <div
              className={`relative rounded-2xl p-10 flex flex-col items-center gap-8 shadow-2xl backdrop-blur-xl border ${
                isDarkMode
                  ? "glass-card bg-[#1a142e]/80 border-white/10"
                  : "bg-white/90 border-slate-200"
              }`}
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl">
                  psychology
                </span>
              </div>

              {/* Title */}
              <div className="text-center">
                <h1
                  className={`text-3xl md:text-4xl font-black tracking-tight mb-3 ${
                    isDarkMode ? "text-white" : "text-charcoal"
                  }`}
                >
                  AI Career Assessment
                </h1>
                <p
                  className={`text-base max-w-md mx-auto leading-relaxed ${
                    isDarkMode ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  Answer 10 personalized questions and let our AI discover the
                  career paths that match your unique profile.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      isDarkMode ? "text-white/40" : "text-slate-400"
                    }`}
                  >
                    Progress
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isDarkMode ? "text-white/40" : "text-slate-400"
                    }`}
                  >
                    0 / {TOTAL_QUESTIONS}
                  </span>
                </div>
                <div
                  className={`rounded-full h-2 overflow-hidden ${
                    isDarkMode ? "bg-white/10" : "bg-slate-100"
                  }`}
                >
                  <div className="h-full rounded-full bg-primary/30 w-0 transition-all duration-500"></div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                {[
                  { icon: "auto_awesome", label: "AI-Powered" },
                  { icon: "timer", label: "~5 Minutes" },
                  { icon: "fingerprint", label: "Unique to You" },
                ].map((feat) => (
                  <div
                    key={feat.label}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl ${
                      isDarkMode
                        ? "bg-white/5 border border-white/5"
                        : "bg-slate-50 border border-slate-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-xl">
                      {feat.icon}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isDarkMode ? "text-white/70" : "text-slate-600"
                      }`}
                    >
                      {feat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Start Button */}
              <button
                onClick={handleStart}
                className="w-full flex items-center justify-center gap-3 rounded-xl h-14 bg-primary text-white text-base font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                <span>Begin Assessment</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==================== GENERATING SCREEN (initial load) ====================
  if (phase === "generating") {
    return (
      <div
        className={`min-h-screen font-display transition-colors duration-300 ${
          isDarkMode
            ? "bg-background-dark text-white"
            : "bg-surface-light text-charcoal"
        }`}
      >
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 min-h-[calc(100vh-80px)]">
          <div className="relative max-w-xl w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

            <div
              className={`relative rounded-2xl p-10 flex flex-col items-center gap-8 shadow-2xl backdrop-blur-xl border ${
                isDarkMode
                  ? "bg-[#1a142e]/80 border-white/10"
                  : "bg-white/90 border-slate-200"
              }`}
            >
              {/* Spinner */}
              <div className="flex flex-col items-center gap-6 py-8">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <div
                    className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-primary/40 rounded-full animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
                <div className="text-center">
                  <p
                    className={`text-lg font-semibold mb-1 ${
                      isDarkMode ? "text-white" : "text-charcoal"
                    }`}
                  >
                    Preparing your assessment{dots}
                  </p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-white/40" : "text-slate-400"
                    }`}
                  >
                    AI is crafting 10 personalized questions for you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==================== ANALYZING SCREEN ====================
  if (phase === "analyzing") {
    return (
      <div
        className={`min-h-screen font-display transition-colors duration-300 ${
          isDarkMode
            ? "bg-background-dark text-white"
            : "bg-surface-light text-charcoal"
        }`}
      >
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 min-h-[calc(100vh-80px)]">
          <div className="relative max-w-xl w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

            <div
              className={`relative rounded-2xl p-10 flex flex-col items-center gap-8 shadow-2xl backdrop-blur-xl border ${
                isDarkMode
                  ? "bg-[#1a142e]/80 border-white/10"
                  : "bg-white/90 border-slate-200"
              }`}
            >
              {/* Full progress */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      isDarkMode ? "text-white/40" : "text-slate-400"
                    }`}
                  >
                    Assessment Complete
                  </span>
                  <span className="text-xs font-bold text-primary">
                    {TOTAL_QUESTIONS} / {TOTAL_QUESTIONS}
                  </span>
                </div>
                <div
                  className={`rounded-full h-2.5 overflow-hidden ${
                    isDarkMode ? "bg-white/10" : "bg-slate-100"
                  }`}
                >
                  <div className="h-full rounded-full bg-primary w-full"></div>
                </div>
              </div>

              {/* Analyzing animation */}
              <div className="flex flex-col items-center gap-6 py-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      analytics
                    </span>
                  </div>
                  {/* Orbiting dots */}
                  <div
                    className="absolute -inset-4 animate-spin"
                    style={{ animationDuration: "3s" }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div
                    className="absolute -inset-4 animate-spin"
                    style={{ animationDuration: "3s", animationDelay: "1s" }}
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60"></div>
                  </div>
                  <div
                    className="absolute -inset-4 animate-spin"
                    style={{ animationDuration: "3s", animationDelay: "2s" }}
                  >
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40"></div>
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className={`text-xl font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-charcoal"
                    }`}
                  >
                    Analyzing your responses{dots}
                  </p>
                  <p
                    className={`text-sm max-w-sm ${
                      isDarkMode ? "text-white/40" : "text-slate-400"
                    }`}
                  >
                    Our AI is building your personalized career profile and
                    matching you with the best career paths
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==================== ERROR SCREEN ====================
  if (phase === "error") {
    return (
      <div
        className={`min-h-screen font-display transition-colors duration-300 ${
          isDarkMode
            ? "bg-background-dark text-white"
            : "bg-surface-light text-charcoal"
        }`}
      >
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 min-h-[calc(100vh-80px)]">
          <div className="relative max-w-xl w-full">
            <div
              className={`relative rounded-2xl p-10 flex flex-col items-center gap-6 shadow-2xl backdrop-blur-xl border ${
                isDarkMode
                  ? "bg-[#1a142e]/80 border-white/10"
                  : "bg-white/90 border-slate-200"
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-400 text-3xl">
                  error
                </span>
              </div>
              <div className="text-center">
                <h2
                  className={`text-xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-charcoal"
                  }`}
                >
                  Oops! Something went wrong
                </h2>
                <p
                  className={`text-sm max-w-sm ${
                    isDarkMode ? "text-white/50" : "text-slate-500"
                  }`}
                >
                  {errorMessage}
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleRetry}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">
                    refresh
                  </span>
                  Try Again
                </button>
                <button
                  onClick={() => navigate("/assessments")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl h-12 text-sm font-bold transition-all border ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    arrow_back
                  </span>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==================== QUESTION SCREEN ====================
  return (
    <div
      className={`min-h-screen font-display transition-colors duration-300 ${
        isDarkMode
          ? "bg-background-dark text-white"
          : "bg-surface-light text-charcoal"
      }`}
    >
      <InternalNavbar />

      <main className="flex flex-1 justify-center py-12 px-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
          <div
            className={`rounded-2xl p-8 md:p-10 flex flex-col gap-8 shadow-2xl backdrop-blur-xl border ${
              isDarkMode
                ? "glass-card bg-[#1a142e]/80 border-white/10"
                : "bg-white/90 border-slate-200"
            }`}
          >
            {/* Progress Bar */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-6 justify-between items-center">
                <p
                  className={`text-sm font-semibold leading-normal ${
                    isDarkMode ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  Question {questionNumber} of {TOTAL_QUESTIONS}
                </p>
                <p className="text-primary text-sm font-bold leading-normal">
                  {progress}%
                </p>
              </div>

              <div
                className={`rounded-full h-2.5 overflow-hidden ${
                  isDarkMode ? "bg-white/10" : "bg-slate-100"
                }`}
              >
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Step indicators */}
              <div className="flex justify-between gap-1 mt-1">
                {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i < questionNumber
                        ? "bg-primary"
                        : i === currentIndex
                        ? "bg-primary animate-pulse"
                        : isDarkMode
                        ? "bg-white/10"
                        : "bg-slate-200"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Category Badge */}
            {currentQuestion?.category && (
              <div className="flex justify-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isDarkMode
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "bg-primary/10 text-primary border border-primary/15"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    category
                  </span>
                  {currentQuestion.category}
                </span>
              </div>
            )}

            {/* Question */}
            <div className="flex flex-col gap-8">
              <h2
                className={`tracking-tight text-2xl md:text-[28px] font-bold leading-tight text-center px-2 md:px-4 ${
                  isDarkMode ? "text-white" : "text-charcoal"
                }`}
              >
                {currentQuestion?.question}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {currentQuestion?.options.map((option, index) => {
                  const isSelected = selectedOption?.text === option.text;
                  const letter = String.fromCharCode(65 + index); // A, B, C, D

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      disabled={selectedOption !== null}
                      className={`w-full p-4 md:p-5 rounded-xl border-2 transition-all text-left font-medium flex items-center gap-4 group ${
                        isSelected
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.01]"
                          : selectedOption !== null
                          ? isDarkMode
                            ? "bg-[#2d2839]/30 border-transparent text-white/30 cursor-not-allowed"
                            : "bg-slate-50/50 border-slate-100 text-slate-300 cursor-not-allowed"
                          : isDarkMode
                          ? "bg-[#2d2839]/50 border-transparent text-white/80 hover:border-primary/50 hover:bg-primary/10 hover:scale-[1.01]"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-primary/5 hover:text-charcoal hover:scale-[1.01]"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : isDarkMode
                            ? "bg-white/10 text-white/60 group-hover:bg-primary/20 group-hover:text-primary"
                            : "bg-slate-200 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1">{option.text}</span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-white text-xl">
                          check_circle
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-6 flex justify-center gap-6">
            <div
              className={`flex items-center gap-2 text-xs ${
                isDarkMode ? "text-white/30" : "text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                auto_awesome
              </span>
              <span>AI-personalized questions</span>
            </div>
            <div
              className={`flex items-center gap-2 text-xs ${
                isDarkMode ? "text-white/30" : "text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Responses are private</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
