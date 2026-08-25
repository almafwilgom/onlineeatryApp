export const SkeletonCard = () => (
  <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm animate-pulse space-y-3">
    <div className="w-full h-44 bg-stone-200 rounded-2xl" />
    <div className="h-4 bg-stone-200 rounded w-3/4" />
    <div className="h-3 bg-stone-200 rounded w-1/2" />
    <div className="flex justify-between items-center pt-2">
      <div className="h-5 bg-stone-200 rounded w-1/4" />
      <div className="h-9 w-9 bg-stone-200 rounded-full" />
    </div>
  </div>
);

export const SkeletonMetric = () => (
  <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm animate-pulse space-y-3">
    <div className="h-3 bg-stone-200 rounded w-1/3" />
    <div className="h-8 bg-stone-200 rounded w-1/2" />
    <div className="h-3 bg-stone-200 rounded w-2/3" />
  </div>
);

export const SkeletonTable = () => (
  <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm animate-pulse space-y-4">
    <div className="h-5 bg-stone-200 rounded w-1/4" />
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 bg-stone-100 rounded-xl w-full" />
      ))}
    </div>
  </div>
);

export default SkeletonCard;
