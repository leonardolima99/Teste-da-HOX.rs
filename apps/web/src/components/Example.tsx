import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { sagaActions } from "@/redux/sagas/sagaActions";

import styles from "@/styles/form.module.scss";
import { Button } from "./Button";

const { VITE_API_URL: api_url } = import.meta.env;

export function Example() {
  const [url, setUrl] = useState<string>(`${api_url}/products`);

  const products = useSelector((state: RootState) => state.products.value);
  const dispatch = useDispatch();

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
        <div key={product.name + "_" + product.id}>
          {product.name} {product.price}
        </div>
      ))}
      <Button ariaLabel="Apply filter" onClick={() => withFilter(true)}>
        Com filtro
      </Button>
      <Button ariaLabel="Remove filter" onClick={() => withFilter(false)}>
        Sem filtro
      </Button>
      <Button
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
