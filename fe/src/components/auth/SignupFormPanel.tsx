"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignupFormPanel() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      return;
    }
    // await signup(formValues.name, formValues.email, formValues.password);

    router.push("/login");
  };

  return (
    <section className="h-full overflow-y-auto rounded-4xl bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center p-3 sm:p-4">
        <header className="mb-6 text-center sm:mb-8">
          <div className="mb-7 flex items-center justify-center gap-2 text-xl font-medium text-black sm:mb-9">
            <span className="inline-flex h-4 w-4 rounded-full border border-black" />
            <span>Distant</span>
          </div>

          <h1 className=" font-medium text-4xl leading-tight text-black sm:text-5xl">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-black sm:text-[15px]">
            Create your account to track orders and save your favorite products.
          </p>
        </header>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm text-[#1f1f1f]">Full Name</span>
            <input
              type="text"
              placeholder="John Doe"
              value={formValues.name}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setFormValues((prev) => ({
                  ...prev,
                  name: value,
                }));
              }}
              className="h-11 w-full rounded-lg border border-black  px-3 text-sm text-black outline-none transition focus:border-[#171717]"
            />
          </label>

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
            <input
              type="password"
              placeholder="At least 8 characters"
              value={formValues.password}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setFormValues((prev) => ({
                  ...prev,
                  password: value,
                }));
              }}
              className="h-11 w-full rounded-lg border border-black px-3 text-sm text-black outline-none transition focus:border-[#171717]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[#1f1f1f]">Confirm Password</span>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={formValues.confirmPassword}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setFormValues((prev) => ({
                  ...prev,
                  confirmPassword: value,
                }));
              }}
              className="h-11 w-full rounded-lg border border-black px-3 text-sm text-black outline-none transition focus:border-[#171717]"
            />
          </label>

          <button
            type="submit"
            className="h-11 w-full cursor-pointer rounded-xl border bg-black text-sm font-semibold text-white transition hover:border-black hover:bg-[#FBFAF7] hover:text-black focus:bg-[#171717] focus:outline-none"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#4f4f4f] sm:mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-black hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignupFormPanel;
