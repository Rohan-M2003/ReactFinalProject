import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) {
        state.totalQuantity += quantity - item.quantity;
        item.quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter((i) => i.name !== item.name);
      state.totalQuantity -= item.quantity;
    },
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;