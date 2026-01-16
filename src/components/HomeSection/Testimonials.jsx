const Testimonials = () => {
  return (
    <section className="min-h-screen bg-purple-600 px-5 py-24 flex flex-col items-center justify-center text-center text-white">

      <span className="tracking-widest text-sm opacity-90 mb-10 animate-fade-in">
        TESTIMONIALS
      </span>

      <h2 className="text-4xl md:text-5xl font-semibold max-w-4xl leading-tight mb-12 animate-fade-in-up">
        “I'm a testimonial. Click to edit me and add text”
      </h2>

      <div className="mb-12">
        <h4 className="text-lg font-semibold">Louise Maxwell</h4>
        <p className="text-sm opacity-80">Company name</p>
      </div>

      <div className="flex gap-3">
        <span className="w-2 h-2 bg-white/40 rounded-full"></span>
        <span className="w-2 h-2 bg-white rounded-full"></span>
        <span className="w-2 h-2 bg-white/40 rounded-full"></span>
      </div>

    </section>
  );
};

export default Testimonials;
