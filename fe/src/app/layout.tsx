import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
//@ts-ignore
import "./globals.css";
import LayoutChrome from "@/components/LayoutChrome";
import { AuthProvider } from "@/components/lib/auth/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-logo-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Distant Wears",
  description:
    "Distant Wears is a fashion e-commerce store that offers a curated selection of trendy and stylish clothing for men and women.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceSerif.variable} bg-[#f8f7f4] font-sans antialiased`}
      >
        <AuthProvider>
          <LayoutChrome>{children}</LayoutChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
