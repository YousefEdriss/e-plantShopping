import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      const newItem = action.payload;
      // check if item already exists
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        // if already exists, just increase its quantity
        existingItem.quantity += 1;
      } else {
        // otherwise, add it with quantity = 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    // Remove item completely from cart
    removeItem: (state, action) => {
      const nameToRemove = action.payload.name;
      state.items = state.items.filter(item => item.name !== nameToRemove);
    },

    // Update quantity of a specific item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      } else if (existingItem && quantity <= 0) {
        // if quantity is zero or less, remove the item
        state.items = state.items.filter(item => item.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
