"use client";
import { useUser } from "@/components/lib/auth/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      if (!user || (user as any).role !== "ADMIN") {
        router.replace("/");
      }
    }
  }, [router, user]);

  if (!isLoaded || (isSignedIn && user && (user as any).role !== "ADMIN")) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FBFAF7] px-4 pb-12 pt-24 text-[#332518] sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="border border-[#ded4c8] bg-[#fdfcf9] p-5 sm:p-7">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7f7060]">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-2xl uppercase tracking-[0.06em] sm:text-3xl">
            Product Control Center
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5a4a39]">
            Manage your catalogue from one place.
          </p>
        </header>

        <section className="flex items-center justify-between">
          <div className="border px-8 border-[#ded4c8] bg-white p-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#7f7060]">
              Total Products
            </p>
            <p className="mt-2 text-2xl">128</p>
          </div>
          <div className="border w-40  border-[#ded4c8] bg-white p-4">
            <div className=" text-left">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#7f7060]">
                Active Products
              </p>
              <p className="mt-2 text-2xl">121</p>
            </div>
          </div>
        </section>
        <div className="flex gap-4">
          <article className="border flex-1 cursor-pointer  border-[#ded4c8] bg-white p-5 sm:p-6">
            <Link href={"/admin/create"}>
              <div className="mb-5 flex flex-col justify-between  h-full">
                <h2 className="text-lg uppercase tracking-[0.08em]">
                  Create Product
                </h2>
                <p className="text-xs">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum delectus error ipsum illo fugit id, eos
                  voluptatibus itaque asperiores. Dolore?
                </p>
              </div>
            </Link>
          </article>
          <article className="border flex-1 cursor-pointer  border-[#ded4c8] bg-white p-5 sm:p-6">
            <Link href={"/admin/update"}>
              <div className="mb-5 flex flex-col justify-between  h-full">
                <h2 className="text-lg uppercase tracking-[0.08em]">
                  Update Product
                </h2>
                <p className="text-xs">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum delectus error ipsum illo fugit id, eos
                  voluptatibus itaque asperiores. Dolore?
                </p>
              </div>
            </Link>
          </article>
        </div>
        <article className="border flex-1 cursor-pointer  border-[#ded4c8] bg-white p-5 sm:p-6">
          <Link href={"/admin/delete"}>
            <div className="mb-5 flex flex-col items-center">
              <h2 className="text-lg uppercase tracking-[0.08em]">
                Delete Product
              </h2>
              <p className="text-xs mt-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum delectus error ipsum illo fugit id, eos voluptatibus
                itaque asperiores. Dolore?
              </p>
            </div>
          </Link>
        </article>
      </section>
    </main>
  );
}

export default AdminPage;
