import { CardWrapper } from "@/components";
import { RegisterForm } from "./_components";
import { PUBLIC_ROUTES } from "@/lib/constants";

const footerButtons = [
  {
    label: "Ya tienes una cuenta? Inicia sesión",
    href: PUBLIC_ROUTES.LOGIN,
  },
  {
    label: "Olvidaste tu contraseña?",
    href: PUBLIC_ROUTES.FORGOT_PASSWORD,
  },
];

const RegisterPage = () => {
  return (
    <CardWrapper
      headerLabel="Crea una cuenta en Forms-App"
      footerButtons={footerButtons}
    >
      <RegisterForm />
    </CardWrapper>
  );
};

export default RegisterPage;
