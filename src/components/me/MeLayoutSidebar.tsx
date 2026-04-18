"use client";

type MeLayoutSidebarProps = {
  activeSection: "profile" | "orders";
  onSectionChange: (section: "profile" | "orders") => void;
};

function MeLayoutSidebar({
  activeSection,
  onSectionChange,
}: MeLayoutSidebarProps) {
  const sections: Array<{
    id: "profile" | "orders";
    label: string;
  }> = [
    { id: "profile", label: "Personal Information" },
    { id: "orders", label: "My Orders" },
  ];

  return (
    <aside className="sticky top-24 h-max border border-black/10 bg-white p-4">
      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
              activeSection === section.id
                ? "bg-black/8 text-black border-l-2 border-black/40"
                : "text-black/70 hover:bg-black/4"
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default MeLayoutSidebar;
