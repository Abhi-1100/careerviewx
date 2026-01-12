import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">CareerViewX</div>

        {/* Menu */}
        <nav className="nav-links">
          <a href="#Home">Home</a>
          <a href="#Services">Services</a>
          <a href="#About">About</a>
          <a href="#Testimonials">Testimonials</a>
          <a href="#Clients">Clients</a>
          <a href="#Contact">Contact</a>
        </nav>

        {/* CTA */}
        <button className="nav-btn">Learn More</button>
      </div>
    </header>
  );
};

export default Navbar;
