import React, { FormEvent } from "react";

import styles from "@/styles/form.module.scss";

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  ariaLabel: string;
  color?: "primary" | "secondary";
  type: "button" | "submit";
}

export function Button({ children, ariaLabel, onClick, type }: Props) {
  return (
    <button
      className={styles.button}
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
