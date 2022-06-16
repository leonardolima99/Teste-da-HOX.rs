import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { sagaActions } from "@/redux/sagas/sagaActions";

import { Button } from "./Button";
import { Input } from "./Input";

const { VITE_API_URL: api_url } = import.meta.env;

export function Example1() {
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
      <h2>Área restrita</h2>
      <form>
        <Button
          type="button"
          ariaLabel="Apply filter"
          onClick={() => withFilter(true)}
        >
          Acessar
        </Button>
      </form>
    </div>
  );
}
