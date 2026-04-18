import { MeUser } from "@/components/me/types";

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="border border-black/10 bg-[#fafafa] px-5 py-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[#6b7280]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-[#111111] sm:text-base">
        {value}
      </p>
    </div>
  );
}

function MeProfileSummaryCard({ user }: any) {
  return (
    <article className="border border-black/10 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-light">Account Details</h2>
      <div className="mt-6 space-y-4">
        <InfoRow label="Name" value={user.name} />
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Role" value={user.role} />
      </div>
    </article>
  );
}

export default MeProfileSummaryCard;
