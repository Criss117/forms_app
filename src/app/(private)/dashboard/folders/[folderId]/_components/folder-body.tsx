import { FolderComplete } from "@/actions/folder/types";
import FormCard, { FormCardSkeleton } from "./form-card";

interface Props {
  folder: FolderComplete | undefined;
}

const FolderBody = async ({ folder }: Props) => {
  if (!folder) {
    return null;
  }
  const { forms } = folder;

  return (
    <section className="mt-5">
      <h3 className="text-xl font-semibold mb-5">Encuestas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10">
        <FormCardSkeleton />
        {forms.length === 0 && (
          <>
            <FormCardSkeleton />
            <FormCardSkeleton />
          </>
        )}
        {forms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    </section>
  );
};

export default FolderBody;
