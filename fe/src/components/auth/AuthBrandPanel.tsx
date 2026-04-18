function AuthBrandPanel() {
  return (
    <aside className="relative hidden h-full overflow-hidden rounded-4xl p-7 text-[#FBFAF7] lg:block ">
      <img
        src="https://cdn.cosmos.so/2b710cf0-d024-499d-a61c-e207b7b21e9d?format=jpeg"
        alt="image"
        className="h-full w-full object-cover absolute inset-0"
      />
      {/* TODO: Remove temporary debug color from auth visual panel (bg-cyan-950/25). */}
      <div className="absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-white/90 uppercase">
          <span>A Wise Quote</span>
          <span className="h-px w-24 bg-white/60" />
        </div>

        <div className="max-w-sm space-y-4 pb-2">
          <h2 className=" text-6xl leading-[0.95]">Shop Smarter Every Day</h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/85">
            Discover curated picks, secure checkout, and faster access to your
            wishlist in one place.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default AuthBrandPanel;
