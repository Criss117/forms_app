import { CardWrapper } from "@/components";
import { PUBLIC_ROUTES } from "@/lib/constants";
import Link from "next/link";

const ErrorConfirm = () => {
  return (
    <CardWrapper headerLabel="Hubo un error">
      <p className=" my-2 text-center text-destructive">
        Error al confirmar tu cuenta
        <span className="block underline hover:text-destructive/80">
          <Link href={PUBLIC_ROUTES.LOGIN}>Volver al inicio de sesión</Link>
        </span>
      </p>
    </CardWrapper>
  );
};

export default ErrorConfirm;
