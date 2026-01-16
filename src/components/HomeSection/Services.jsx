const Services = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">

        {/* HEADING */}
        <div className="text-center mb-20 opacity-0 animate-[fadeUp_0.8s_ease-out_forwards]">
          <span className="text-violet-500 font-semibold tracking-widest text-sm">
            SERVICES
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            Find the Right Career Path <br /> for Your Future
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {/* CARD 1 */}
          <div className="text-center px-5 opacity-0 animate-[fadeUp_0.8s_ease-out_0.1s_forwards]
                          hover:-translate-y-2 transition-transform duration-300">
            <div className="w-20 h-20 bg-violet-500 rounded-full mx-auto mb-6"></div>

            <h3 className="text-lg font-semibold text-slate-900">
              Personalized Career Guidance
            </h3>

            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              Students receive career suggestions based on their interests,
              skills, and answers — not random advice.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="text-center px-5 opacity-0 animate-[fadeUp_0.8s_ease-out_0.2s_forwards]
                          hover:-translate-y-2 transition-transform duration-300">
            <div className="w-20 h-20 border-[6px] border-violet-500 rounded-2xl mx-auto mb-6
                            rotate-[-45deg]"></div>

            <h3 className="text-lg font-semibold text-slate-900">
              Skill & Pathway Recommendations
            </h3>

            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              We suggest the right skills, courses, and learning paths needed
              for the chosen career direction.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="text-center px-5 opacity-0 animate-[fadeUp_0.8s_ease-out_0.3s_forwards]
                          hover:-translate-y-2 transition-transform duration-300">
            <div className="w-20 h-20 bg-violet-500 mx-auto mb-6"></div>

            <h3 className="text-lg font-semibold text-slate-900">
              Clear Career Roadmap
            </h3>

            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              A step-by-step roadmap that shows what to do next — after school
              or college — with clarity and confidence.
            </p>
          </div>

        </div>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Services;
