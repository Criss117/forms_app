import { cn } from "@/lib";
import { PropsWhithClass } from "@/lib/models";

interface Props extends PropsWhithClass {
  label: string;
}

const Header = ({ label, className }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h2 className={cn("text-3xl font-semibold", className)}>{label}</h2>
    </div>
  );
};

export default Header;
