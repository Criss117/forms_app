import { HTMLInputTypeAttribute } from "react";

type Name =
  | "name"
  | "email"
  | "surname"
  | "phone"
  | "password"
  | "password_confirm";

interface FormInput {
  name: Name;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute | undefined;
}

const REGISTER_FORM_INPUTS: FormInput[] = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Cristian",
    type: "text",
  },
  {
    name: "surname",
    label: "Apellido",
    placeholder: "Fernandez",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "t4u3u3@example.com",
    type: "email",
  },
  {
    name: "phone",
    label: "Telefono",
    placeholder: "123456789",
    type: "number",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "********",
    type: "password",
  },
  {
    name: "password_confirm",
    label: "Repite la contraseña",
    placeholder: "********",
    type: "password",
  },
];

const LOGIN_FORM_INPUTS: FormInput[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "t4u3u3@example.com",
    type: "email",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "********",
    type: "password",
  },
];

export const FORM_INPUTS = {
  REGISTER_FORM_INPUTS,
  LOGIN_FORM_INPUTS,
};
