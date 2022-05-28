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
  },
});

export const { getAllProducts } = productsSlice.actions;

export default productsSlice.reducer;
