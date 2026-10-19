import { makeStore } from './index';
import { setCart, clearCart, selectCart, selectCartTotal } from './cartSlice';

test('cart starts empty', () => {
  const store = makeStore();
  expect(selectCart(store.getState())).toEqual([]);
  expect(selectCartTotal(store.getState())).toBe(0);
});

test('setCart replaces the order and the total follows it', () => {
  const store = makeStore();
  store.dispatch(setCart([
    { id: 1, name: 'Jasmine Green Tea', cost: 4.1, quantity: 3 },
    { id: 2, name: 'Orange Lulu', cost: 5.2, quantity: 1 },
  ]));
  expect(selectCart(store.getState())).toHaveLength(2);
  // 3 * 4.10 + 5.20 = 17.50 exactly (floating point would give 17.499999999999996)
  expect(selectCartTotal(store.getState())).toBe(17.5);
});

test('clearCart empties the order', () => {
  const store = makeStore();
  store.dispatch(setCart([{ id: 1, name: 'x', cost: 1, quantity: 1 }]));
  store.dispatch(clearCart());
  expect(selectCart(store.getState())).toEqual([]);
});

test('setCart ignores non-array payloads', () => {
  const store = makeStore();
  store.dispatch(setCart(null));
  expect(selectCart(store.getState())).toEqual([]);
});
