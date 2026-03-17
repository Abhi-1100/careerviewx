import home_i0 from '../../assets/home_i0.png';
import home_i1 from '../../assets/home_i1.png';
import home_i2 from '../../assets/home_i2.png';
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const features = [
    {
      title: "AI-Powered Insights",
      description:
        "Our algorithms analyze millions of data points to provide hyper-personalized career matches that evolve as you gain new skills.",
      backgroundImage: home_i0,
    },
    {
      title: "Global Mentor Network",
      description:
        "Direct access to 2,000+ vetted experts from top-tier companies like Google, Microsoft, and McKinsey.",
      backgroundImage: home_i1,
    },
    {
      title: "Interactive Resources",
      description:
        "Exclusive access to live webinars, interview prep simulators, and step-by-step career roadmap templates.",
      backgroundImage: home_i2,
    },
  ];

  return (
    <section
      className={`flex flex-1 justify-center py-14 sm:py-20 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-charcoal" : "bg-surface-light"
        }`}
    >
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col gap-10 sm:gap-14">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                }`}
            >
              Why Leading Students Choose Us
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl max-w-[600px] transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
            >
              The most data-backed career platform built for the next generation
              of global talent.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-5 sm:gap-6 group">
                <div
                  className={`w-full aspect-[16/10] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border transition-colors duration-300 ${isDarkMode
                      ? "border-white/10 bg-charcoal"
                      : "border-charcoal/10 bg-gray-100"
                    }`}
                >
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    style={{ backgroundImage: `url("${feature.backgroundImage}")` }}
                  ></div>
                </div>
                <div className="px-1 sm:px-2">
                  <h4
                    className={`text-xl sm:text-2xl font-bold leading-normal mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                      }`}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className={`text-sm sm:text-base font-normal leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
