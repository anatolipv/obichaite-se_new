import { Product } from '@/payload-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CheckoutInitialState {
  shoppingCardOpen: boolean
  products: Product[]
}

const checkoutInitialState: CheckoutInitialState = {
  shoppingCardOpen: false,
  products: [],
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: checkoutInitialState,
  reducers: {
    setShoppingCardOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.shoppingCardOpen = payload
    },
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.products = payload
    },
    clearProducts: (state) => {
      state.products = []
    },
    addProductToShoppingCart: (state, { payload }: PayloadAction<Product>) => {
      if (state.products.find((product) => product.id === payload.id)) return
      state.products.push(payload)
    },
    removeProductFromShoppingCart: (state, { payload }: PayloadAction<Product>) => {
      if (!state.products.find((product) => product.id === payload.id)) return
      state.products = state.products.filter((product) => product.id !== payload.id)
    },
  },
})

export const {
  setShoppingCardOpen,
  setProducts,
  clearProducts,
  addProductToShoppingCart,
  removeProductFromShoppingCart,
} = checkoutSlice.actions

export default checkoutSlice.reducer
