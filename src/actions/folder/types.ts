import { z } from "zod";
import { JwtSchema } from "@/actions/schemas";
import { ActionState } from "@/lib";
import { CreateFolderSchema } from "./schema";

export type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  formCount: number;
};

export type FindFoldersInputType = z.infer<typeof JwtSchema>;
export type FindFoldersReturnType = ActionState<
  FindFoldersInputType,
  Array<Folder>
>;

export type CreateFolderInputType = z.infer<typeof CreateFolderSchema>;
export type CreateFolderReturnType = ActionState<CreateFolderInputType, Folder>;
