import { z } from "zod";

import { JwtSchema } from "@/actions/schemas";
import {
  addFolderMembersSchema,
  CreateFolderSchema,
  deleteFolderMembersSchema,
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

export type Folders = {
  ownerFolders: Array<Folder>;
  sharedFolders: Array<Folder>;
};

type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

export type FolderComplete = Folder & {
  forms: Array<FormHeader>;
  ownerUser?: User;
  members?: Array<User>;
};

export type FindFoldersInputType = z.infer<typeof JwtSchema>;
export type FindFoldersReturnType = ActionState<FindFoldersInputType, Folders>;

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

export type DeleteFolderMemberInputType = z.infer<
  typeof deleteFolderMembersSchema
>;
export type DeleteFolderMemberReturnType = ActionState<
  DeleteFolderMemberInputType,
  any
>;
