//ts-ignore


export default function ProductMediaScroller({images}:{images: string[]}) {
  console.log("Received images in ProductMediaScroller:", images[0]);
  return (
    <aside className="relative h-[55vh] overflow-auto border-white lg:h-screen lg:border-r">
      {/* TODO: Remove temporary media-pane debug background color (bg-cyan-100). */}
      <div className="">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative flex h-[52vh] w-full items-end justify-end lg:h-[92vh]`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </aside>
  );  
}
