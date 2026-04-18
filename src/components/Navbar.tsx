"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "./lib/auth/useUser";

type NavItem = {
  label: string;
  href: string;
};

function Navbar({
  BLUR_TRIGGER_PERCENT: _BLUR_TRIGGER_PERCENT,
}: {
  BLUR_TRIGGER_PERCENT: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLLIElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryItems = useMemo(
    () => [
      {
        name: "Topwear",
        description: "Tees, shirts, and upper essentials",
        href: "/products?category=TOP",
      },
      {
        name: "Bottomwear",
        description: "Pants, denim, and daily staples",
        href: "/products?category=BOTTOM",
      },
      {
        name: "Accessories",
        description: "Belts, caps, and finishing touches",
        href: "/products?category=ACCESSORIES",
      },
    ],
    [],
  );

  useEffect(() => {
    setIsCategoryDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    if (!isCategoryDrawerOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDrawerOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCategoryDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCategoryDrawerOpen]);

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
  ];

  const { isSignedIn } = useUser();
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = searchQuery.trim();
    if (!normalizedQuery) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(normalizedQuery)}`);
  };

  // const totalItems = cartItems.reduce(
  //   (sum, item) => sum + item.quantity,
  //   0
  // );
  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 mx-auto flex items-center justify-between gap-4 p-2 sm:px-8 lg:px-10 transition-colors duration-300`}
      >
        <nav
          className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/20 bg-black/35 p-4 backdrop-blur-lg transition-colors duration-300 sm:p-5`}
        >
          <Link href="/">
            <p className="text-lg font-semibold tracking-wide text-white">
              Distant
            </p>
          </Link>

          <nav aria-label="Landing navigation" className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm font-semibold text-white/95">
              {navItems.map((item) => {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors duration-200 hover:text-white/70"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="relative" ref={categoryMenuRef}>
                <button
                  type="button"
                  className="transition-colors duration-200 hover:text-white/70"
                  onClick={() => setIsCategoryDrawerOpen((prev) => !prev)}
                  aria-expanded={isCategoryDrawerOpen}
                  aria-controls="category-menu"
                >
                  Categories
                </button>

                {isCategoryDrawerOpen ? (
                  <div
                    id="category-menu"
                    className="absolute left-1/2 top-[calc(100%+30px)] z-50 w-[min(92vw,460px)] -translate-x-1/2 overflow-hidden rounded-xl border border-white/20 bg-white p-4 shadow-[0_26px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl text-black"
                  >
                    <div className="flex items-center justify-between border-b border-black/15 pb-3">
                      <h2 className="text-base font-semibold tracking-wide ">
                        Categories
                      </h2>
                    </div>

                    <div className="mt-4 space-y-2">
                      {categoryItems.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="block rounded-lg  border-black/40 backdrop-blur-3xl border px-4 py-3 transition-all duration-200 hover:bg-white/15"
                          onClick={() => setIsCategoryDrawerOpen(false)}
                        >
                          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-black">
                            {category.name}
                          </p>
                          <p className="mt-1 text-xs text-black/70">
                            {category.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="block">
              <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 backdrop-blur">
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  type="text"
                  className="w-20 bg-transparent text-xs text-white placeholder:text-white/70 focus:w-40 focus:outline-none transition-all duration-300"
                  aria-label="Search"
                  placeholder="Search products"
                />
                <button
                  type="submit"
                  className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90"
                >
                  Go
                </button>
              </div>
            </form>
            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/me"
                  className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#151515]"
                >
                  Account
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#151515]"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

    </>
  );
}

export default Navbar;
