"use client";

import { useEffect, useState } from "react";

import { USER_PERMISSIONS } from "@/lib/constants";
import { useFolderStore } from "@/zustand";

import { FormCard, FormCardSkeleton } from ".";
import { CreateFormPopover } from "../../../_components";
import { PropsWithIsPending } from "@/lib/models";

export const FolderBody = ({ isPending }: PropsWithIsPending) => {
  const [hasPermission, setHasPermission] = useState(false);
  const { currentFolder } = useFolderStore();

  useEffect(() => {
    if (!currentFolder) {
      return;
    }

    if (
      currentFolder.permission === USER_PERMISSIONS.READ_WRITE ||
      currentFolder.owner
    ) {
      setHasPermission(true);
    }
  }, [currentFolder]);

  if (isPending || !currentFolder) {
    return <FolderBodySkeleton />;
  }

  return (
    <section className="mt-5">
      <h3 className="text-xl font-semibold mb-5">Encuestas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5">
        {hasPermission && <CreateFormPopover site="complete" />}
        {currentFolder?.forms.length === 0 &&
          currentFolder?.forms === undefined && (
            <>
              <FormCardSkeleton />
              <FormCardSkeleton />
            </>
          )}
        {currentFolder &&
          currentFolder?.forms.length > 0 &&
          currentFolder?.forms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
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
