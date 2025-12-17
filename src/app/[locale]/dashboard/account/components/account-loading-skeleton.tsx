import { Skeleton } from "@/components/ui/skeleton";

export default function AccountLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="py-4 border-b">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-72 mt-2" />
      </div>

      {/* Profile Picture */}
      <div className="flex border-b pb-4 gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-56" />
        </div>
        <div className="flex-4 flex items-center justify-center">
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
      </div>

      {/* Personal Info */}
      <div className="flex border-b pb-4 gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-60" />
        </div>
        <div className="flex-4 flex items-start">
          <div className="flex-col space-y-4 w-full max-w-[33%]">
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="flex border-b pb-4 gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-60" />
        </div>
        <div className="flex-4 flex items-start">
          <div className="w-[33%] space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex border-b pb-4 gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex-4 flex items-start">
          <div className="w-[33%] space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex pb-4 gap-4">
        <div className="flex flex-col gap-2 flex-1"></div>
        <div className="flex-4 flex items-start justify-end w-[33%]">
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
