export const PUBLIC_ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/account/register",
  FORGOT_PASSWORD: "/account/forgot-password",
  FORGOT_PASSWORD_CONFIRM: "/account/forgot-password/confirm",
  CHANGE_PASSWORD: "/account/forgot-password/change-password",
  PASSWORD_CHANGED: "/account/forgot-password/password-changed",
  ACCOUNT_CREATED: "/account/register/created",
  REGISTER_CONFIRM: "/account/register/confirm",
};

export const PRIVATE_ROUTES = {
  DASHBOARD_HOME: "/dashboard",
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  DASHBOARD_SETTINGS_PROFILE: "/dashboard/settings/profile",
  DASHBOARD_SETTINGS_PASSWORD: "/dashboard/settings/password",
  PRIVATE_ROUTES: "/private",
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
