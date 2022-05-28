import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { getAllProducts } from "../reducers/productsSlice";
import { sagaActions } from "./sagaActions";

type DataApi = { url: string; method?: string; data?: [number] };

let result: AxiosResponse<any, any>;

let callAPI = async ({ url, method = "GET", data }: DataApi) => {
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
  } catch (e) {
    yield put({ type: "PRODUCTS_SAGA_FAILED" });
  }
}

export default function* rootSaga(): Generator<any> {
  yield takeEvery(sagaActions.FETCH_PRODUCTS_SAGA, fetchProductsSaga);
}
