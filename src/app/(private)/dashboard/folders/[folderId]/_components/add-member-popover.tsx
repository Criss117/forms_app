"use client";
import { UserRoundPlus } from "lucide-react";

import { Input } from "@/components/ui";
import { useMemberActions } from "@/hooks";
import { CommonPopover } from "@/components";
import { FORM_INPUTS } from "@/lib/constants";

import { AddMembersList, AddMembersListSkeleton } from ".";

const Trigger = () => {
  return (
    <div className="gap-x-2 flex bg-white px-3 py-2 rounded-lg border text-sm font-semibold items-center hover:opacity-80">
      <UserRoundPlus />
      Agregar Miembro
    </div>
  );
};

const AddMemberPopover = () => {
  const { members, isSearching, findUsersHandler, clearState } =
    useMemberActions();

  const { FIND_USERS_INPUTS } = FORM_INPUTS;

  return (
    <CommonPopover
      trigger={<Trigger />}
      className="w-[500px]"
      onClose={clearState}
    >
      <form className="mt-5">
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
            {isSearching && (
              <p className="absolute top-14 right-6 translate-y-[50%]">
                cargando
              </p>
            )}
          </fieldset>
        ))}
      </form>
      <ul className="mt-5 gap-y-4 flex flex-col">
        {members.map((member) => (
          <li key={member.id}>
            <AddMembersList member={member} />
          </li>
        ))}
        {isSearching && <AddMembersListSkeleton />}
      </ul>
    </CommonPopover>
  );
};

export default AddMemberPopover;
