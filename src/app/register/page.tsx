import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import SignupFormPanel from "@/components/auth/SignupFormPanel";

export default function RegisterPage() {
  return (
    <main className="min-h-screen   p-3 sm:p-4 lg:p-6">
      <div className="mx-auto   grid min-h-[calc(100vh-3rem)] max-w-7xl gap-4 p-2 lg:grid-cols-2">
        <AuthBrandPanel />
        <SignupFormPanel />
      </div>
    </main>
  );
}
