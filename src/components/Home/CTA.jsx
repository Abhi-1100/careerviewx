import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Button from "../../components/Button";

const CTA = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section
      className={`flex flex-1 justify-center py-16 sm:py-24 md:py-28 px-4 sm:px-6 transition-colors duration-300 ${isDarkMode ? "bg-charcoal" : "bg-surface-light"
        } relative overflow-hidden`}
    >
      <div
        className={`absolute inset-0 opacity-30 blur-[100px] -z-10 rounded-full scale-150 translate-y-20 transition-colors duration-300 ${isDarkMode ? "bg-primary/20" : "bg-primary/10"
          }`}
      ></div>
      <div
        className={`layout-content-container flex flex-col max-w-[1000px] flex-1 text-center items-center px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-24 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_60px_rgba(139,92,246,0.4)] transition-colors duration-300 ${isDarkMode ? "bg-primary text-white" : "bg-primary text-white"
          }`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 sm:mb-8 leading-[1.1]">
          Ready to find your future?
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-[680px] font-medium">
          Join 50,000+ students who are already building their dream careers
          with CareerPath.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center">
          <Button
            variant="ghost"
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-xl font-black border-2 border-white text-white hover:bg-white/10 transition-all"
            onClick={() => navigate('/assessments')}
          >
            Take the Free Assessment
          </Button>
          <Button
            variant="ghost"
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-xl font-black border-2 border-white text-white hover:bg-white/10 transition-all"
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
