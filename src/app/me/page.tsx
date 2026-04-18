"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/lib/auth/useUser";
import MeLayoutSidebar from "@/components/me/MeLayoutSidebar";
import MePersonalInfo from "@/components/me/MePersonalInfo";
import MeOrdersList from "@/components/me/MeOrdersList";

export default function MePage() {
  const { user, isSignedIn, isLoaded, refresh } = useUser();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"profile" | "orders">(
    "profile",
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleProfileUpdate = () => {
    setRefreshTrigger((prev) => prev + 1);
    refresh();
  };

  if (!isLoaded) {
    return (
      <main className="relative min-h-screen bg-[#f8f7f4]">
        <section className="mx-auto w-full max-w-6xl px-6 pt-24 pb-32">
          <div className="h-80 border border-black/10 bg-white animate-pulse" />
        </section>
      </main>
    );
  }

  if (!isSignedIn || !user) {
    return null;
  }

  return (
    <main className="relative min-h-screen bg-">
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.45em] text-black/60 font-medium">
            Account
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold text-black">
            Settings
          </h1>
          <p className="mt-3 text-sm text-black/65 max-w-2xl">
            Manage your account information and view your orders.
          </p>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <MeLayoutSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "profile" && (
              <MePersonalInfo user={user} onUpdate={handleProfileUpdate} />
            )}
            {activeSection === "orders" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-6">
                  My Orders
                </h2>
                <MeOrdersList key={refreshTrigger} />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
