import { Skeleton } from "@/components/ui/skeleton";

export default function PropertySkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 p-4 lg:p-8">
      {/* Top section: Title */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-40 lg:h-52 w-full rounded-xl" />
        <Skeleton className="h-40 lg:h-52 w-full rounded-xl" />
        <Skeleton className="h-40 lg:h-52 w-full rounded-xl" />
        <Skeleton className="h-40 lg:h-52 w-full rounded-xl" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="w-full lg:w-1/3 space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-12 w-full rounded-xl" />

          {/* Contact card */}
          <div className="border rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>

        {/* Right column */}
        <div className="w-full lg:w-2/3 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />

          {/* Equipments list */}
          <div className="space-y-2 mt-4">
            <Skeleton className="h-5 w-1/4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>

          {/* Map */}
          <Skeleton className="h-56 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
