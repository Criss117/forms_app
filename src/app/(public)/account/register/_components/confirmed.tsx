import { CardWrapper } from "@/components";
import { PUBLIC_ROUTES } from "@/lib/constants";

const footerButtons = [
  {
    label: "Volver al login",
    href: PUBLIC_ROUTES.LOGIN,
  },
];

const Confirmed = () => {
  return (
    <CardWrapper headerLabel="Hubo un error" footerButtons={footerButtons}>
      <p className=" my-2 text-center">Cuenta confirmada</p>
    </CardWrapper>
  );
};

export default Confirmed;
