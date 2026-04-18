"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../lib/auth/useUser";
import { login } from "../lib/api";

function LoginFormPanel() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { refresh, isLoaded, isSignedIn } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(formValues.email, formValues.password);
      await refresh();
    } catch (err: any) {
      alert("login failed" + err.message);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = "/";
    }
  }, [isLoaded, isSignedIn]);

  return (
    <section className="h-full overflow-y-auto rounded-4xl bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center p-3 sm:p-4">
        <header className="mb-6 text-center sm:mb-8">
          <div className="mb-7 flex items-center justify-center gap-2 text-xl font-medium text-black sm:mb-9">
            <span className="inline-flex h-4 w-4 rounded-full border border-black" />
            <span>Distant</span>
          </div>

          <h1 className=" text-4xl font-medium leading-tight text-black sm:text-5xl">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-black sm:text-[15px]">
            Sign in to manage orders, saved items, and account settings.
          </p>
        </header>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm text-[#1f1f1f]">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={formValues.email}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setFormValues((prev) => ({
                  ...prev,
                  email: value,
                }));
              }}
              className="h-11 w-full rounded-lg border border-black px-3 text-sm text-black outline-none transition focus:border-[#171717]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[#1f1f1f]">Password</span>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setFormValues((prev) => ({
                    ...prev,
                    password: value,
                  }));
                }}
                className="h-11 w-full rounded-lg border border-black px-3 pr-10 text-sm text-black outline-none transition focus:border-[#171717]"
              />
             </div>
          </label>

          <button
            type="submit"
            className="h-11 w-full cursor-pointer rounded-xl border bg-black text-sm font-semibold text-white transition hover:border-black hover:bg-[#FBFAF7] hover:text-black focus:bg-[#171717] focus:outline-none"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#4f4f4f] sm:mt-8">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-black hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginFormPanel;
