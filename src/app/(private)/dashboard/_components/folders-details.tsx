import Link from "next/link";
import { Bolt, FileSliders, Users } from "lucide-react";

import { Button, Skeleton } from "@/components/ui";
import { PRIVATE_ROUTES } from "@/lib/constants";

interface Props {
  id: string;
  name: string;
}

const FoldersDetails = ({ id, name }: Props) => {
  return (
    <details>
      <summary className="p-2 hover:bg-lightbg-200 cursor-pointer rounded-sm transition text-xl">
        {name}
      </summary>
      <ul className="ml-8 flex flex-col gap-y-4">
        <li>
          <Button
            asChild
            variant={"ghost"}
            className="w-full hover:bg-lightprimary-300 justify-start"
          >
            <Link href={`${PRIVATE_ROUTES.FOLDERS_HOME}/${id}`}>
              <FileSliders className="mr-2" />
              Encuestas
            </Link>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant={"ghost"}
            className="w-full hover:bg-lightprimary-300 justify-start"
          >
            <Link href={`/dashboard/folders/${id}/members`}>
              <Users className="mr-2" />
              Miembros
            </Link>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant={"ghost"}
            className="w-full hover:bg-lightprimary-300 justify-start"
          >
            <Link href={`/dashboard/folder/${id}/settings`}>
              <Bolt className="mr-2" />
              Configuración
            </Link>
          </Button>
        </li>
      </ul>
    </details>
  );
};

export const FoldersDetailsSkeleton = () => {
  return (
    <>
      <Skeleton className="bg-white h-10 w-[100%] md:w-xs mb-2" />
      <Skeleton className="bg-white h-10 w-[100%] md:w-xs" />
    </>
  );
};

export default FoldersDetails;
