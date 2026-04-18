"use client";

import dynamic from "next/dynamic";

const CreateProductForm = dynamic(
  () => import("@/components/admin/CreateProductForm"),
  { ssr: false },
);

export default function AdminCreatePageWrapper() {
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
            Create new products to add to your catalogue.
          </p>
        </header>
        <section>
          <CreateProductForm />
        </section>
      </section>
    </main>
  );
}
