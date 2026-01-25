const About = () => {
  const features = [
    {
      title: "AI-Powered Insights",
      description: "Our algorithms analyze millions of data points to provide hyper-personalized career matches that evolve as you gain new skills.",
      backgroundImage: "https://images.unsplash.com/photo-1549887534-7e9e2c2f2c4c?w=800&h=600&fit=crop"
    },
    {
      title: "Global Mentor Network",
      description: "Direct access to 2,000+ vetted experts from top-tier companies like Google, Microsoft, and McKinsey.",
      backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
    },
    {
      title: "Interactive Resources",
      description: "Exclusive access to live webinars, interview prep simulators, and step-by-step career roadmap templates.",
      backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section className="flex flex-1 justify-center py-24 bg-charcoal">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-6 md:px-10">
        <div className="flex flex-col gap-14 @container">
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-[32px] md:text-5xl font-black leading-tight tracking-tight">
              Why Leading Students Choose Us
            </h2>
            <p className="text-gray-400 text-xl max-w-[600px]">
              The most data-backed career platform built for the next generation of global talent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-6 group">
                <div className="w-full aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-charcoal">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    style={{
                      backgroundImage: `url("${feature.backgroundImage}")`
                    }}
                  ></div>
                </div>
                <div className="px-2">
                  <h4 className="text-white text-2xl font-bold leading-normal mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-base font-normal leading-relaxed">
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
