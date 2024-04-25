"use client";

import { useEffect, useState } from "react";

import { FolderComplete } from "@/actions/folder/types";
import { USER_PERMISSIONS } from "@/lib/constants";
import { FormCard, FormCardSkeleton } from "./form-card";
import { CreateFormPopover } from "../../../_components";

interface Props {
  folder: FolderComplete | undefined;
}

export const FolderBody = ({ folder }: Props) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (!folder) {
      return;
    }

    if (folder.permission === USER_PERMISSIONS.READ_WRITE || folder.owner) {
      setHasPermission(true);
    }
  }, [folder]);

  if (!folder) {
    return null;
  }
  const { forms } = folder;

  return (
    <section className="mt-5">
      <h3 className="text-xl font-semibold mb-5">Encuestas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5">
        {hasPermission && <CreateFormPopover site="complete" />}
        {forms.length === 0 && forms === undefined ? (
          <>
            <FormCardSkeleton />
            <FormCardSkeleton />
          </>
        ) : (
          <p>
            No hay encuestas
            {hasPermission && ", crea una"}
          </p>
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
