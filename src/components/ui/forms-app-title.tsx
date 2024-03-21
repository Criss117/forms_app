import Link from "next/link";

interface Props {
  href: string;
}

const FormsAppTitle = ({ href }: Props) => {
  return (
    <Link href={href} className="md:flex gap-2 items-center hidden">
      <span className="w-10 h-10 bg-lightaccent-100 rounded-full"></span>
      <h1 className="text-2xl font-semibold hidden md:block">Forms App</h1>
    </Link>
  );
};

export default FormsAppTitle;
