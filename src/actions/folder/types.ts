import { z } from "zod";
import { JwtSchema } from "@/actions/schemas";
import { ActionState } from "@/lib";

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
