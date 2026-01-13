import "./About.css";
import aboutImg from "../assets/about-graph.png"; // placeholder image

const About = () => {
  return (
    <section className="about">
      <div className="about-container">

        {/* LEFT CONTENT */}
        <div className="about-text">
          <span className="about-label">ABOUT</span>
          <h2>Our Experts Are<br />the Finest</h2>

          <p>
            I'm a paragraph. Click here to add your own text and edit me.
            It’s easy. Just click “Edit Text” or double click me to add
            your own content and make changes to the font.
          </p>

          <p>
            This is a great space to write a long text about your company
            and your services. Talk about your team and what services you provide.
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
