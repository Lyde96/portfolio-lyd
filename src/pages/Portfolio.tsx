import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import PortfolioFooter from "@/components/PortfolioFooter";

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <PortfolioFooter />
    </div>
  );
};

export default Portfolio;