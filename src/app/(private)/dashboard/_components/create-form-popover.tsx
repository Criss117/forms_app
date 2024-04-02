import { Plus } from "lucide-react";
import { CommonPopover } from "@/components";

const CreateTrigger = () => {
  return (
    <div className="bg-lightaccent-100 py-2 px-5 rounded-md hover:bg-lightaccent-200 transition">
      <span className="hidden md:block text-white text-sm">Crear</span>
      <Plus className="md:hidden text-white text-sm" />
    </div>
  );
};

const CreateFormPopover = () => {
  return (
    <CommonPopover trigger={<CreateTrigger />} align="start">
      <form action="">
        <label htmlFor="">Nombre</label>
        <input type="text" placeholder="Encuesta 1" />
      </form>
    </CommonPopover>
  );
};

export default CreateFormPopover;
