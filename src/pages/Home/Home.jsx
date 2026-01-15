import   useScrollAnimation from "../../hooks/useScrollAnimation";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import Services from "../../components/Services/Services";
import About from "../../components/About/About";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home = () => {
    useScrollAnimation();

  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      {/* <section className="section content">Content Section</section> */}
      <Footer />
    </div>
  );
};

export default Home;
