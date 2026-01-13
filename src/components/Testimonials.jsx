import "./Testimonials.css";

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <span className="testimonials-tag">TESTIMONIALS</span>

      <h2 className="testimonials-text">
        “I'm a testimonial. Click to edit me and add text”
      </h2>

      <div className="testimonial-author">
        <h4>Louise Maxwell</h4>
        <p>Company name</p>
      </div>

      <div className="testimonial-dots">
        <span className="dot"></span>
        <span className="dot active"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
};

export default Testimonials;
