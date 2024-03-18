import { CardWrapper } from "@/components";

const WaitConfirm = () => {
  return (
    <CardWrapper headerLabel="Confirmando cuenta...">
      <p className=" my-2 text-center">
        Espere mientras se realiza la confirmación
      </p>
    </CardWrapper>
  );
};

export default WaitConfirm;
