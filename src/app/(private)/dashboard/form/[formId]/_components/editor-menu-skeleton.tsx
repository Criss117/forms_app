"use client";
import { Skeleton } from "@/components/ui";

const EditorMenuSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-x-10">
      <section className="flex gap-2 flex-col">
        <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
        <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
        <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
        <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
      </section>
      <section className="flex gap-2 flex-col">
        <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
        <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
        <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
        <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
      </section>
    </div>
  );
};

export default EditorMenuSkeleton;
