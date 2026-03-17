import Testimonials_i0 from '../../assets/Testimonials_i0.png';
import Testimonials_i1 from '../../assets/Testimonials_i1.png';
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Testimonials = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const testimonials = [
    {
      quote:
        "PathFinder completely changed my trajectory. I was a business student but felt lost. Their quiz pointed me toward Product Design, and now I'm interning at a startup I love.",
      author: "Alex Rivera",
      role: "Junior Product Designer • Stanford University",
      rating: 5,
      image: Testimonials_i0,
    },
    {
      quote:
        "The mentor network is incredible. I got to talk directly with an engineer at Google who gave me the exact roadmap I needed to prepare for my technical interviews.",
      author: "David Chen",
      role: "CS Senior • University of Waterloo",
      rating: 5,
      image: Testimonials_i1,
    },
  ];

  return (
    <section
      className={`flex flex-1 justify-center py-14 sm:py-20 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-charcoal" : "bg-surface-light"
        }`}
    >
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 sm:px-6 md:px-10">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-5 sm:gap-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                }`}
            >
              Voices of CareerPath
            </h2>
            <p
              className={`text-base sm:text-xl max-w-[600px] transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
            >
              Real stories from students who decoded their career future.
            </p>
          </div>
          <button
            className={`flex items-center gap-3 font-bold hover:gap-5 transition-all group py-2 px-4 rounded-lg self-start sm:self-auto ${isDarkMode
                ? "text-primary hover:bg-primary/10"
                : "text-primary hover:bg-primary/10"
              }`}
          >
            Read all stories{" "}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] border flex flex-col sm:flex-row gap-6 sm:gap-8 shadow-2xl relative overflow-hidden group transition-colors duration-300 ${isDarkMode
                  ? "bg-charcoal border-white/5"
                  : "bg-white border-charcoal/10"
                }`}
            >
              <div
                className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-bl-full group-hover:bg-primary/10 transition-colors ${isDarkMode ? "bg-primary/5" : "bg-primary/5"
                  }`}
              ></div>
              {/* Avatar */}
              <div
                className={`w-20 h-20 sm:w-36 sm:h-36 shrink-0 bg-cover bg-center rounded-[1rem] sm:rounded-[1.5rem] border-2 ${isDarkMode ? "border-primary/20" : "border-primary/20"
                  }`}
                style={{ backgroundImage: `url("${testimonial.image}")` }}
              ></div>
              {/* Content */}
              <div className="flex flex-col gap-4 sm:gap-5 relative z-10">
                <div className="text-primary flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined fill-1 text-base"
                    >
                      star
                    </span>
                  ))}
                </div>
                <p
                  className={`italic text-base sm:text-xl leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                    }`}
                >
                  "{testimonial.quote}"
                </p>
                <div>
                  <p
                    className={`font-bold text-base sm:text-lg transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"
                      }`}
                  >
                    {testimonial.author}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
