import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { sagaActions } from "@/redux/sagas/sagaActions";

import { toast, Id } from "react-toastify";

import styles from "@/styles/form.module.scss";
import { Button } from "./Button";
import { Input } from "./Input";

const { VITE_API_URL: api_url } = import.meta.env; // Variable Environment

export function Example() {
  const [url, setUrl] = useState<string>(`${api_url}/products`);

  const products = useSelector((state: RootState) => state.products.value);
  const dispatch = useDispatch();

  const toastId = React.useRef<Id>({} as Id);
  const loading = () => (toastId.current = toast.loading("Carregando..."));
  const update = () => {
    toast.update(toastId.current, {
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
      isLoading: false,
    });
  };
  function withFilter(doIt: boolean) {
    if (doIt) {
      setUrl(`${api_url}/products?_sort=name`);
    } else {
      setUrl(`${api_url}/products`);
    }
  }

  return (
    <div>
      <span>Contador</span>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} {product.price}
        </div>
      ))}
      <form className={styles.form}>
        <div></div>
        <Input
          placeholder="Username"
          type="text"
          ariaLabel="Username"
          onChange={() => {}}
        />
        <Button
          type="button"
          ariaLabel="Apply filter"
          onClick={() => withFilter(true)}
        >
          Acessar
        </Button>
      </form>
      <Button
        type="button"
        ariaLabel="Apply filter"
        onClick={() => withFilter(true)}
      >
        Notify
      </Button>
      <Button
        type="button"
        ariaLabel="Remove filter"
        onClick={() => withFilter(false)}
      >
        Update
      </Button>
      <Button
        type="button"
        ariaLabel="Search"
        onClick={() =>
          dispatch({
            type: sagaActions.FETCH_PRODUCTS_SAGA,
            payload: url,
          })
        }
      >
        Buscar
      </Button>
    </div>
  );
}
