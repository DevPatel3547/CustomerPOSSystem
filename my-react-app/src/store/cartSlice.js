// store/cartSlice.js
// The order being assembled lives in one Redux store, so every panel (menu,
// cart modal, cashier, checkout) reads the same items and the same running total.
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    // Replace the whole cart (the components compute the next cart themselves).
    setCart(state, action) {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.items;

// Running total in integer cents, so the sum is exact, then back to dollars.
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (cents, item) => cents + Math.round(Number(item.cost || 0) * 100) * Number(item.quantity || 0),
    0,
  ) / 100;

export default cartSlice.reducer;
