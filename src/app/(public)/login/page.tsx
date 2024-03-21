"use client";
import { CardWrapper } from "@/components";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { LoginForm } from "./_components";

const footerButtons = [
  {
    label: "No tiene una cuenta?",
    href: PUBLIC_ROUTES.REGISTER,
  },
  {
    label: "Olvidaste tu contraseña?",
    href: PUBLIC_ROUTES.FORGOT_PASSWORD,
  },
];

const LoginPage = () => {
  return (
    <CardWrapper
      headerLabel="Inicia sesión en Forms-App"
      footerButtons={footerButtons}
      cardClass="xl:w-[30%]"
    >
      <LoginForm />
    </CardWrapper>
  );
};

export default LoginPage;
