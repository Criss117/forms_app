import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder } from "lucide-react";

import { Button } from "@/components/ui";
import { PRIVATE_ROUTES } from "@/lib/constants";
import { cn } from "@/lib";

const SideBarHeader = () => {
  const pathName = usePathname();
  return (
    <ul className="mt-5">
      <li>Formulario</li>
      <li>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-start hover:bg-lightaccent-100/30",
            pathName === PRIVATE_ROUTES.FOLDERS_HOME && "bg-lightaccent-100/30"
          )}
          asChild
        >
          <Link href={PRIVATE_ROUTES.FOLDERS_HOME}>
            <Folder className="mr-2" />
            Carpetas
          </Link>
        </Button>
      </li>
      <li>Inicio</li>
    </ul>
  );
};

export default SideBarHeader;
