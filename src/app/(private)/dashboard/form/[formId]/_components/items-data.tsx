"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";

import { FormControl, FormItem, Input } from "@/components/ui";
import { useQuestionEditorStore } from "@/zustand";

interface Props {
  form: any;
}

const ItemsData = ({ form }: Props) => {
  const { formId } = useParams();
  const { subtypeSelected } = useQuestionEditorStore();

  useEffect(() => {
    if (subtypeSelected && typeof formId === "string") {
      form.setValue("subtypeId", subtypeSelected.id);
      form.setValue("formId", formId);
    }
  }, [subtypeSelected]);

  return (
    <>
      <FormItem>
        <FormControl>
          <Input
            className="hidden"
            placeholder="Respuesta correcta"
            type="text"
            disabled
            {...form.control.register("subtypeId", {
              required: true,
            })}
          />
        </FormControl>
      </FormItem>
      <FormItem>
        <FormControl>
          <Input
            className="hidden"
            placeholder="Respuesta correcta"
            type="text"
            disabled
            {...form.control.register("formId", {
              required: true,
            })}
          />
        </FormControl>
      </FormItem>
      <FormItem>
        <FormControl>
          <Input
            className="hidden"
            placeholder="Respuesta correcta"
            type="checkbox"
            {...form.control.register("required", {
              required: true,
            })}
            disabled
          />
        </FormControl>
      </FormItem>
    </>
  );
};

export default ItemsData;
