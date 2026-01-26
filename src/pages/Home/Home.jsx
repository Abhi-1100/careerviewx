import useScrollAnimation from "../../hooks/useScrollAnimation";
import Hero from "../../components/Home/Hero";
import Navbar from "../../components/Home/Navbar";
import Services from "../../components/Home/Services";
import About from "../../components/Home/About";
import Testimonials from "../../components/Home/Testimonials";
import CTA from "../../components/Home/CTA";
import Footer from "../../components/Home/Footer";
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
