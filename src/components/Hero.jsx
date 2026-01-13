import "./Hero.css";

const Hero = () => {
  return (
    <>
    <section className="hero">
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-text">
          <h1 className="animate">
            Your future deserves clarity, not confusion.
          </h1>

          <p className="animate">
            Get personalized career guidance, explore career options, and make confident decisions.
          </p>

          <button className="hero-btn hover-pop">Join Now</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-visual hover-pop">
          <div className="wave hover-pop"></div>
        </div>

      </div>
    </section>
    </>
  );
};

export default Hero;
