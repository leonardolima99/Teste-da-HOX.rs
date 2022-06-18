import { useState } from "react";
import styles from "../styles/form.module.scss";

import { useDispatch } from "react-redux";
import { sagaActions } from "@/redux/sagas/sagaActions";

export function SignIn() {
  const [email, setEmail] = useState<string>("teste@mail.com");
  const [password, setPassword] = useState<string>("1234");

  const dispatch = useDispatch();

  return (
    <div>
      <h2>Área restrita</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: sagaActions.USER_AUTHENTICATION,
            payload: { email, password },
          });
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
      </form>
    </div>
  );
}
