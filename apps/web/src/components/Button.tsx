import React from "react";

import styles from "@/styles/button.module.scss";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  color?: "primary" | "secondary";
}

export function Button({ children, ariaLabel, onClick }: Props) {
  return (
    <button className={styles.button} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}
