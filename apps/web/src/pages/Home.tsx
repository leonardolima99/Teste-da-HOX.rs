import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import global from "../styles/global.module.scss";
import styles from "../styles/navbar.module.scss";

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
    <div className={global.page}>
      <nav className={styles.navbar}>
        <h3>
          Olá,{" "}
          {user.email.charAt(0).toUpperCase() +
            user.email.substring(1, user.email.indexOf("@"))}
        </h3>
        <button
          className={styles.button}
          onClick={() => {
            dispatch({ type: sagaActions.USER_SIGN_OUT });
            navigate("/signin");
          }}
        >
          <span className={styles.buttonText}>Logout</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#DB4437"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
            </g>
          </svg>
        </button>
      </nav>

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
