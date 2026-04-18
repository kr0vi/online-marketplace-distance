import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import LoginFormPanel from "@/components/auth/LoginFormPanel";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FBFAF7] p-3 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-4 p-2 lg:grid-cols-2">
        <AuthBrandPanel />
        <LoginFormPanel />
      </div>
    </main>
  );
}
