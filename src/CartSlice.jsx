import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // ✅ Add item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If it already exists, increase its quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add it with quantity = 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // ✅ Remove item from cart
    removeItem: (state, action) => {
      // Filter out the item whose name matches the payload
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // ✅ Update item quantity
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure name and new quantity
      // Find the item in the cart
      const itemToUpdate = state.items.find(item => item.name === name);
      // If found, update its quantity
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
