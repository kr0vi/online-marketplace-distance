function MeProfileSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border border-black/10 bg-white p-6 sm:p-8">
        <div className="h-6 w-32 animate-pulse bg-black/10" />
        <div className="mt-6 space-y-4">
          <div className="h-16 animate-pulse bg-black/5" />
          <div className="h-16 animate-pulse bg-black/5" />
          <div className="h-16 animate-pulse bg-black/5" />
        </div>
      </div>
      <div className="border border-black/10 bg-white p-6 sm:p-8">
        <div className="h-6 w-32 animate-pulse bg-black/10" />
        <div className="mt-6 space-y-4">
          <div className="h-11 animate-pulse bg-black/5" />
          <div className="h-11 animate-pulse bg-black/5" />
          <div className="h-11 animate-pulse bg-black/5" />
        </div>
      </div>
    </div>
  );
}

export default MeProfileSkeleton;
