"use client";
import { Skeleton } from "@/components/ui";

const EditorMenuSkeleton = () => {
  return (
    <>
      <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
      <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
      <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
      <Skeleton className="w-[339px] h-20 animate-pulse rounded-md bg-muted" />
    </>
  );
  // return <p>cargando ...</p>;
};

export default EditorMenuSkeleton;
