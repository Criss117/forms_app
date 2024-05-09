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
  hidden?: boolean;
}

export interface MultipleChoiceInput {
  id: number;
  name: "answ1" | "answ2" | "answ3" | "answ4" | "answ5";
  placeholder: "Respuesta";
  type: "text";
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

const VERIFY_EMAIL_INPUTS: FormInput[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "t4u3u3@example.com",
    type: "email",
  },
];

const CHANGE_PASS_INPUTS = [
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
  {
    name: "token",
    label: "token",
    placeholder: "token",
    type: "text",
    hidden: true,
  },
];

const CREATE_FORM_INPUTS = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Encuesta 1",
    type: "text",
  },
  {
    name: "description",
    label: "Descripción",
    placeholder: "Descripción de la encuesta",
    type: "text",
  },
];

const CREATE_FOLDER_INPUTS = [
  {
    name: "name",
    label: "Nombre de la carpeta",
    placeholder: "Carpeta 1",
    type: "text",
  },
];

const FIND_USERS_INPUTS = [
  {
    name: "query",
    label: "Nombre o Email del usuario",
    placeholder: "Cristian",
    type: "text",
  },
];

const ADD_FOLDER_MEMBERS_INPUTS = [
  {
    name: "userId",
    label: "Usuario",
    placeholder: "Cristian",
    type: "number",
    hidden: true,
  },
  {
    name: "folderId",
    label: "Carpeta",
    placeholder: "Carpeta 1",
    type: "text",
    hidden: true,
  },
];

const MULTIPLE_CHOICE_INPUTS: MultipleChoiceInput[] = [
  {
    id: -1,
    name: "answ1",
    placeholder: "Respuesta",
    type: "text",
  },
  {
    id: -2,
    name: "answ2",
    placeholder: "Respuesta",
    type: "text",
  },
];

export const FORM_INPUTS = {
  REGISTER_FORM_INPUTS,
  LOGIN_FORM_INPUTS,
  VERIFY_EMAIL_INPUTS,
  CHANGE_PASS_INPUTS,
  CREATE_FORM_INPUTS,
  CREATE_FOLDER_INPUTS,
  FIND_USERS_INPUTS,
  ADD_FOLDER_MEMBERS_INPUTS,
  MULTIPLE_CHOICE_INPUTS,
};
