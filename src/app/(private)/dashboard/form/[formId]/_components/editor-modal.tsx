"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { useQuestionTypes } from "@/hooks";
import { useQuestionEditorStore, useQuestionTypesStore } from "@/zustand";

import { EditorMenu, EditorMenuSkeleton } from ".";

const EditorModal = () => {
  const { isPending, fetchQuestionTypes } = useQuestionTypes();

  const {
    isSubtypeSelected,
    isModalOpen,
    clearState: clearEditorState,
    setIsOpenModal,
  } = useQuestionEditorStore();

  const { typeSelected, clearTypeSelected, clearState } =
    useQuestionTypesStore();

  const backButton = () => {
    clearEditorState();
  };

  useEffect(() => {
    if (!isModalOpen) {
      clearTypeSelected();
      return;
    }

    fetchQuestionTypes();

    return () => {
      clearState();
      clearEditorState();
    };
  }, [isModalOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsOpenModal}>
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
        <DialogFooter>
          <div className="flex justify-start items-start w-full">
            {isSubtypeSelected && <Button onClick={backButton}>Atras</Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditorModal;
