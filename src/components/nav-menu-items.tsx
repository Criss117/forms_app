import Link from "next/link";
import FolderItem from "./folder-item";
import { Skeleton } from "./ui";

type NavFolder = {
  name: string;
  href: string;
};

interface Props {
  items: Array<NavFolder>;
}

const NavMenuItems = ({ items }: Props) => {
  // if (items.length === 0) {
  //   return (
  //     <ul className="flex flex-col w-[300px] gap-y-2 m-2">
  //       <li>
  //         <Skeleton className="h-8" />
  //       </li>
  //       <li>
  //         <Skeleton className="h-8" />
  //       </li>
  //       <li>
  //         <Skeleton className="h-8" />
  //       </li>
  //     </ul>
  //   );
  // }

  if (items.length === 0) {
    return null;
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
