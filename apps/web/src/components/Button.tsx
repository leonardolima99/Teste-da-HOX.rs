import React, { FormEvent } from "react";

import styles from "@/styles/form.module.scss";

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  ariaLabel: string;
  color?: "primary" | "secondary";
  type: "button" | "submit";
  size: "small" | "large";
}

export function Button({ children, ariaLabel, onClick, type, size }: Props) {
  return (
    <button
      className={
        styles.button + " " + (size === "small" ? styles.small : styles.large)
      }
      aria-label={ariaLabel}
      onClick={(e: FormEvent) => {
        e.preventDefault();
        onClick ? onClick() : null;
      }}
      type={type}
    >
      {children}
    </button>
  );
}
