import { Skeleton } from "@/components/ui";

const FormSkeleton = () => {
  return (
    <section className="border mt-5 p-2">
      <header>
        <Skeleton className="w-full h-10 bg-white" />
      </header>
      <div className="border p-2">
        <Skeleton className="w-full h-96" />
      </div>
      <footer className="flex justify-end border">
        <Skeleton className="w-full h-10" />
      </footer>
    </section>
  );
};

export default FormSkeleton;
