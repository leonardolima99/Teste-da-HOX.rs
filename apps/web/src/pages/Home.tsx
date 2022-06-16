import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import styles from "../styles/form.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { sagaActions } from "@/redux/sagas/sagaActions";

export function Home() {
  const [email, setEmail] = useState<string>("teste@mail.com");
  const [password, setPassword] = useState<string>("1234");

  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  /*   useEffect(() => {
    if (user.isAuth) navigate("/1");
  }, [user]); */

  return (
    <div>
      <h3>
        Olá,{" "}
        {user.email.charAt(0).toUpperCase() +
          user.email.substring(1, user.email.indexOf("@"))}
      </h3>

      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: sagaActions.USER_AUTHENTICATION,
            payload: { email, password },
          });
          console.log(user);
        }}
      >
        <div>
          <div className={styles.inputBox}>
            <label htmlFor="Email" className={styles.label}>
              Email
            </label>
            <input
              type="text"
              className={styles.textInput}
              aria-label="Email"
              id="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
      </form> */}
    </div>
  );
}
