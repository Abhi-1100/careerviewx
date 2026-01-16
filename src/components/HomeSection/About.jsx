import aboutImg from "../../assets/about-graph.png";

const About = () => {
  return (
    <>
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="opacity-0 animate-[fadeUp_0.8s_ease-out_forwards]">
          <span className="text-4xl text-violet-500 font-semibold tracking-widest text-sm">
            ABOUT
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-8 leading-tight">
            Your Career <br /> Starts Here
          </h2>

          <p className="text-slate-600 text-base leading-relaxed mb-5 max-w-md">
            Choosing the right career is one of the most important decisions in a
            student’s life, yet many students feel confused due to lack of proper
            guidance and clarity. CareerGuide is a career guidance platform
            designed to help students make informed decisions about their future.
          </p>

          <p className="text-slate-600 text-base leading-relaxed max-w-md">
            Our platform analyzes students’ interests, strengths, and academic
            background to provide personalized stream and career recommendations.
            Along with career suggestions, we offer clear roadmaps, required
            skills, and future scope to help students confidently plan their
            academic and professional journey.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="opacity-0 animate-[fadeUp_0.8s_ease-out_0.2s_forwards]">
          <div className="bg-gradient-to-b from-violet-100 to-violet-300 rounded-2xl overflow-hidden
                          transition-transform duration-300 hover:scale-105">
            <img
              src={aboutImg}
              alt="Growth graph"
              className="w-full h-full object-cover"
              />
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
                </>
  );
};

export default About;
