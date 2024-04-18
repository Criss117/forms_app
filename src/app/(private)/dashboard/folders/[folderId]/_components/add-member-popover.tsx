"use client";
import { UserRoundPlus } from "lucide-react";

import { Input } from "@/components/ui";
import { useMemberActions } from "@/hooks";
import { CommonPopover } from "@/components";
import { FORM_INPUTS } from "@/lib/constants";

const Trigger = () => {
  return (
    <div className="gap-x-2 flex bg-white px-3 py-2 rounded-lg border text-sm font-semibold items-center hover:opacity-80">
      <UserRoundPlus />
      Agregar Miembro
    </div>
  );
};

const AddMemberPopover = () => {
  const { searchPending, findUsersHandler } = useMemberActions();

  const { FIND_USERS_INPUTS } = FORM_INPUTS;

  return (
    <CommonPopover trigger={<Trigger />}>
      {FIND_USERS_INPUTS.map(({ label, name, placeholder, type }, index) => (
        <fieldset className="grid grid-cols-1 gap-2" key={index}>
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 relative"
            htmlFor={name}
          >
            {label}
          </label>
          <Input
            name={name}
            id={name}
            placeholder={placeholder}
            type={type}
            onChange={(e) => findUsersHandler(e.target.value)}
          />
          {searchPending && (
            <p className="absolute top-9 left-48 translate-y-[50%]">cargando</p>
          )}
        </fieldset>
      ))}
    </CommonPopover>
  );
};

export default AddMemberPopover;
