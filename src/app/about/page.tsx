export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111111]">
      <section className="relative isolate overflow-hidden">
        <img
          src="https://cdn.cosmos.so/2b710cf0-d024-499d-a61c-e207b7b21e9d?format=jpeg"
          className="absolute inset-0 h-full w-full object-cover object-[0%_40%]"
          alt="About background"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-300 flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[80vh]">
          <div className="mx-auto inline-flex items-center rounded-md bg-white/22 p-1 backdrop-blur">
            <span className="rounded-md bg-white p-2 text-xs font-semibold text-[#252525]">
              Distant
            </span>
            <span className="p-2 text-xs font-semibold text-white/90">
              Since 2018
            </span>
          </div>
          <h1 className="mt-6 text-balance font-semibold leading-tight text-5xl text-white sm:text-6xl">
            Less clutter, better fits.
            <br /> Built for daily wear.
          </h1>
          <p className="mx-auto mt-6 max-w-185 text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
            We keep the catalog tight, the materials dependable, and the
            experience fast. Every drop is designed to mix easily across your
            week.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/products"
              className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-[#1f1f1f]"
            >
              Shop collection
            </a>
            <a
              href="/search"
              className="rounded-md bg-white/20 px-4 py-2 text-xs text-white backdrop-blur"
            >
              Explore styles
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 mt-40 mb-20">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs bg-black text-white w-fit p-2 rounded-md">
              Our Story
            </p>
            <h3 className="text-5xl font-semibold text-left py-12">
              A lean studio with a global reach
            </h3>
            <p className="max-w-xl text-sm leading-7 text-[#3a3a3a] sm:text-base">
              We started with 18 pieces and a two-person studio. The focus is
              still the same: build versatile essentials at a fair price, and
              deliver them quickly. We now ship from three fulfillment hubs and
              keep each release intentionally small.
            </p>
          </div>
          <div className="grid gap-4">
            {["Design", "Fit", "Durability"].map((title) => (
              <div
                key={title}
                className="rounded-xl border border-black/10 bg-white p-5"
              >
                <h4 className="text-lg font-semibold">{title} first</h4>
                <p className="mt-2 text-sm leading-6 text-[#4b4b4b]">
                  {title === "Design" &&
                    "Every drop starts with a single silhouette we refine for 6-8 weeks."}
                  {title === "Fit" &&
                    "Sizes are tested across three height ranges and two body types."}
                  {title === "Durability" &&
                    "We wash-test fabrics for shrink and color hold before launch."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 mt-40 mb-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs bg-black text-white w-fit p-2 rounded-md">
            What We Make
          </p>
          <h3 className="text-5xl font-semibold text-left py-12">
            A tight lineup with intentional drops
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Core Essentials",
              "Studio Tailoring",
              "Travel Editions",
              "Weekend Knit",
            ].map((line) => (
              <div
                key={line}
                className="rounded-xl border border-black/10 bg-white p-6"
              >
                <p className="text-sm font-semibold">{line}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#5a5a5a]">
                  8-22 pieces
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 mt-40 mb-20">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs bg-black text-white w-fit p-2 rounded-md">
              The Experience
            </p>
            <h3 className="text-5xl font-semibold text-left py-12">
              Designed to shop fast and wear longer
            </h3>
            <ul className="space-y-4 text-sm text-[#3a3a3a] sm:text-base">
              <li>Dispatch within 24-48 hours on most orders.</li>
              <li>Size guidance and fit notes on every product page.</li>
              <li>Easy exchanges for size issues within 14 days.</li>
              <li>Support 6 days a week, 10:00 - 19:00.</li>
            </ul>
          </div>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-xl border border-black/10">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"
                alt="Store preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Pieces launched", value: "1,240+" },
                { label: "Repeat buyers", value: "58%" },
                { label: "Avg. ship time", value: "2.4 days" },
                { label: "Average rating", value: "4.9" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-black/10 bg-white p-5"
                >
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.25em] text-[#5a5a5a]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 mt-40 mb-20">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs bg-black text-white w-fit p-2 rounded-md">
              Responsibility
            </p>
            <h3 className="text-5xl font-semibold text-left py-12">
              Reduced waste, transparent sourcing
            </h3>
            <p className="max-w-xl text-sm leading-7 text-[#3a3a3a] sm:text-base">
              We run small-batch production, source traceable cotton blends, and
              keep packaging paper-based to reduce unnecessary waste.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "78% recycled packaging",
              "35% lower water use",
              "Plastic-free shipping",
              "Repair program in 5 cities",
            ].map((note) => (
              <div
                key={note}
                className="rounded-xl border border-black/10 bg-white p-5"
              >
                <p className="text-sm font-semibold">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 mt-40 mb-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs bg-black text-white w-fit p-2 rounded-md">
            Visit Us
          </p>
          <h3 className="text-5xl font-semibold text-left py-12">
            Flagship spaces in five cities
          </h3>
          <div className="flex flex-wrap gap-3">
            {["New York", "London", "Tokyo", "Lisbon", "Mumbai"].map((city) => (
              <span
                key={city}
                className="rounded-md border border-black/10 bg-white px-4 py-2 text-xs font-semibold"
              >
                {city}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/products"
              className="rounded-md bg-black px-5 py-2 text-xs font-semibold text-white"
            >
              Shop collection
            </a>
            <a
              href="/search"
              className="rounded-md border border-black px-5 py-2 text-xs font-semibold text-black"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
