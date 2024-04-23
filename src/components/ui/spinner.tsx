import { cn } from "@/lib";
import styles from "./spinner.module.css";

interface Props {
  className?: string;
  loader?: "primary" | "secondary";
}

export const Spinner = ({ className, loader = "primary" }: Props) => {
  return <span className={cn(styles[loader], className)}></span>;
};
