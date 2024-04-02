"use client";

import { Folder } from "@/actions/folder/types";
import { formatDate } from "@/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";
import Link from "next/link";

interface Props {
  folder: Folder;
}

const FolderCard = ({ folder }: Props) => {
  const { createdAt, formCount, id, name } = folder;

  return (
    <Link href={`/dashboard/folder/${id}`}>
      <Card
        className="
          mx-auto w-[100%] sm:w-[80%] md:w-xs 
          bg-gradient-to-br to-lightaccent-100 
          from-orange-700 hover:opacity-90 transition"
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

export default FolderCard;
