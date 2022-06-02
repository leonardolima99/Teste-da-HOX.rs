import React, { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { sagaActions } from "../redux/sagas/sagaActions";

export function Example() {
  const [url, setUrl] = useState<string>("http://localhost:3001/products");

  const products = useSelector((state: RootState) => state.products.value);
  const dispatch = useDispatch();

  function withFilter(doIt: boolean) {
    if (doIt) {
      setUrl("http://localhost:3001/products?_sort=name");
    } else {
      setUrl("http://localhost:3001/products");
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
      <button
        aria-label="Apply filter"
        onClick={() => {
          withFilter(true);
        }}
      >
        Com filtro
      </button>
      <button
        aria-label="Remove filter"
        onClick={() => {
          withFilter(false);
        }}
      >
        Sem filtro
      </button>

      <button
        aria-label="Get all products"
        onClick={() =>
          dispatch({
            type: sagaActions.FETCH_PRODUCTS_SAGA,
            payload: url,
          })
        }
      >
        Buscar
      </button>
    </div>
  );
}
