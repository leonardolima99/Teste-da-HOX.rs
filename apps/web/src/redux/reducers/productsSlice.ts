import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductsState {
  value: {
    id: number;
    name: string;
    manufactureDate: string;
    perishable: boolean;
    expirationDate: string;
    price: string;
  }[];
}

const initialState: ProductsState = {
  value: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      /* state.value += action.payload; */
    },
    getAllProducts: (state, action) => {
      state.value = action.payload;
    },
    handleRemoveProductOfList: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export const { getAllProducts, handleRemoveProductOfList } =
  productsSlice.actions;

export default productsSlice.reducer;
