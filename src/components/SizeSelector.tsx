
export default function SizeSelector({ sizes }: { sizes: string }) {

  let sizeOptions = sizes.split(",")

  return (
    <div className="mt-14">
      <div className="grid grid-cols-6  w-2/3 space-y-1 gap-18">
        {sizeOptions.map((size) => (
          <button
            key={size}
            type="button"
            className="h-16 w-16 border border-black/50 text-[10px]"
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
