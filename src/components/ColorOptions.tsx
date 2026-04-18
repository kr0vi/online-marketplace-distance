const swatches = [
  { id: 1, border: "border-[#7a7a7a]", shade: "bg-[#2e3141]" },
  { id: 2, border: "border-[#d4d4d4]", shade: "bg-[#efe8d3]" },
];

export default function ColorOptions() {
  return (
    <div className="mt-10">
      <p className="text-[13px] font-medium uppercase ">
        COLOUR: Dark blue/Floral
      </p>
      <div className="mt-4 flex gap-1">
        {swatches.map((swatch) => (
          <button
            key={swatch.id}
            type="button"
            className="h-8 w-8 border-2 border-black/50"
          >
            <span className={`block h-full w-full ${swatch.shade}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
