import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Services />
      <section className="section about">About Section</section>
      <section className="section content">Content Section</section>
      <Footer />
    </div>
  );
};

export default Home;
