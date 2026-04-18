"use client";

import { useEffect, useState } from "react";
import { MeUser } from "@/components/me/types";

type MeProfileUpdateFormProps = {
  initialUser: MeUser;
  onUpdate: (payload: { name?: string; email?: string }) => Promise<void>;
  isSaving: boolean;
};

function MeProfileUpdateForm({
  initialUser,
  onUpdate,
  isSaving,
}: MeProfileUpdateFormProps) {
  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialUser.name);
    setEmail(initialUser.email);
  }, [initialUser.name, initialUser.email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 3) {
      setFormError("Name must be at least 3 characters.");
      return;
    }

    if (!trimmedEmail) {
      setFormError("Email is required.");
      return;
    }

    const payload: { name?: string; email?: string } = {};

    if (trimmedName !== initialUser.name) {
      payload.name = trimmedName;
    }

    if (trimmedEmail !== initialUser.email) {
      payload.email = trimmedEmail;
    }

    await onUpdate(payload);
  };

  return (
    <article className="border border-black/10 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-light">Update Profile</h2>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#111111]">Full Name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            className="h-11 w-full border border-black/10 bg-[#fbfaf7] px-4 text-sm text-[#111111] outline-none transition-all placeholder:text-[#6b7280] focus:border-[#111111] focus:bg-white focus:ring-1 focus:ring-[#111111]"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#111111]">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            className="h-11 w-full border border-black/10 bg-[#fbfaf7] px-4 text-sm text-[#111111] outline-none transition-all placeholder:text-[#6b7280] focus:border-[#111111] focus:bg-white focus:ring-1 focus:ring-[#111111]"
          />
        </label>

        {formError && (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="mt-2 flex h-11 w-full items-center justify-center border border-[#111111] bg-[#111111] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </article>
  );
}

export default MeProfileUpdateForm;
