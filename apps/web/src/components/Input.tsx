import React, { Dispatch, SetStateAction } from "react";

import styles from "@/styles/form.module.scss";

interface Props {
  ariaLabel: string;
  color?: "primary" | "secondary";
  type: "text" | "password";
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
}

export function Input({
  ariaLabel,
  type,
  placeholder,
  onChange,
  value,
}: Props) {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={placeholder} className={styles.label}>
        {ariaLabel}
      </label>
      <input
        type={type}
        className={styles.textInput}
        aria-label={ariaLabel}
        id={placeholder}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
