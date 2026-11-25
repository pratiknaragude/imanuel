"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "light" | "yellow" | "dark";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const variantClass: Record<Variant, string> = {
  light: "btn-neu-light",
  yellow: "btn-neu-yellow",
  dark: "btn-neu-dark",
};

export const NeumorphicButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "light", className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={clsx(
          variantClass[variant],
          "inline-flex items-center justify-center gap-2 text-sm",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
NeumorphicButton.displayName = "NeumorphicButton";
