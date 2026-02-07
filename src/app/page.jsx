// app/page.jsx
import CallButton from "@/components/website/CallButton";
import Footer from "@/components/website/common/Footer";
import NavBar from "@/components/website/common/Navbar";
import { ConnectWithLawyer } from "@/components/website/home/ConnectWithLawyer";
import Contact from "@/components/website/home/Contact";
import HeroSection2 from "@/components/website/home/HeroSection2";
import { LegalSolutions } from "@/components/website/home/LegalSolutions";
import ServicesByCategory from "@/components/website/home/ServicesByCategory";
import Testimonials from "@/components/website/home/Testimonials";
import VideoSection from "@/components/website/home/VideoSection";
import WhyChooseUs from "@/components/website/home/WhyChooseUs";
import { getCategories, getServices } from "@/lib/main/getHomePageData";

export default async function Home() {
  const servicesData = await getServices();
  const services = servicesData?.data || [];
  const categoriesData = await getCategories();
  const categories = categoriesData?.data || [];

  return (
    <div className="">
      <NavBar services={services} categories={categories} />
      <div className="pt-20">
        <HeroSection2 />
        <ServicesByCategory services={services} categories={categories} />
        <ConnectWithLawyer />
        <LegalSolutions />
        <VideoSection/>
        <Testimonials />
        <WhyChooseUs />
        <Contact />
        <Footer />
        <CallButton />
      </div>
    </div>
  );
}