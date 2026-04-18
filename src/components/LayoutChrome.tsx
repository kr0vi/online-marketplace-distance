"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import NavbarHolder from "@/components/NavbarHolder";
import Footer from "./Footer";

type LayoutChromeProps = {
  children: React.ReactNode;
};

const authRoutes = new Set(["/login", "/register", "/cat"]);

function LayoutChrome({ children }: LayoutChromeProps) {
  const pathname = usePathname();
  const hideChrome = authRoutes.has(pathname);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <Navbar BLUR_TRIGGER_PERCENT={0} />
      </Suspense>
      {/* <NavbarHolder /> */}
      {children}
      <Footer />
    </>
  );
}

export default LayoutChrome;
