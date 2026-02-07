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
import TeamShowcase from "@/components/website/home/TeamShowcase";
import WhyChooseUs from "@/components/website/home/WhyChooseUs";
import TrustMessaging from "@/components/website/home/TrustMessaging";
import TrustSignals from "@/components/website/home/TrustSignals";
import BigHeadlines from "@/components/website/home/BigHeadlines";
import FAQSection from "@/components/website/home/FAQSection";
import  WhatsAppButton from "@/components/website/WhatsAppButton";
import { getCategories, getServices } from "@/lib/main/getHomePageData";

export const metadata = {
  title: "CA Vakil",
};

// Force dynamic rendering - skip static generation during build
export const dynamic = 'force-dynamic';

export default async function Home() {
  const servicesData = await getServices();
  const services = servicesData?.data || [];
  const categoriesData = await getCategories();
  const categories = categoriesData?.data || [];

  return (
    <div className="">
      <NavBar services={services} categories={categories} />
      <div className="pt-28 md:pt-32">
        <HeroSection2 />
        <BigHeadlines />
        <TrustMessaging />
        <ServicesByCategory services={services} categories={categories} />
        <ConnectWithLawyer />
        <LegalSolutions />
        <div className="pt-6 md:pt-10" />
        <VideoSection />
        <div className="pt-10 md:pt-14" />
        <TeamShowcase />
        <TrustSignals />
        <div className="pt-10 md:pt-16" />
        <Testimonials />
        <WhyChooseUs />
        <FAQSection />
        <Contact />
        <Footer />
        <WhatsAppButton/>
        <CallButton />
      </div>
    </div>
  );
}