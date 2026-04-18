function ModernStyleSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* TODO: Remove temporary section debug background color (bg-emerald-300/20). */}
      <img
        src="https://cdn.cosmos.so/2b710cf0-d024-499d-a61c-e207b7b21e9d?format=jpeg"
        className="absolute inset-0 w-full h-full object-cover object-[0%_40%]"
        alt="Background image for modern style section"
      />

      <div className="relative z-10 mx-auto flex min-h-130 w-full max-w-300 items-center justify-center px-6 py-14 sm:min-h-155 sm:px-10">
        <div className="max-w-155 text-center text-white">
          <div className="mx-auto inline-flex items-center rounded-full bg-white/22 p-1 backdrop-blur">
            <span className="rounded-full bg-white p-2 text-xs font-semibold text-[#252525]">
              Wearix
            </span>
            <span className="p-2 text-xs font-semibold text-white/90">
              Since 2014
            </span>
          </div>

          <h2 className="mt-6 text-balance font-semibold leading-tight text-5xl">
            Defining modern style
          </h2>

          <p className="mx-auto mt-6 max-w-140 text-pretty  leading-relaxed text-white/88 text-sm">
            A decade ago, we set out to redefine the modern silhouette. Today,
            we merge urban utility with high-end aesthetics in a resilient,
            beautiful collection.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#1f1f1f]"
            >
              More about us
            </button>
            <button
              type="button"
              className="rounded-full bg-white/20 px-3 py-2 text-sm  text-white backdrop-blur"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModernStyleSection;
