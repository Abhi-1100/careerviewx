import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <section className="section hero">abhi Hero Section</section>
      <section className="section about">About Section</section>
      <section className="section content">Content Section</section>
    </div>
  );
};

export default Home;
