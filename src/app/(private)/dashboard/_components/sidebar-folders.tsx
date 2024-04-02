"use client";

import Link from "next/link";
import { Users, Bolt, FileSliders } from "lucide-react";

import { Button } from "@/components/ui";
import { useFolderStore } from "@/zustand";

const SideBarFolders = () => {
  const { folders } = useFolderStore();
  return (
    <ul>
      {folders.map(({ id, name }) => (
        <details key={id}>
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
                <Link href={`/dashboard/folder/${id}/forms`}>
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
                <Link href={`/dashboard/folder/${id}/members`}>
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
      ))}
    </ul>
  );
};

export default SideBarFolders;
