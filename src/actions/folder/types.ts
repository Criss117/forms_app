import { z } from "zod";

import { JwtSchema } from "@/actions/schemas";
import { CreateFolderSchema, FindFolderSchema } from "@/actions/folder/schema";
import { ActionState } from "@/lib";
import { FormHeader } from "@/actions/form";

export type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  formCount: number;
};

export type FolderComplete = Folder & {
  forms: Array<FormHeader>;
};

export type FindFoldersInputType = z.infer<typeof JwtSchema>;
export type FindFoldersReturnType = ActionState<
  FindFoldersInputType,
  Array<Folder>
>;

export type CreateFolderInputType = z.infer<typeof CreateFolderSchema>;
export type CreateFolderReturnType = ActionState<CreateFolderInputType, Folder>;

export type FindFolderInputType = z.infer<typeof FindFolderSchema>;
export type FindFolderReturnType = ActionState<
  FindFolderInputType,
  FolderComplete
>;
