import "./About.css";
import aboutImg from "../../assets/about-graph.png"; // placeholder image

const About = () => {
  return (
    <section className="about">
      <div className="about-container">

        {/* LEFT CONTENT */}
        <div className="about-text">
          <span className="about-label">ABOUT</span>
          <h2 className="animate">Your Career<br/>Starts Here</h2>

          <p>
            Choosing the right career is one of the most important decisions in a student’s life, yet many students feel confused due to lack of proper guidance and clarity. CareerGuide is a career guidance platform designed to help students make informed decisions about their future.
          </p>

          <p>
            Our platform analyzes students’ interests, strengths, and academic background to provide personalized stream and career recommendations. Along with career suggestions, we offer clear roadmaps, required skills, and future scope to help students confidently plan their academic and professional journey.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="about-image">
          <img src={aboutImg} alt="Growth graph" />
        </div>

      </div>
    </section>
  );
};

export default About;
