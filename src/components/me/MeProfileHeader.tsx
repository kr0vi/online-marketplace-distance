type MeProfileHeaderProps = {
  isLoggedIn: boolean;
};

function MeProfileHeader({ isLoggedIn }: MeProfileHeaderProps) {
  return (
    <header className="mb-10">
      <p className="text-xs uppercase tracking-[0.45em] text-[#6b7280]">
        Account
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-[1.2] tracking-tighter">
        My Profile
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[#6b7280]">
        {isLoggedIn
          ? "Review your account details and keep your profile information up to date."
          : "Sign in to view your account details and update your profile."}
      </p>
    </header>
  );
}

export default MeProfileHeader;
