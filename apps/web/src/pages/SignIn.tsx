import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import styles from "../styles/form.module.scss";

import { toast, Id } from "react-toastify";

export function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  function handleSignIn(user: typeof username, pass: typeof password) {
    const toastId = { current: "" as Id };
    toastId.current = toast.loading("Carregando...");

    if (!user || !pass || user !== "teste@mail.com" || pass !== "1234") {
      setTimeout(() => {
        toast.update(toastId.current, {
          type: toast.TYPE.ERROR,
          isLoading: false,
          delay: 100,
          autoClose: 5000,
          closeOnClick: true,
          closeButton: true,
          render: "Usuário ou senha inválidos.",
        });
      }, 500);
      return false;
    }

    setTimeout(() => {
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        delay: 100,
        autoClose: 5000,
        closeOnClick: true,
        closeButton: true,
        render: "Acesso permitido.",
      });
      navigate("/1");
    }, 2000);
  }

  return (
    <div>
      <h2>Área restrita</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn(username, password);
        }}
      >
        <div>
          <div className={styles.inputBox}>
            <label htmlFor="Username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              className={styles.textInput}
              aria-label="Username"
              id="Username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="Password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              className={styles.textInput}
              aria-label="Password"
              id="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <button className={styles.button} aria-label="Acessar" type="submit">
          Acessar
        </button>
      </form>
    </div>
  );
}
