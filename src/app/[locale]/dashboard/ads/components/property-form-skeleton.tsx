"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import FormRow from "@/components/form-row";

export default function SkeletonPropertyForm() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Title */}
      <FormRow
        label={<Skeleton className="h-4 w-24" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <Skeleton className="h-9 w-full rounded-md" />
      </FormRow>

      {/* Description */}
      <FormRow
        label={<Skeleton className="h-4 w-24" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <Skeleton className="h-24 w-full rounded-md" />
      </FormRow>

      {/* Property Type */}
      <FormRow
        label={<Skeleton className="h-4 w-28" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <Skeleton className="h-9 w-full rounded-md" />
      </FormRow>

      {/* Ad Type */}
      <FormRow
        label={<Skeleton className="h-4 w-20" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </FormRow>

      {/* Price */}
      <FormRow
        label={<Skeleton className="h-4 w-16" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <div className="flex gap-4">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </FormRow>

      {/* Condition */}
      <FormRow
        label={<Skeleton className="h-4 w-24" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <Skeleton className="h-9 w-full rounded-md" />
      </FormRow>

      {/* Numeric fields */}
      {["num_rooms", "bethrooms", "area_sq_meters", "schools", "mosques"].map(
        (field, i) => (
          <FormRow
            key={field}
            label={<Skeleton className="h-4 w-24" />}
            description={<Skeleton className="h-3 w-64" />}
          >
            <Skeleton className="h-9 w-full rounded-md" />
          </FormRow>
        )
      )}

      {/* Checkboxes */}
      {["furnished", "ownership_book"].map((field) => (
        <FormRow key={field}>
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5 rounded-sm" />
          </div>
        </FormRow>
      ))}

      {/* Tags */}
      <FormRow
        label={<Skeleton className="h-4 w-28" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <Skeleton className="h-10 w-full rounded-md" />
      </FormRow>

      {/* Location */}
      <FormRow
        label={<Skeleton className="h-4 w-20" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 w-full rounded-md" /> {/* Autocomplete */}
          <Skeleton className="h-9 w-full rounded-md" /> {/* Address */}
          <div className="flex gap-4">
            <Skeleton className="h-9 w-full rounded-md" /> {/* City */}
            <Skeleton className="h-9 w-full rounded-md" /> {/* Postal Code */}
          </div>
          <Skeleton className="h-40 w-full rounded-md" /> {/* Map */}
        </div>
      </FormRow>

      {/* Property Images */}
      <FormRow
        label={<Skeleton className="h-4 w-28" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <Skeleton className="h-24 w-full rounded-md" />
      </FormRow>

      {/* Virtual Visit */}
      <FormRow
        label={<Skeleton className="h-4 w-24" />}
        description={<Skeleton className="h-3 w-64" />}
      >
        <Skeleton className="h-14 w-full rounded-md" />
      </FormRow>

      {/* Submit button */}
      <FormRow>
        <Button size="sm" variant="default" disabled className="opacity-70">
          <Skeleton className="h-4 w-16 rounded" />
        </Button>
      </FormRow>
    </div>
  );
}
