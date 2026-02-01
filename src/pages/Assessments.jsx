import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Assessments = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("3");
  const [currentQuestion, setCurrentQuestion] = useState(5); // start at 5 to match the prototype example
  const totalQuestions = 20;
  const progress = Math.round((currentQuestion / totalQuestions) * 100);

  const goNext = () => {
    if (currentQuestion >= totalQuestions) {
      // Finished - go to results
      navigate('/assessments/result');
    } else {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 1) setCurrentQuestion((q) => q - 1);
    else navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      {/* Header - mirror landing header from prototype */}
      <header className="flex items-center justify-between border-b border-solid border-[#2d2839] px-10 py-3 bg-background-dark">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-6">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">CareerQuest</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-[#2d2839] text-white hover:bg-primary/20 transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-[#2d2839] text-white hover:bg-primary/20 transition-all">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className="flex flex-1 justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
          <div className="glass-card rounded-xl p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex gap-6 justify-between items-center">
                <p className="text-white text-base font-semibold leading-normal">Assessment Progress</p>
                <p className="text-primary text-sm font-bold leading-normal">{progress}%</p>
              </div>

              <div className="rounded-full bg-[#423b54] h-2.5 overflow-hidden">
                <div className="h-full rounded-full bg-primary glow-accent transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>

              <p className="text-[#a59cba] text-xs font-medium leading-normal tracking-wide">QUESTION {currentQuestion} OF {totalQuestions}</p>
            </div>

            <div className="flex flex-col gap-10">
              <h2 className="text-white tracking-tight text-[28px] font-bold leading-tight text-center px-4">
                How much do you enjoy solving complex mathematical problems?
              </h2>

              <div className="flex flex-wrap justify-center gap-4 py-3">
                <div className="flex flex-wrap h-auto flex-1 items-center justify-center gap-3">
                  {[{ v: "1", label: "Not at all", icon: "sentiment_very_dissatisfied" }, { v: "2", label: "Slightly", icon: "sentiment_dissatisfied" }, { v: "3", label: "Moderately", icon: "sentiment_neutral" }, { v: "4", label: "Very much", icon: "sentiment_satisfied" }, { v: "5", label: "Extremely", icon: "sentiment_very_satisfied" }].map((opt) => (
                    <label
                      key={opt.v}
                      className={`flex flex-col gap-2 cursor-pointer group items-center justify-center w-32 aspect-square rounded-xl border border-transparent transition-all hover:bg-primary/10 hover:border-primary/50 text-[#a59cba] ${selected === opt.v ? "bg-primary glow-accent text-white" : "bg-[#2d2839]/50"}`}
                    >
                      <span className="material-symbols-outlined text-3xl">{opt.icon}</span>
                      <span className="text-sm font-medium">{opt.label}</span>
                      <input
                        className="invisible w-0 h-0"
                        name="quiz-answer"
                        type="radio"
                        value={opt.v}
                        checked={selected === opt.v}
                        onChange={() => setSelected(opt.v)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button className="flex min-w-[120px] items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#2d2839] text-white text-base font-bold transition-all hover:bg-white/10" onClick={goPrev}>
                  <span className="truncate">Previous</span>
                </button>

                <button
                  className="flex min-w-[160px] items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
                  onClick={goNext}
                >
                  <span className="truncate">{currentQuestion >= totalQuestions ? 'Finish' : 'Next Question'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-[#a59cba] text-sm">
              <span className="material-symbols-outlined text-lg">bolt</span>
              <span>Auto-saving response</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessments;
