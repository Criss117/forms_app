import { OctagonAlert } from "lucide-react";

interface Props {
  message?: string;
}

const FormError = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div
      className="
        bg-destructive/15 p-3 rounded-md 
        flex items-center gap-x-2 text-sm 
        text-destructive bg-destructive/20 
        border-l-8 border-destructive mb-2"
    >
      <OctagonAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
