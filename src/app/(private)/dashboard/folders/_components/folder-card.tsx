"use client";

import Link from "next/link";
import { formatDate } from "@/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";
import { PRIVATE_ROUTES } from "@/lib/constants";

import type { Folder } from "@/actions/folder/types";

interface Props {
  folder: Folder;
}

export const FolderCard = ({ folder }: Props) => {
  const { createdAt, formCount, id, name } = folder;

  return (
    <Link href={`${PRIVATE_ROUTES.FOLDERS_HOME}/${id}`}>
      <Card
        className="
          mx-auto w-[100%] sm:w-[80%] md:w-xs 
          bg-gradient-to-br to-lightaccent-100 
          from-orange-700 hover:opacity-90 transition h-full
          flex flex-col justify-between"
      >
        <CardHeader>
          <CardTitle className="text-white">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-white">
            Encuestas: <span className="font-normal">{formCount}</span>
          </p>
          <p className="font-semibold text-white">
            Creado:{" "}
            <span className="text-sm text-gray-100 font-normal">
              {formatDate(createdAt)}
            </span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export const FolderCardSkeleton = () => {
  return (
    <Skeleton className="bg-white h-40 mx-auto w-[100%] sm:w-[80%] md:w-xs" />
  );
};
