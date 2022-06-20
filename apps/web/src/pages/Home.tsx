import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import global from "../styles/global.module.scss";
import styles from "../styles/navbar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { sagaActions } from "@/redux/sagas/sagaActions";
import { Button } from "@/components/Button";
import { ExampleTable } from "@/components/ExampleTable";

const { VITE_API_URL: api_url } = import.meta.env; // Variable Environment

export function Home() {
  const [url, setUrl] = useState<string>(`${api_url}/products`);

  const user = useSelector((state: RootState) => state.user.value);
  const products = useSelector((state: RootState) => state.products.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_PRODUCTS_SAGA, payload: url });
  }, []);

  return (
    <div className={global.page}>
      <header>
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
              enableBackground="new 0 0 24 24"
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
      </header>
      <main>
        <ExampleTable />
      </main>
      {/* <main>
        <h4>Produtos</h4>
        <table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Fabricação</td>
              <td>Validade</td>
              <td>Preço</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  {new Date(product.manufactureDate).toLocaleDateString()}
                </td>
                <td>
                  {product.expirationDate
                    ? new Date(product.expirationDate).toLocaleDateString()
                    : "Não perecível"}
                </td>
                <td>{product.price}</td>
                <td>
                  <button className={global.btnIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4285F4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className={global.btnIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DB4437"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  {new Date(product.manufactureDate).toLocaleDateString()}
                </td>
                <td>
                  {product.expirationDate
                    ? new Date(product.expirationDate).toLocaleDateString()
                    : "Não perecível"}
                </td>
                <td>{product.price}</td>
                <td>
                  <button className={global.btnIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4285F4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className={global.btnIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DB4437"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  {new Date(product.manufactureDate).toLocaleDateString()}
                </td>
                <td>
                  {product.expirationDate
                    ? new Date(product.expirationDate).toLocaleDateString()
                    : "Não perecível"}
                </td>
                <td>{product.price}</td>
                <td>
                  <button className={global.btnIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4285F4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className={global.btnIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DB4437"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main> */}
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
