type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Shop", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

function LandingTopBar() {
  return (
    <header className="fixed   w-screen z-20 mx-auto flex  items-center  justify-between gap-4 px-4 py-6 sm:px-8 lg:px-10">
      <nav className="flex w-[50%]  mx-auto  items-center justify-between">
        <p className=" text-lg font-semibold uppercase tracking-wide text-white">
          WEARIX
        </p>

        <nav aria-label="Landing navigation" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-semibold text-white/95">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="transition-colors duration-200 hover:text-white/70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white backdrop-blur"
            aria-label="Search"
          ></button>
          <button
            type="button"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#151515]"
          >
            Shop all items
          </button>
        </div>
      </nav>
    </header>
  );
}

export default LandingTopBar;
