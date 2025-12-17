import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PropertySkeletonCard({ orientation = "horizontal" }) {
  return (
    <Card
      className={cn(
        "w-72 rounded-lg overflow-hidden relative flex shadow-md my-2",
        orientation === "horizontal" && "w-full flex-row mt-0 !mb-4"
      )}
    >
      {/* Image Skeleton */}
      <Skeleton
        className={cn(
          "aspect-video h-60 w-full shrink-0",
          orientation === "horizontal" && "w-80 h-full"
        )}
      />

      <CardContent className="w-full p-3 space-y-3">
        {/* Price + Heart Icon */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-4 w-3/4" />

        {/* Address */}
        <div className="flex gap-2 items-start">
          <Skeleton className="h-4 w-4 shrink-0" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Description (horizontal only) */}
        {orientation === "horizontal" && (
          <div className="py-2 border-b mb-2 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        )}

        {/* Badges */}
        <div className="flex gap-2">
          {orientation === "horizontal" && (
            <Skeleton className="h-6 w-24 rounded-md" />
          )}
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        {/* Vertical "View Details" button */}
        {orientation === "vertical" && (
          <Skeleton className="h-10 w-full rounded-md" />
        )}
      </CardContent>
    </Card>
  );
}
