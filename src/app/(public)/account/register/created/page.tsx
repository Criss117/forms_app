import { CardWrapper } from "@/components";
import { PUBLIC_ROUTES } from "@/lib/constants";

const footerButtons = [
  {
    label: "Volver al login",
    href: PUBLIC_ROUTES.LOGIN,
  },
];

const AccountCreatedPage = () => {
  return (
    <CardWrapper
      headerLabel="Cuenta creada correctamente"
      footerButtons={footerButtons}
    >
      <div>
        <p className="text-center text-gray-700  ">
          Por favor, revisa tu correo electrónico y confirma tu dirección para
          activar tu cuenta.
        </p>
      </div>
    </CardWrapper>
  );
};

export default AccountCreatedPage;
