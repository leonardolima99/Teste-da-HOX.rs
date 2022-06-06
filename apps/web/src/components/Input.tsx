import React from "react";

import styles from "@/styles/form.module.scss";

interface Props {
  ariaLabel: string;
  color?: "primary" | "secondary";
  type: "text" | "password";
  placeholder: string;
}

export function Input({ ariaLabel, type, placeholder }: Props) {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={placeholder} className={styles.label}>
        {placeholder}
      </label>
      <input
        type={type}
        className={styles.textInput}
        aria-label={ariaLabel}
        id={placeholder}
        placeholder={placeholder}
      />
    </div>
  );
}
