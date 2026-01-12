import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-text">
          <h1>
            Find the Right Career Path<br /> for Your Future  
          </h1>

          <p>
            Get personalized career guidance, explore career options, and make confident decisions.
          </p>

          <button className="hero-btn">Learn More</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-visual">
          <div className="wave"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
