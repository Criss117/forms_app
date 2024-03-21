"use client";

import { Button, FormsAppTitle } from "@/components/ui";
import { cn } from "@/lib";
import { NAV_PUBLIC_ROUTES, PUBLIC_ROUTES } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountHeader = () => {
  const pathname = usePathname();

  if (pathname.includes(PUBLIC_ROUTES.REGISTER_CONFIRM)) {
    return null;
  }

  return (
    <header className="bg-white absolute w-full top-0 shadow-sm py-2">
      <div className="flex justify-between items-center h-full w-[95%] md:w-[70%] mx-auto">
        <FormsAppTitle href={PUBLIC_ROUTES.ROOT} />
        <nav className="w-full md:w-fit">
          <ul className="flex gap-2 w-full justify-between">
            {NAV_PUBLIC_ROUTES.map(({ label, href }) => (
              <Button
                key={label + href}
                asChild
                variant="outline"
                className={cn(
                  "border-2 border-black",
                  pathname === href &&
                    "bg-black text-white hover:bg-black hover:text-white"
                )}
              >
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AccountHeader;
