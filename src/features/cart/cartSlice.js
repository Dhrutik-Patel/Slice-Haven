import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, unitPrice } = action.payload;

      const existingCartItem = state.cartItems.find(
        (item) => item.pizzaId === id
      );

      if (existingCartItem) {
        existingCartItem.quantity++;
        existingCartItem.totalPrice += unitPrice;
      } else {
        state.cartItems.push({
          pizzaId: id,
          name,
          quantity: 1,
          unitPrice,
          totalPrice: unitPrice,
        });
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.pizzaId !== id);
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;

      const existingCartItem = state.cartItems.find(
        (item) => item.pizzaId === id
      );

      existingCartItem.quantity++;
      existingCartItem.totalPrice += existingCartItem.unitPrice;
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;

      const existingCartItem = state.cartItems.find(
        (item) => item.pizzaId === id
      );

      if (existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.pizzaId !== id);
      } else {
        existingCartItem.quantity--;
        existingCartItem.totalPrice -= existingCartItem.unitPrice;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCartItems = (state) => {
  return state.cart.cartItems;
};

export const getTotalCartQuantity = (state) => {
  return state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

export const getTotalCartPrice = (state) => {
  return state.cart.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
};

export const getCartItemById = (pizzaId) => (state) => {
  return state.cart.cartItems.find((item) => item.pizzaId === pizzaId);
};
