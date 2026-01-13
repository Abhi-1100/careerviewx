import "./Services.css";

const Services = () => {
  return (
    <section className="services">
      <div className="services-container">

        {/* HEADING */}
        <div className="services-heading">
          <span>SERVICES</span>
          <h2>Find the Right Career Path<br /> for Your Future  </h2>
        </div>

        {/* CARDS */}
        <div className="services-cards">

          <div className="service-card">
            <div className="icon circle service-card animate hover-pop"></div>
            <h3 className="animate">Personalized Career Guidance</h3>
            <p className="animate">
              Students receive career suggestions based on their interests, skills, and answers — not random advice.
            </p>
          </div>

          <div className="service-card">
            <div className="icon check service-card animate hover-pop"></div>
            <h3 className="animate">Skill & Pathway Recommendations</h3>
            <p className="animate">
              We suggest the right skills, courses, and learning paths needed for the chosen career direction.
            </p>
          </div>

          <div className="service-card">
            <div className="icon square service-card animate hover-pop"></div>
            <h3 className="animate">Clear Career Roadmap</h3>
            <p className="animate">
              A step-by-step roadmap that shows what to do next — after school or college — with clarity and confidence.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
