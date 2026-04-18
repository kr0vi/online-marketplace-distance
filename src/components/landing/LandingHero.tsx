import LandingHeroBackdrop from "@/components/landing/LandingHeroBackdrop";
import LandingHeroCopy from "@/components/landing/LandingHeroCopy";

function LandingHero() {
  return (
    <section className="relative h-screen overflow-hidden">

      <LandingHeroBackdrop />

      <div className="relative flex min-h-[calc(100vh-76px)] flex-col">
        

        <div className="flex h-[65vh]  items-center justify-center py-14 sm:py-16 lg:py-20">
          <LandingHeroCopy />
        </div>

      </div>
    </section>
  );
}

export default LandingHero;
