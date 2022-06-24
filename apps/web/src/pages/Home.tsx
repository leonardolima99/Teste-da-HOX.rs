import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useDropdownMenu from "react-accessible-dropdown-menu-hook";

import global from "../styles/global.module.scss";
import styles from "../styles/navbar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { sagaActions } from "@/redux/sagas/sagaActions";
import { Button } from "@/components/Button";
import { ExampleTable } from "@/components/ExampleTable";
import axios from "axios";

const { VITE_API_URL: api_url } = import.meta.env; // Variable Environment

export function Home() {
  const [url, setUrl] = useState<string>(`${api_url}/products`);
  const [data, setData] = useState([]);

  const user = useSelector((state: RootState) => state.user.value);
  const products = useSelector((state: RootState) => state.products.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Fabricação",
        accessor: "manufactureDate",
      },
      {
        Header: "Validade",
        accessor: "expirationDate",
      },
      {
        Header: "Preço",
        accessor: "price",
      },
      {
        Header: "Ações",
        accessor: "actions",
      },
    ],
    []
  );

  const { buttonProps, itemProps, isOpen } = useDropdownMenu(1, {
    disableFocusFirstItemOnClick: true,
  });

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

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
          <div className={styles.dropdownMenu}>
            <button {...buttonProps} className={styles.btnUser}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <div className={isOpen ? styles.visible : ""} role={"menu"}>
              <a
                {...itemProps[1]}
                className={styles.btnOption}
                onClick={() => {
                  dispatch({ type: sagaActions.USER_SIGN_OUT });
                  navigate("/signin");
                }}
              >
                <span>Logout</span>
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
              </a>
            </div>
          </div>

          {/* <button
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
          </button> */}
        </nav>
      </header>
      <main>
        <div className={global.between}>
          <h4 className={global.title}>Lista de produtos</h4>
          <Button
            type="button"
            color="primary"
            ariaLabel="Novo produto"
            size="small"
          >
            Novo produto
          </Button>
        </div>
        <ExampleTable columns={columns} data={products} />
      </main>
    </div>
  );
}
