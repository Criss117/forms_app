"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";

import { User } from "@/actions/user";
import { Button, Skeleton, Spinner } from "@/components/ui";
import { FormRender, FormSelect } from "@/components/form";
import { useMemberActions } from "@/hooks";
import { FORM_INPUTS, USER_PERMISSIONS } from "@/lib/constants";

interface Props {
  member: User;
}

export const AddMembersListSkeleton = () => {
  return (
    <Skeleton className="px-2 border border-slate-200 items-center rounded-sm h-[46px]" />
  );
};

export const AddMembersList = ({ member }: Props) => {
  const { error, form, isPending, onSubmit } = useMemberActions();
  const { folderId } = useParams();
  const { ADD_FOLDER_MEMBERS_INPUTS } = FORM_INPUTS;

  useEffect(() => {
    form.setValue("userId", member.id);
    form.setValue("folderId", folderId as string);
  }, [member]);

  return (
    <div className="px-2 flex justify-between border border-slate-200 items-center rounded-sm">
      <header>
        <h3 className="font-bold">
          {member.name} {member.surname}
        </h3>
        <p className="text-sm">{member.email}</p>
      </header>
      <div className="flex gap-x-2 items-center">
        <FormRender
          error={error}
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          inputs={ADD_FOLDER_MEMBERS_INPUTS}
        >
          <fieldset className="flex justify-center items-center gap-x-2">
            <FormSelect
              name="permissions"
              form={form}
              placeholder="Escritura / Lectura"
              className="w-44"
              selects={[
                {
                  name: "Escritura / Lectura",
                  value: `${USER_PERMISSIONS.READ_WRITE}`,
                },
                { name: "Lectura", value: `${USER_PERMISSIONS.READ}` },
              ]}
            />
            <Button className="h-8" type="submit" disabled={isPending}>
              {isPending ? <Spinner loader="secondary" /> : <Check />}
            </Button>
          </fieldset>
        </FormRender>
      </div>
    </div>
  );
};
