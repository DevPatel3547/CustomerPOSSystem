// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const makeStore = (preloadedState) =>
  configureStore({ reducer: { cart: cartReducer }, preloadedState });

const store = makeStore();
export default store;
