"use client";
import { CardWrapper } from "@/components";
import { PUBLIC_ROUTES } from "@/lib/constants";

const footerButtons = [
  {
    label: "Volver al inicio de sesión",
    href: PUBLIC_ROUTES.LOGIN,
  },
];

const ConFirmPage = () => {
  return (
    <CardWrapper
      headerLabel="Correo Verificado Correctamente"
      footerButtons={footerButtons}
    >
      <p className=" my-2 text-center">
        Verifica la bandeja de entrada de tu correo para recuperar tu cuenta.
      </p>
    </CardWrapper>
  );
};

export default ConFirmPage;
