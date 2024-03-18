import { CardWrapper } from "@/components";

const ErrorConfirm = () => {
  return (
    <CardWrapper headerLabel="Hubo un error">
      <p className=" my-2 text-center text-destructive">
        Error al confirmar tu cuenta
      </p>
    </CardWrapper>
  );
};

export default ErrorConfirm;
