"use client";

import { FolderComplete } from "@/actions/folder/types";
import { FormCard, FormCardSkeleton } from "./form-card";
import { CreateFormPopover } from "../../../_components";

interface Props {
  folder: FolderComplete | undefined;
}

export const FolderBody = ({ folder }: Props) => {
  if (!folder) {
    return null;
  }
  const { forms } = folder;

  return (
    <section className="mt-5">
      <h3 className="text-xl font-semibold mb-5">Encuestas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5">
        <CreateFormPopover site="complete" />
        {forms.length === 0 && forms === undefined && (
          <>
            <FormCardSkeleton />
            <FormCardSkeleton />
          </>
        )}
        {forms.length > 0 &&
          forms.map((form) => <FormCard key={form.id} form={form} />)}
      </div>
    </section>
  );
};

export const FolderBodySkeleton = () => {
  return (
    <section className="mt-5">
      <h3 className="text-xl font-semibold mb-5">Encuestas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10">
        <FormCardSkeleton />
        <FormCardSkeleton />
      </div>
    </section>
  );
};
