import { z } from "zod";

import { JwtSchema } from "@/actions/schemas";
import {
  addFolderMembersSchema,
  CreateFolderSchema,
  FindFolderSchema,
} from "@/actions/folder/schema";
import { ActionState } from "@/lib";
import { FormHeader } from "@/actions/form";
import { USER_PERMISSIONS } from "@/lib/constants";

export type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  formCount: number;
  owner: boolean;
  permission: USER_PERMISSIONS;
};

export type FindALlFolders = {
  ownerFolders: Array<Folder>;
  sharedFolders: Array<Folder>;
};

type UserFolder = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

export type FolderComplete = Folder & {
  forms: Array<FormHeader>;
  ownerUser?: UserFolder;
  members?: Array<UserFolder>;
};

export type FindFoldersInputType = z.infer<typeof JwtSchema>;
export type FindFoldersReturnType = ActionState<
  FindFoldersInputType,
  FindALlFolders
>;

export type CreateFolderInputType = z.infer<typeof CreateFolderSchema>;
export type CreateFolderReturnType = ActionState<CreateFolderInputType, Folder>;

export type FindFolderInputType = z.infer<typeof FindFolderSchema>;
export type FindFolderReturnType = ActionState<
  FindFolderInputType,
  FolderComplete
>;

export type AddFolderMemberInputType = z.infer<typeof addFolderMembersSchema>;
export type AddFolderMemberReturnType = ActionState<
  AddFolderMemberInputType,
  any
>;
