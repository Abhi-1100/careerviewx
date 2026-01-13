import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <section className="section content">Content Section</section>
      <Footer />
    </div>
  );
};

export default Home;
