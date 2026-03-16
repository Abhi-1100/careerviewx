import useScrollAnimation from "../hooks/useScrollAnimation";
import Hero from "../components/Home/Hero";
import Navbar from "../components/Home/Navbar";
import Services from "../components/Home/Services";
import About from "../components/Home/About";
import Testimonials from "../components/Home/Testimonials";
import CTA from "../components/Home/CTA";
import Footer from "../components/Home/Footer";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  useScrollAnimation();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <div className={`home transition-colors duration-300 ${isDarkMode ? "bg-charcoal text-white" : "bg-surface-light text-charcoal"}`}>
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
