"use client";

import Link from "next/link";
import { Header } from ".";
import { Button, Card, CardContent, CardFooter, CardHeader } from "./ui";
import { cn } from "@/lib";

type FooterButton = {
  label: string;
  href: string;
};

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  footerButtons?: FooterButton[];
  cardClass?: string;
  headerClass?: string;
  footerClass?: string;
  contentClass?: string;
}

const CardWrapper = ({
  children,
  headerLabel,
  footerButtons,
  cardClass,
  footerClass,
  headerClass,
  contentClass,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        "w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] shadow-md transition-all",
        cardClass
      )}
    >
      <CardHeader className={cn(headerClass)}>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className={cn(contentClass)}>{children}</CardContent>
      <CardFooter className={cn(footerClass)}>
        <div className="flex justify-between w-full flex-col md:flex-row transition-all">
          {footerButtons?.map(({ label, href }) => (
            <Button asChild variant={"link"} key={label + href}>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
