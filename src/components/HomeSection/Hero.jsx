import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/hero-image.png";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center bg-slate-900">
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-400 leading-tight">
            Your future deserves clarity, not confusion.
          </h1>

          <p className="mt-6 text-slate-700 text-lg max-w-md">
            Get personalized career guidance, explore career options, and make
            confident decisions.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-8 px-7 py-3 bg-violet-500 text-white rounded-full font-medium
                       hover:bg-violet-600 transition-transform duration-300 hover:scale-105"
          >
            Join Now
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative h-[300px] md:h-[420px] flex items-end justify-end">
          <div
            className="
      w-full h-full
      bg-gradient-to-br from-violet-400 to-violet-700
      rounded-[60%_40%_30%_70%/60%_30%_70%_40%]
      overflow-hidden
      transition-transform duration-300 hover:scale-105
      relative
    "
          >
            <img
  src={heroImg}
  alt="Career illustration"
  className="
    w-full h-full
    object-cover
    scale-125
    translate-y-[-10%]
  "
/>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
