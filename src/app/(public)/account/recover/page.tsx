import { CardWrapper } from "@/components";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { VerifyEmailForm } from "./_components";

const footerButtons = [
  {
    label: "Ya tienes una cuenta?",
    href: PUBLIC_ROUTES.LOGIN,
  },
  {
    label: "No tienes una cuenta?",
    href: PUBLIC_ROUTES.REGISTER,
  },
];

const ForgotPasswordPage = () => {
  return (
    <CardWrapper
      headerLabel="Ingresa tu email"
      footerButtons={footerButtons}
      cardClass="xl:w-[30%]"
    >
      <VerifyEmailForm />
    </CardWrapper>
  );
};

export default ForgotPasswordPage;
