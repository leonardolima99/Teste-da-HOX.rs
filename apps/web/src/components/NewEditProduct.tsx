import { ProductType } from "@/redux/reducers/productsSlice";
import { useState } from "react";
import { Input } from "./Input";

import styles from "@/styles/form.module.scss";

type Props = {
  product?: ProductType;
};

export function NewEditProduct({ product }: Props) {
  const [name, setName] = useState<string>(product?.name || "");
  const [manufactureDate, setManufactureDate] = useState<string>(
    product?.manufactureDate || ""
  );
  const [perishable, setPerishable] = useState<boolean>(
    product?.perishable || false
  );
  const [expirationDate, setExpirationDate] = useState<string>(
    product?.expirationDate || ""
  );
  const [price, setPrice] = useState<string>(product?.price || "");

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          /* dispatch({
            type: sagaActions.USER_AUTHENTICATION,
            payload: { email, password },
          }); */
        }}
      >
        <div className={styles.inputBox}>
          <label htmlFor="Nome" className={styles.label}>
            Nome
          </label>
          <input
            type="text"
            className={styles.textInput + " " + styles.formSmall}
            aria-label="Nome"
            id="Nome"
            placeholder="Suco de caju"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="manufactureDate" className={styles.label}>
            Data de Fabricação
          </label>
          <input
            type="date"
            className={styles.textInput + " " + styles.formSmall}
            aria-label="data de fabricação"
            id="manufactureDate"
            placeholder="21/12/2012"
            onChange={(e) => setManufactureDate(e.target.value)}
            value={manufactureDate}
          />
        </div>
        <div className={styles.inputBox}>
          <span className={styles.label}>É perecível?</span>
          <div>
            <label htmlFor="yes" className={styles.label}>
              Sim
            </label>
            <input
              type="radio"
              className={styles.textInput}
              name="perishable"
              aria-label="perecível"
              id="yes"
              placeholder="input radio!!"
              onClick={(e) => setPerishable((prevState) => !prevState)}
              defaultChecked={perishable}
              checked={perishable ? true : false}
            />

            <label htmlFor="perishable" className={styles.label}>
              Não
            </label>
            <input
              type="radio"
              className={styles.textInput}
              name="perishable"
              aria-label="perecível"
              id="perishable"
              placeholder="input radio!!"
              onClick={(e) => setPerishable((prevState) => !prevState)}
              checked={!perishable ? true : false}
            />
          </div>
        </div>
        {perishable ? (
          <div className={styles.inputBox}>
            <label htmlFor="expirationDate" className={styles.label}>
              Data de Vencimento
            </label>
            <input
              type="date"
              className={styles.textInput + " " + styles.formSmall}
              aria-label="data de vencimento"
              id="expirationDate"
              placeholder="21/12/2012"
              onChange={(e) => setExpirationDate(e.target.value)}
              value={expirationDate}
            />
          </div>
        ) : null}
        <div className={styles.inputBox}>
          <label htmlFor="price" className={styles.label}>
            Preço
          </label>
          <input
            type="text"
            className={styles.textInput}
            aria-label="price"
            id="price"
            placeholder="R$ 32,90"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <button
          className={styles.button + " " + styles.large}
          aria-label={product ? "Salvar" : "Adicionar"}
          type="submit"
        >
          {product ? "Salvar" : "Adicionar"}
        </button>
      </form>
    </>
  );
}
