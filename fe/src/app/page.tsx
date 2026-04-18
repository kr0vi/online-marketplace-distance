
export const dynamic = "force-dynamic";

import BestSellerSection from "@/components/BestSellerSection";
import Footer from "@/components/Footer";
import FreshFitSection from "@/components/FreshFitSection";
import LandingHero from "@/components/landing/LandingHero";
import ModernStyleSection from "@/components/ModernStyleSection";
import Navbar from "@/components/Navbar";

function page() {
  return (
    <main>
      {/* <Navbar /> */}
      <LandingHero />
      <FreshFitSection></FreshFitSection>
      <ModernStyleSection />
      <BestSellerSection />
  </main>
  );
}

export default page;
