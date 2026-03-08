import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CategorySection from "@/components/CategorySection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialSection from "@/components/TestimonialSection";
import SoftwareSection from "@/components/SoftwareSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CategorySection />
      <PortfolioSection />
      <TestimonialSection />
      <SoftwareSection />
      <ProcessSection />
      <Footer />
    </div>
  );
};

export default Index;
