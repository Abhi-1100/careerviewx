import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAssessmentQuestions, submitAssessment } from "../Services/api";
import InternalNavbar from "../components/InternalNavbar";

const Assessment = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getAssessmentQuestions();
        if (response.data.success) {
          setQuestions(response.data.questions);
        } else {
          alert("Failed to load questions. Please try again.");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Error fetching questions. Please try again.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [navigate]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleOptionSelect = (optionIndex, optionText) => {
    setSelectedAnswer(optionText);
    setSelectedAnswerIndex(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer");
      return;
    }

    // Store the answer
    const newAnswer = {
      questionId: currentQuestion._id,
      selectedAnswer: selectedAnswer,
      selectedAnswerIndex: selectedAnswerIndex
    };

    setAnswers([...answers, newAnswer]);

    if (isLastQuestion) {
      // Last question - prepare to submit
      handleSubmit([...answers, newAnswer]);
    } else {
      // Move to next question
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setSelectedAnswerIndex(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousQuestion = questions[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      
      // Find and restore the answer for this question if it exists
      const existingAnswer = answers.find(a => a.questionId === previousQuestion._id);
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selectedAnswer);
        setSelectedAnswerIndex(existingAnswer.selectedAnswerIndex);
      } else {
        setSelectedAnswer(null);
        setSelectedAnswerIndex(null);
      }
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async (finalAnswers) => {
    try {
      setSubmitting(true);
      const response = await submitAssessment(finalAnswers);

      if (response.data.success) {
        // Navigate to career result page with the recommended career
        navigate("/assessments/result", {
          state: {
            recommendedCareer: response.data.recommendedCareer,
            scores: response.data.scores
          }
        });
      } else {
        alert("Error submitting assessment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Error submitting assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-white font-display">
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-white text-lg">Loading assessment...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background-dark text-white font-display">
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 h-screen">
          <div className="text-center">
            <p className="text-white text-lg">No questions available</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <InternalNavbar />

      <main className="flex flex-1 justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
          <div className="glass-card rounded-xl p-8 flex flex-col gap-8">
            {/* Progress Bar */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-6 justify-between items-center">
                <p className="text-white text-base font-semibold leading-normal">Assessment Progress</p>
                <p className="text-primary text-sm font-bold leading-normal">{progress}%</p>
              </div>

              <div className="rounded-full bg-[#423b54] h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary glow-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-[#a59cba] text-xs font-medium leading-normal tracking-wide">
                QUESTION {currentIndex + 1} OF {questions.length}
              </p>
            </div>

            {/* Question */}
            <div className="flex flex-col gap-8">
              <h2 className="text-white tracking-tight text-[28px] font-bold leading-tight text-center px-4">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index, option)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      selectedAnswer === option
                        ? "bg-primary border-primary text-white glow-accent"
                        : "bg-[#2d2839]/50 border-transparent text-[#a59cba] hover:border-primary/50 hover:bg-primary/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  onClick={handlePrevious}
                  className="flex min-w-[120px] items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#2d2839] text-white text-base font-bold transition-all hover:bg-white/10"
                >
                  <span className="truncate">Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null || submitting}
                  className={`flex min-w-[160px] items-center justify-center overflow-hidden rounded-lg h-12 px-8 text-white text-base font-bold shadow-lg transition-all ${
                    selectedAnswer === null || submitting
                      ? "bg-primary/50 cursor-not-allowed"
                      : "bg-primary shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02]"
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Submitting...
                    </span>
                  ) : (
                    <span className="truncate">
                      {isLastQuestion ? "Submit Assessment" : "Next Question"}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Auto-saving indicator */}
          <div className="mt-8 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-[#a59cba] text-sm">
              <span className="material-symbols-outlined text-lg">bolt</span>
              <span>Auto-saving responses</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
