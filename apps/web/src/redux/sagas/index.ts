import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

import { toast, Id } from "react-toastify";

import { getAllProducts } from "../reducers/productsSlice";
import { sagaActions } from "./sagaActions";

type DataApi = { url: string; method?: string; data?: [number] };

let result: AxiosResponse<any, any>;

const toastId = { current: 0 as Id };

let callAPI = async ({ url, method = "GET", data }: DataApi) => {
  toastId.current = toast.loading("Buscando dados...");
  result = await axios({
    url,
    method,
    data: data || undefined,
  });
};

export function* fetchProductsSaga(action: { type: string; payload: string }) {
  try {
    yield call(callAPI, {
      url: action.payload,
    });

    yield put(getAllProducts(result.data));

    toast.update(toastId.current, {
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      delay: 100,
      autoClose: 5000,
      closeOnClick: true,
      closeButton: true,
      render: "Dados encontrados.",
    });
  } catch (e) {
    yield put({ type: "PRODUCTS_SAGA_FAILED" });

    toast.update(toastId.current, {
      type: toast.TYPE.ERROR,
      isLoading: false,
      delay: 100,
      autoClose: 5000,
      closeOnClick: true,
      closeButton: true,
      render: "Algo deu errado.",
    });
  }
}

export default function* rootSaga(): Generator<any> {
  yield takeEvery(sagaActions.FETCH_PRODUCTS_SAGA, fetchProductsSaga);
}
