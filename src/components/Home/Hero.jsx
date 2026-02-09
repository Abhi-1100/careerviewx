import Hero_i0 from '../../assets/Hero_i0.png';
import Hero_i1 from '../../assets/Hero_i1.png';
import Hero_i2 from '../../assets/Hero_i2.png';
import Hero_i3 from '../../assets/Hero_i3.png';

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-1 justify-center py-12 md:py-24 bg-charcoal">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left Content */}
          <div className="flex flex-col gap-8 md:flex-1">
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold w-fit uppercase tracking-[0.1em] border border-primary/20">
                Empowering Future Leaders
              </div>
              <h1 className="text-white text-5xl md:text-7xl font-black leading-tight">
                Find Your Path to a <span className="text-primary italic">Fulfilling</span> Career
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed max-w-[560px]">
                Unlock your potential with AI-driven assessments and expert mentorship designed specifically for students and young professionals.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => navigate("/quiz")} className="flex min-w-[240px] cursor-pointer items-center justify-center rounded-2xl h-16 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/30 hover:scale-[1.02] hover:shadow-primary/40 transition-all">
                Take the Career Quiz
              </button>
              <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-2xl h-16 px-8 border-2 border-white/10 text-white text-lg font-bold hover:bg-white/5 transition-all">
                Explore Mentors
              </button>
            </div>
            <div className="flex items-center gap-5 pt-4">
              <div className="flex -space-x-4">
              <div
                 className="w-12 h-12 rounded-full border-4 border-charcoal bg-cover bg-center"
                 style={{
                  backgroundImage: `url(${Hero_i0})`,
         }}
                ></div>

                <div
                  className="w-12 h-12 rounded-full border-4 border-charcoal bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${Hero_i1})`,
                  }}
                ></div>
                <div
                  className="w-12 h-12 rounded-full border-4 border-charcoal bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${Hero_i2})`,
                  }}
                ></div>
                <div className="w-12 h-12 rounded-full border-4 border-charcoal bg-primary flex items-center justify-center text-[10px] font-bold">
                  +2k
                </div>
              </div>
              <p className="text-base text-gray-400">
                Joined by <span className="text-white font-bold">10,000+</span> students this month
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] group ring-1 ring-white/10">
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${Hero_i3})`,
                }}
              ></div>
              <div className="absolute bottom-8 left-8 right-8 bg-[#1e1e1e]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">AI Career Match</p>
                    <p className="text-xs text-gray-400">98% Accuracy based on skills</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-white/10"></div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary">Top Choice</p>
                  <p className="text-xs text-gray-400 font-medium">UI/UX Designer</p>
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
