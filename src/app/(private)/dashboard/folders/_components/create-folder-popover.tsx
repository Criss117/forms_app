"use client";
import { useSession } from "next-auth/react";

import { CommonPopover } from "@/components";
import useFolderActions from "@/hooks/use-folder-actions";
import { FormRender } from "@/components/form";
import { FORM_INPUTS } from "@/lib/constants";

const FolderTrigger = () => {
  return (
    <div
      className="
        mx-auto w-[100%] sm:w-[80%] 
        md:w-xs bg-lightaccent-100/10 h-36
        hover:bg-lightaccent-100/40 rounded-sm 
        shadow-sm flex justify-center items-center transition"
    >
      <span className="text-slate-900">Crear carpeta nueva</span>
    </div>
  );
};

const CreateFolderPopover = () => {
  const { error, form, isPending, createFolderSubmit } = useFolderActions();
  const { CREATE_FOLDER_INPUTS } = FORM_INPUTS;

  return (
    <CommonPopover trigger={<FolderTrigger />}>
      <FormRender
        error={error}
        isPending={isPending}
        form={form}
        inputs={CREATE_FOLDER_INPUTS}
        onSubmit={createFolderSubmit}
        submitLabel="Crear carpeta"
      />
    </CommonPopover>
  );
};

export default CreateFolderPopover;
