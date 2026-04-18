"use client";

import { useState } from "react";
import { MeUser } from "@/components/me/types";
import api from "@/components/lib/api";

type MePersonalInfoProps = {
  user: MeUser;
  onUpdate: () => void;
};

function MePersonalInfo({ user, onUpdate }: MePersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }

    if (!email.trim()) {
      setError("Email cannot be empty");
      return;
    }

    const payload: { name?: string; email?: string } = {};
    if (name !== user.name) payload.name = name.trim();
    if (email !== user.email) payload.email = email.trim();

    if (Object.keys(payload).length === 0) {
      setSuccess("No changes made");
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      const response = await api.post("/auth/me", payload);
      if (response.data.success) {
        setSuccess("Profile updated successfully");
        setIsEditing(false);
        onUpdate();
      } else {
        setError(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="space-y-6">
      <div className="border border-black/10 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-black">
            Personal Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-black/8 px-4 py-2 text-sm font-medium text-black hover:bg-black/12 transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-black/60 font-medium block mb-2">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-black/15 bg-white px-4 py-2.5 text-sm text-black outline-none transition-all focus:border-black/40 focus:ring-1 focus:ring-black/20"
              />
            ) : (
              <p className="text-base font-medium text-black">{user.name}</p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-black/60 font-medium block mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black/15 bg-white px-4 py-2.5 text-sm text-black outline-none transition-all focus:border-black/40 focus:ring-1 focus:ring-black/20"
              />
            ) : (
              <p className="text-base font-medium text-black">{user.email}</p>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-black text-white px-4 py-2.5 text-sm font-semibold transition-all hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 border border-black/15 bg-white text-black px-4 py-2.5 text-sm font-semibold transition-all hover:bg-black/4"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MePersonalInfo;
