const Services = () => {
  const services = [
    {
      icon: "edit_note",
      title: "Discover Strengths",
      description: "Take our psychometric quiz and AI skill assessment to identify your unique natural talents and latent interests."
    },
    {
      icon: "travel_explore",
      title: "Explore Careers",
      description: "Browse a curated database of 500+ career paths that match your profile. Get insights into salary, growth, and requirements."
    },
    {
      icon: "groups",
      title: "Connect & Grow",
      description: "Get 1-on-1 guidance from industry mentors and follow personalized learning roadmaps to land your dream job."
    }
  ];

  return (
    <section className="flex flex-1 justify-center py-24 bg-charcoal">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-6 md:px-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="text-white tracking-tight text-5xl font-black leading-tight max-w-[720px]">
              Your Journey to Success
            </h2>
            <p className="text-gray-400 text-xl font-normal leading-normal max-w-[600px]">
              A structured approach to finding and landing your dream career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group flex flex-col gap-6 rounded-3xl border border-white/5 bg-black/40 p-10 hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-5xl">{service.icon}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-white text-2xl font-black leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-base font-normal leading-relaxed">
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
