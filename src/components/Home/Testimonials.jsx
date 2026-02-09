import Testimonials_i0 from '../../assets/Testimonials_i0.png';
import Testimonials_i1 from '../../assets/Testimonials_i1.png';


const Testimonials = () => {
  const testimonials = [
    {
      quote: "PathFinder completely changed my trajectory. I was a business student but felt lost. Their quiz pointed me toward Product Design, and now I'm interning at a startup I love.",
      author: "Alex Rivera",
      role: "Junior Product Designer • Stanford University",
      rating: 5,
      image: Testimonials_i0
    },
    {
      quote: "The mentor network is incredible. I got to talk directly with an engineer at Google who gave me the exact roadmap I needed to prepare for my technical interviews.",
      author: "David Chen",
      role: "CS Senior • University of Waterloo",
      rating: 5,
      image: Testimonials_i1
    }
  ];

  return (
    <section className="flex flex-1 justify-center py-24 bg-charcoal">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-[32px] md:text-5xl font-black leading-tight tracking-tight">Voices of CareerViewX</h2>
            <p className="text-gray-400 text-xl max-w-[600px]">Real stories from students who decoded their career future.</p>
          </div>
          <button className="flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all group py-2 px-4 rounded-lg hover:bg-primary/10">
            Read all stories <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-charcoal p-10 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row gap-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors"></div>
              <div
                className="w-full md:w-36 h-36 shrink-0 bg-cover bg-center rounded-[1.5rem] border-2 border-primary/20"
                style={{
                  backgroundImage: `url("${testimonial.image}")`
                }}
              ></div>
              <div className="flex flex-col gap-5 relative z-10">
                <div className="text-primary flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined fill-1 text-base">star</span>
                  ))}
                </div>
                <p className="text-white italic text-xl leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-white text-lg">{testimonial.author}</p>
                  <p className="text-sm text-gray-400 font-medium">{testimonial.role}</p>
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
