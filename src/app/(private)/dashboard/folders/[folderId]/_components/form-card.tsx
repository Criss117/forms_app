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
import { FormHeader } from "@/actions/form";

interface Props {
  folderId: string;
  form: FormHeader;
}

export const FormCard = ({ folderId, form }: Props) => {
  const { createdAt, id, name } = form;

  const { FOLDERS_HOME, FORM_HOME } = PRIVATE_ROUTES;

  return (
    <Link href={`${FOLDERS_HOME}/${folderId}/${FORM_HOME}/${id}`}>
      <Card
        className="
          mx-auto w-[100%] sm:w-[80%] md:w-xs h-32
          bg-gradient-to-br to-indigo-500
          from-indigo-700 hover:opacity-90 transition"
      >
        <CardHeader>
          <CardTitle className="text-white">{name}</CardTitle>
        </CardHeader>
        <CardContent>
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

export const FormCardSkeleton = () => {
  return (
    <Skeleton className="bg-white h-32 mx-auto w-[100%] sm:w-[80%] md:w-xs" />
  );
};
