"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";

import { CommonPopover } from "@/components";
import { FormRender, FormSelect } from "@/components/form";
import { useDimensions, useFormActions } from "@/hooks";
import { FORM_INPUTS } from "@/lib/constants";
import { useFolderStore } from "@/zustand";
import { Button } from "@/components/ui";

interface Props {
  site: "sm" | "complete";
}

interface Select {
  name: string;
  value: string;
}

const TriggerSm = () => {
  return (
    <Button
      className="bg-lightaccent-100 hover:bg-lightaccent-200 transition"
      asChild
    >
      <p>
        <span className="hidden md:block text-white text-sm">
          Crear Encuesta
        </span>
        <Plus className="md:hidden text-white text-sm" />
      </p>
    </Button>
  );
};

const TriggerComplete = () => {
  return (
    <Button
      asChild
      className="
        bg-lightaccent-100 rounded-md hover:bg-lightaccent-100/80 
        transition mx-auto w-[100%] sm:w-[80%] md:w-xs h-32 flex items-center justify-center"
    >
      <p className="text-white text-xl font-semibold">Crear Encuesta</p>
    </Button>
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
