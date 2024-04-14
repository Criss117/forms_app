"use client";

import { CardWrapper } from "@/components";
import { PUBLIC_ROUTES } from "@/lib/constants";
import Link from "next/link";

const footerButtons = [
  {
    label: "Volver al login",
    href: PUBLIC_ROUTES.LOGIN,
  },
];

const PassWordChangedPage = () => {
  return (
    <CardWrapper
      headerLabel="Contraseña cambiada correctamente"
      footerButtons={footerButtons}
    >
      <p className="my-2 text-center">
        Ya puedes
        <span className="pl-1 underline hover:text-sky-800">
          <Link href={PUBLIC_ROUTES.LOGIN}>iniciar sesión</Link>
        </span>
      </p>
    </CardWrapper>
  );
};

export default PassWordChangedPage;
