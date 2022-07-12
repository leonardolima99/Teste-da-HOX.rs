import { ProductType } from "@/redux/reducers/productsSlice";
import { useEffect, useState } from "react";

import styles from "@/styles/form.module.scss";
import global from "@/styles/global.module.scss";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

type Props = {
  action: "new" | "edit";
};
type Params = {
  productId: number;
};
export function NewEditProduct({ action }: Props) {
  const { productId } = useParams();
  const id = productId as unknown as number;
  const product = useSelector((state: RootState) =>
    state.products.value.find((item) => item.id == id)
  );
  const [name, setName] = useState<string>("");
  const [manufactureDate, setManufactureDate] = useState<string>("");
  const [perishable, setPerishable] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    console.log(product);
    if (product) {
      setName(product.name);
      setManufactureDate(product.manufactureDate);
      setPerishable(product.perishable);
      setExpirationDate(product.expirationDate);
      setPrice(product.price);
    }
  }, [product]);

  return (
    <div className={global.page + " " + global.pt4}>
      {action === "new" ? <h2>Novo Produto</h2> : <h2>Editar produto</h2>}
      <form
        className={styles.form + " " + global.mt2}
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
          <label className={styles.switch}>
            <span className={styles.label}>É perecível?</span>
            <input
              type="checkbox"
              onChange={(e) => setPerishable((prevState) => !prevState)}
              checked={perishable}
            />
            {/*  <span className="slider round"></span> */}
          </label>
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
              datatype=""
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
            className={styles.textInput + " " + styles.formSmall}
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
    </div>
  );
}
