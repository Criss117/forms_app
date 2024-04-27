"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { useQuestionTypes } from "@/hooks";

import { EditorMenu, EditorMenuSkeleton } from ".";
import { useQuestionTypesStore } from "@/zustand";

const EditorModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, fetchQuestionTypes } = useQuestionTypes();
  const { typeSelected, clearTypeSelected, clearState } =
    useQuestionTypesStore();

  useEffect(() => {
    console.log({ isPending });
  }, [isPending]);

  useEffect(() => {
    if (!isOpen) {
      clearTypeSelected();
      return;
    }

    fetchQuestionTypes();

    return () => {
      clearState();
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button asChild>
          <p>Agregar pregunta</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Agregar nueva pregunta
            <span>{typeSelected && `: ${typeSelected?.name}`}</span>
          </DialogTitle>
        </DialogHeader>
        {isPending ? <EditorMenuSkeleton /> : <EditorMenu />}
      </DialogContent>
    </Dialog>
  );
};

export default EditorModal;
