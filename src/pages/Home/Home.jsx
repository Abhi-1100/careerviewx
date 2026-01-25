import useScrollAnimation from "../../hooks/useScrollAnimation";
import Hero from "../../components/HomeSection/Hero";
import Navbar from "../../components/HomeSection/Navbar";
import Services from "../../components/HomeSection/Services";
import About from "../../components/HomeSection/About";
import Testimonials from "../../components/HomeSection/Testimonials";
import CTA from "../../components/HomeSection/CTA";
import Footer from "../../components/HomeSection/Footer";
import "./Home.css";

const Home = () => {
  useScrollAnimation();

  return (
    <>
      <div className="home">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default Home;
