import Link from "next/link";
import LandingHeroBackdrop from "./landing/LandingHeroBackdrop";

const shopLinks = [
  { label: "New Arrivals", href: "/products?isNew=true" },
  { label: "Featured", href: "/products?isFeatured=true" },
  { label: "Tops", href: "/products?category=TOP" },
  { label: "Bottoms", href: "/products?category=BOTTOM" },
  { label: "Accessories", href: "/products?category=ACCESSORIES" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "My Account", href: "/me" },
  { label: "Orders", href: "/orders" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden h-[70vh]">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://cdn.cosmos.so/2b710cf0-d024-499d-a61c-e207b7b21e9d?format=jpeg"
            className="w-full h-full object-cover object-[0%_79%]"
          ></img>
        </div>
        <div className="mx-auto grid w-full max-w-7xl py-14 grid-cols-12 px-14 z-20  rounded-full">
          <section className="col-span-5">
            <p className="uppercase text-2xl tracking-wide text-white">
              Distant
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white">
              Elevated essentials for everyday wear. Thoughtful fits, modern
              textures, and timeless silhouettes built for movement.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/products"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition "
              >
                Shop Collection
              </Link>
              <Link
                href="/search"
                className="rounded-full border border-white px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#e7dfd0]"
              >
                Search Styles
              </Link>
            </div>
          </section>

          <section className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Shop
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className=" transition text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white transition hover:text-[#8a6a3f]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white">
              <li>support@distantwear.com</li>
              <li>+91 98765 43210</li>
              <li>Mon - Sat, 10:00 - 19:00</li>
            </ul>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
