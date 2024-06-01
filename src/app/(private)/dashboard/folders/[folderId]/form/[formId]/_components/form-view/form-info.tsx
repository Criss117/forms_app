import { Skeleton } from "@/components/ui";

import { Questions } from ".";
import { EditorModal } from "../editor";
import { USER_PERMISSIONS } from "@/lib/constants";
import { useFormStore } from "@/zustand";

export const FormInfo = () => {
  const { form } = useFormStore();

  return (
    <section className="border mt-5 px-2 pb-2 space-y-2">
      <header className="pt-2 flex justify-between">
        <h2 className="text-2xl font-bold">{form?.name}</h2>
        <p className="tetx-sm text-gray-400">{form?.description}</p>
      </header>
      <section className="flex gap-2 flex-col">
        <Questions
          questions={form?.questions || []}
          owner={form?.owner || false}
          permission={form?.permission || USER_PERMISSIONS.READ}
        />
      </section>
      {!form?.owner &&
      form?.permission?.toString() === USER_PERMISSIONS.READ ? (
        <p className="text-sm text-gray-400">
          No tienes permisos para editar esta encuesta
        </p>
      ) : (
        <footer className="flex justify-end border">
          <EditorModal />
        </footer>
      )}
    </section>
  );
};

export const FormSkeleton = () => {
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
