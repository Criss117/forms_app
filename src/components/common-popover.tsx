"use client";

import { ElementRef, PropsWithChildren, ReactNode, useRef } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";

import { Button, Popover, PopoverContent, PopoverTrigger } from "./ui";

interface Props extends PropsWithChildren {
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffSet?: number;
  trigger?: ReactNode;
  className?: string;
}

const CommonPopover = ({
  side,
  align,
  sideOffSet,
  children,
  trigger,
  className,
}: Props) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffSet}
        className={className}
      >
        <PopoverClose asChild ref={closeRef}>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default CommonPopover;
