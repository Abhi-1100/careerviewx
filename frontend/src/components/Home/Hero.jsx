import Hero_i0 from '../../assets/Hero_i0.png';
import Hero_i1 from '../../assets/Hero_i1.png';
import Hero_i2 from '../../assets/Hero_i2.png';
import Hero_i3 from '../../assets/Hero_i3.png';

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Hero = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section
      className={`flex flex-1 justify-center py-10 sm:py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-charcoal" : "bg-surface-light"
        }`}
    >
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 sm:px-6 md:px-10">
        {/* Hero layout: stack on mobile, side-by-side on md+ */}
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-16">

          {/* Left Content */}
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-1 w-full text-center md:text-left items-center md:items-start">
            <div className="flex flex-col gap-4 sm:gap-5 items-center md:items-start">
              <div
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold w-fit uppercase tracking-[0.1em] border transition-colors duration-300 ${isDarkMode
                    ? "bg-primary/15 text-primary border-primary/20"
                    : "bg-primary/10 text-primary border-primary/20"
                  }`}
              >
                Empowering Future Leaders
              </div>
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                  }`}
              >
                Find Your Path to a{" "}
                <span className="text-primary italic">Fulfilling</span> Career
              </h1>
              <p
                className={`text-base sm:text-lg xl:text-xl leading-relaxed max-w-[560px] transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                Unlock your potential with AI-driven assessments and expert
                mentorship designed specifically for students and young
                professionals.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto justify-center md:justify-start">
              <button
                onClick={() => navigate("/quiz")}
                className={`flex w-full sm:w-auto min-w-[200px] cursor-pointer items-center justify-center rounded-2xl h-14 px-6 sm:px-8 text-white text-base sm:text-lg font-bold shadow-xl transition-all hover:scale-[1.02] ${isDarkMode
                    ? "bg-primary shadow-primary/30 hover:shadow-primary/40"
                    : "bg-primary shadow-primary/30 hover:shadow-primary/40"
                  }`}
              >
                Take the Career Quiz
              </button>
              <button
                className={`flex w-full sm:w-auto min-w-[160px] cursor-pointer items-center justify-center rounded-2xl h-14 px-6 sm:px-8 border-2 text-base sm:text-lg font-bold transition-all ${isDarkMode
                    ? "border-white/10 text-white hover:bg-white/5"
                    : "border-charcoal/20 text-charcoal hover:bg-charcoal/5"
                  }`}
              >
                Explore Mentors
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex -space-x-4">
                {[Hero_i0, Hero_i1, Hero_i2].map((src, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 bg-cover bg-center ${isDarkMode ? "border-charcoal" : "border-surface-light"
                      }`}
                    style={{ backgroundImage: `url(${src})` }}
                  />
                ))}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 bg-primary flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white ${isDarkMode ? "border-charcoal" : "border-surface-light"
                    }`}
                >
                  +2k
                </div>
              </div>
              <p
                className={`text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                Joined by{" "}
                <span
                  className={`font-bold ${isDarkMode ? "text-white" : "text-charcoal"}`}
                >
                  10,000+
                </span>{" "}
                students this month
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:flex-1 max-w-[540px] md:max-w-none">
            <div
              className={`relative w-full aspect-[4/3] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] group ring-1 transition-colors duration-300 ${isDarkMode ? "ring-white/10" : "ring-charcoal/10"
                }`}
            >
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${Hero_i3})` }}
              ></div>
              <div
                className={`absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 backdrop-blur-xl p-3 sm:p-6 rounded-xl sm:rounded-2xl border shadow-2xl flex items-center justify-between transition-colors duration-300 ${isDarkMode
                    ? "bg-[#1e1e1e]/90 border-white/10"
                    : "bg-white/90 border-charcoal/10"
                  }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${isDarkMode
                        ? "bg-primary shadow-primary/20"
                        : "bg-primary shadow-primary/20"
                      }`}
                  >
                    <span className="material-symbols-outlined text-xl sm:text-3xl">
                      rocket_launch
                    </span>
                  </div>
                  <div>
                    <p
                      className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                        }`}
                    >
                      AI Career Match
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs font-medium transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      98% Accuracy based on skills
                    </p>
                  </div>
                </div>
                <div
                  className={`h-8 sm:h-10 w-px transition-colors duration-300 ${isDarkMode ? "bg-white/10" : "bg-charcoal/10"
                    }`}
                ></div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-black text-primary">Top Choice</p>
                  <p
                    className={`text-[10px] sm:text-xs font-medium transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    UI/UX Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
