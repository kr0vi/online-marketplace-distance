import Link from "next/link";

function LandingHeroCopy() {
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-195 flex-col items-center px-4 text-center sm:px-6">
      <div className="mb-7 inline-flex items-center rounded-full bg-white/22 p-1 backdrop-blur">
        <span className="rounded-full bg-white text-xs font-semibold text-[#141414] p-1 px-2">
          Soft
        </span>
        <span className="text-xs font-light text-white p-1">
          Warm Winter Layers
        </span>
      </div>

      <h1 className="text-balance font-semibold leading-[1.2] text-white text-5xl">
        Leave Earth Wearing
        <br />
        Better Clothing
      </h1>

      <p className="mt-6 max-w-185 text-lg w-2/3 leading-[1.3] text-pretty  text-white/85 ">
        Wear the universe on your sleeve with our handcrafted pieces.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="#freshFitsSection"
          className="rounded-full bg-white text-xs p-2 font-semibold text-[#101010] "
        >
          See all collections
        </Link>
      </div>
    </div>
  );
}

export default LandingHeroCopy;
