import Link from "next/link";
import FolderItem from "./folder-item";
import { Skeleton } from "./ui";

interface Props {
  items:
    | {
        name: string;
        href: string;
      }[]
    | [];
  isPending: boolean;
}

const NavMenuItems = ({ items, isPending }: Props) => {
  if (isPending) {
    return (
      <ul className="flex flex-col w-[300px] gap-y-2 m-2">
        <li>
          <Skeleton className="h-8" />
        </li>
        <li>
          <Skeleton className="h-8" />
        </li>
        <li>
          <Skeleton className="h-8" />
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex flex-col w-[300px] gap-y-2 m-2">
      {items.map(({ name, href }, index) => (
        <li key={index}>
          <Link href={href}>
            <FolderItem folderName={name} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenuItems;
