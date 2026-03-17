import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Services = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const services = [
    {
      icon: "edit_note",
      title: "Discover Strengths",
      description:
        "Take our psychometric quiz and AI skill assessment to identify your unique natural talents and latent interests.",
    },
    {
      icon: "travel_explore",
      title: "Explore Careers",
      description:
        "Browse a curated database of 500+ career paths that match your profile. Get insights into salary, growth, and requirements.",
    },
    {
      icon: "groups",
      title: "Connect & Grow",
      description:
        "Get 1-on-1 guidance from industry mentors and follow personalized learning roadmaps to land your dream job.",
    },
  ];

  return (
    <section
      className={`flex flex-1 justify-center py-14 sm:py-20 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-charcoal" : "bg-surface-light"
        }`}
    >
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4 text-center items-center">
            <h2
              className={`tracking-tight text-3xl sm:text-4xl md:text-5xl font-black leading-tight max-w-[720px] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                }`}
            >
              Your Journey to Success
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl font-normal leading-normal max-w-[600px] transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
            >
              A structured approach to finding and landing your dream career.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group flex flex-col gap-5 sm:gap-6 rounded-2xl sm:rounded-3xl border p-7 sm:p-10 hover:border-primary/30 transition-all duration-500 ${isDarkMode
                    ? "border-white/5 bg-black/40"
                    : "border-charcoal/10 bg-white shadow-sm"
                  }`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl text-primary group-hover:text-white transition-all duration-300 ${isDarkMode
                      ? "bg-primary/20 group-hover:bg-primary"
                      : "bg-primary/10 group-hover:bg-primary"
                    }`}
                >
                  <span className="material-symbols-outlined text-4xl sm:text-5xl">
                    {service.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3
                    className={`text-xl sm:text-2xl font-black leading-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                      }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base font-normal leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {service.description}
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

export default Services;
