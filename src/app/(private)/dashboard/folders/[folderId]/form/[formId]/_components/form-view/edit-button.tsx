import { CommonPopover } from "@/components";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { USER_PERMISSIONS } from "@/lib/constants";
import { Settings2 } from "lucide-react";

interface Props {
  owner: boolean;
  permission: USER_PERMISSIONS;
  onClick: () => void;
}

const EditButton = ({ owner, permission, onClick }: Props) => {
  return (
    <>
      {owner && permission?.toString() === USER_PERMISSIONS.READ_WRITE ? (
        <div className="absolute right-[10px] top-[10px]">
          <CommonPopover
            trigger={
              <Button
                variant="ghost"
                className="rounded-full bg-lightprimary-200 hover:bg-lightprimary-200/80 transition-colors"
                asChild
              >
                <p>
                  <Settings2 className="text-white w-full h-full" />
                </p>
              </Button>
            }
          >
            <div className="flex flex-col gap-2 mt-10">
              <Button onClick={onClick}>Editar</Button>
              <Button variant="destructive">Eliminar</Button>
            </div>
          </CommonPopover>
        </div>
      ) : (
        <div className="absolute right-[10px] top-[10px]">
          <Tooltip>
            <TooltipTrigger className="cursor-default">
              <Button
                variant="ghost"
                className="rounded-full bg-lightprimary-200 hover:bg-lightprimary-200/80 transition-colors opacity-20"
                asChild
              >
                <p>
                  <Settings2 className="text-white w-full h-full" />
                </p>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">
                No tienes permisos para editar esta encuesta
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default EditButton;
