"use client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { CommonPopover } from "@/components";
import { FormRender, FormSelect } from "@/components/form";
import { useDimensions, useFormActions } from "@/hooks";
import { FORM_INPUTS } from "@/lib/constants";
import { useFolderStore } from "@/zustand";

interface Props {
  site: "sm" | "complete";
}

interface Select {
  name: string;
  value: string;
}

const TriggerSm = () => {
  return (
    <div className="bg-lightaccent-100 py-2 px-5 rounded-md hover:bg-lightaccent-200 transition">
      <span className="hidden md:block text-white text-sm">Crear</span>
      <Plus className="md:hidden text-white text-sm" />
    </div>
  );
};

const TriggerComplete = () => {
  return (
    <div
      className="
        bg-lightaccent-100 rounded-md hover:bg-lightaccent-100/80 
        transition mx-auto w-[100%] sm:w-[80%] md:w-xs h-32 flex items-center justify-center"
    >
      <p className="text-white text-xl font-semibold">Crear Encuesta</p>
    </div>
  );
};

const CreateFormPopover = ({ site }: Props) => {
  const { folderId } = useParams();
  const { width } = useDimensions();
  const { folders } = useFolderStore();
  const { form, error, isPending, createFormSubmit } = useFormActions();

  const [disabled, setDisabled] = useState(false);
  const [selects, setSelects] = useState<Select[]>([]);

  const { CREATE_FORM_INPUTS } = FORM_INPUTS;

  useEffect(() => {
    if (
      folderId !== undefined &&
      typeof folderId === "string" &&
      site === "complete"
    ) {
      form.setValue("folderId", folderId);
      setDisabled(true);
      return;
    }

    const newSelects = folders.map((folder) => {
      return {
        name: folder.name,
        value: folder.id,
      };
    });

    setSelects(newSelects);
  }, [folders]);

  return (
    <CommonPopover
      trigger={site === "sm" ? <TriggerSm /> : <TriggerComplete />}
      align={site === "sm" && width > 1024 ? "start" : "center"}
      side={width < 1024 || site === "sm" ? "bottom" : "right"}
      className="w-96"
    >
      <FormRender
        error={error}
        isPending={isPending}
        form={form}
        inputs={CREATE_FORM_INPUTS}
        onSubmit={createFormSubmit}
        submitLabel="Crear encuesta"
      >
        <FormSelect
          name="folderId"
          form={form}
          label="Carpeta"
          placeholder="Selecciona una carpeta"
          selects={selects}
          disabled={disabled}
        />
      </FormRender>
    </CommonPopover>
  );
};

export default CreateFormPopover;
