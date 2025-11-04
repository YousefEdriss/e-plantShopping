import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    
    removeItem: (state, action) => {
      const nameToRemove = action.payload.name;
      state.items = state.items.filter(item => item.name !== nameToRemove);
    },

    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      } else if (existingItem && quantity <= 0) {
        state.items = state.items.filter(item => item.name !== name);
      }
    },

    
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;


export const selectTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default CartSlice.reducer;
