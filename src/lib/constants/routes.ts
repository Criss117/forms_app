export const PUBLIC_ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/account/register",
  FORGOT_PASSWORD: "/account/recover",
  FORGOT_PASSWORD_CONFIRM: "/account/recover/confirm",
  CHANGE_PASSWORD: "/account/recover/change-password",
  PASSWORD_CHANGED: "/account/recover/password-changed",
  ACCOUNT_CREATED: "/account/register/created",
  REGISTER_CONFIRM: "/account/register/confirm",
};

export const PRIVATE_ROUTES = {
  DASHBOARD_HOME: "/dashboard",
  FOLDERS_HOME: "/dashboard/folders",
};

export const NAV_PUBLIC_ROUTES = [
  {
    label: "Inicia Sesión",
    href: PUBLIC_ROUTES.LOGIN,
  },
  {
    label: "Regístrate",
    href: PUBLIC_ROUTES.REGISTER,
  },
];
