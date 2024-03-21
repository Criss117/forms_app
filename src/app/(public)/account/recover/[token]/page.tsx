import { CardWrapper } from "@/components";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { ChangePassForm } from "./_components";

interface Props {
  params: {
    token: string;
  };
}

const footerButtons = [
  {
    label: "Ya tienes una cuenta? Inicia sesión",
    href: PUBLIC_ROUTES.LOGIN,
  },
  {
    label: "No tiene una cuenta? Registrate",
    href: PUBLIC_ROUTES.REGISTER,
  },
];

const ChangePassPage = ({ params }: Props) => {
  const { token } = params;

  return (
    <CardWrapper
      headerLabel="Cambia tu contraseña"
      footerButtons={footerButtons}
    >
      <ChangePassForm token={token} />
    </CardWrapper>
  );
};

export default ChangePassPage;
