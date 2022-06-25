import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

import { toast, Id } from "react-toastify";

import {
  getAllProducts,
  handleRemoveProductOfList,
} from "../reducers/productsSlice";
import { handleSignIn, handleUserUnauthorized } from "../reducers/userSlice";
import { sagaActions } from "./sagaActions";

type DataApi = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: [number];
  params?: { id: number };
};
type UserData = { email: string; password: string };
type UserAction = {
  type: string;
  payload: UserData;
};
type DataAction = {
  type: string;
  payload: DataApi;
};

let result: AxiosResponse<any, any>;

const toastId = { current: 0 as Id };

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let callAPI = async ({ url, method = "GET", data }: DataApi) => {
  if (method === "GET") toastId.current = toast.loading("Buscando dados...");
  /* if (method === "POST") toastId.current = toast.loading("Salvando dado...");
  if (method === "PUT") toastId.current = toast.loading("Atualizando dado...");
  if (method === "DELETE") toastId.current = toast.loading("Deletando dado...");
 */
  result = await axios({
    url,
    method,
    data: data || undefined,
  });
};

function userAuth({ email, password }: UserData) {
  const toastId = { current: "" as Id };
  toastId.current = toast.loading("Carregando...");

  if (
    !email ||
    !password ||
    email !== "teste@mail.com" ||
    password !== "1234"
  ) {
    setTimeout(() => {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        isLoading: false,
        delay: 100,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        render: "Usuário ou senha inválidos.",
      });
    }, 500);
    throw false;
  } else {
    setTimeout(() => {
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        render: "Acesso permitido.",
      });
      return true;
    }, 2000);
  }
}

export function* userAuthentication(action: UserAction) {
  try {
    yield call(userAuth, {
      email: action.payload.email,
      password: action.payload.password,
    });

    yield delay(2000);

    yield put(handleSignIn({ email: action.payload.email, isAuth: true }));
  } catch (e) {
    yield put(handleUserUnauthorized({ email: "", isAuth: false }));
  }
}

export function* userSignOut() {
  try {
    yield put(handleUserUnauthorized({ email: "", isAuth: false }));

    toast.success("Você deslogou.");
  } catch (e) {
    throw new Error("Não pôde deslogar.");
  }
}

export function* deleteProductsSaga(action: DataAction) {
  const toastId1 = { current: 0 as Id };
  toastId1.current = toast.loading("Deletando dado...");

  try {
    yield call(callAPI, {
      url: `${action.payload.url}/${action.payload.params?.id}`,
      method: "DELETE",
    });

    yield put(handleRemoveProductOfList(action.payload.params?.id));

    toast.update(toastId1.current, {
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      delay: 100,
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      render: "Deletado.",
    });
  } catch (e) {
    toast.update(toastId1.current, {
      type: toast.TYPE.ERROR,
      isLoading: false,
      delay: 100,
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      render: "Algo deu errado.",
    });
  }
}

export function* fetchProductsSaga(action: DataAction) {
  try {
    yield call(callAPI, {
      url: action.payload.url,
    });

    yield put(getAllProducts(result.data));

    toast.update(toastId.current, {
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      delay: 100,
      autoClose: 2000,
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
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      render: "Algo deu errado.",
    });
  }
}

export default function* rootSaga(): Generator<any> {
  yield takeEvery(sagaActions.FETCH_PRODUCTS_SAGA, fetchProductsSaga);
  yield takeEvery(sagaActions.DELETE_PRODUCTS_SAGA, deleteProductsSaga);
  yield takeEvery(sagaActions.USER_AUTHENTICATION, userAuthentication);
  yield takeEvery(sagaActions.USER_SIGN_OUT, userSignOut);
}
