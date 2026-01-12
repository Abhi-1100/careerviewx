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
            <div className="icon circle"></div>
            <h3>Personalized Career Guidance</h3>
            <p>
              Students receive career suggestions based on their interests, skills, and answers — not random advice.
            </p>
          </div>

          <div className="service-card">
            <div className="icon check"></div>
            <h3>Skill & Pathway Recommendations</h3>
            <p>
              We suggest the right skills, courses, and learning paths needed for the chosen career direction.
            </p>
          </div>

          <div className="service-card">
            <div className="icon square"></div>
            <h3>Clear Career Roadmap</h3>
            <p>
              A step-by-step roadmap that shows what to do next — after school or college — with clarity and confidence.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
