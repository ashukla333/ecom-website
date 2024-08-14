// stores/cartStore.js
import create from 'zustand';
import { persist } from 'zustand/middleware';

// Store for managing cart items
export const useCartStore = create(persist(
  (set) => ({
    cartItems: [],
    addToCart: (product) => set((state) => {
      const existingProduct = state.cartItems.find(item => item._id === product._id);
      if (existingProduct) {
        // If product exists, increase its quantity
        return {
          cartItems: state.cartItems.map(item =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // If product doesn't exist, add it to cart
        return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
      }
    }),
    removeFromCart: (productId) => set((state) => ({
      cartItems: state.cartItems.filter(item => item._id !== productId),
    })),
    clearCart: () => set({ cartItems: [] }),
    cartCount: (state) => state.cartItems.reduce((total, item) => total + item.quantity, 0),
  }),
  {
    name: 'cart-storage', // Unique name for local storage key
  }
));

// Store for managing order items with persistence
export const useOrderStore = create(persist(
  (set) => ({
    cartItems: [],
    addCartItem: (item) => set((state) => ({
      cartItems: [...state.cartItems, item]
    })),
    removeCartItem: (id) => set((state) => ({
      cartItems: state.cartItems.filter(item => item.productId !== id)
    })),
    clearCart: () => set(() => ({
      cartItems: []
    })),
    setCartItems: (items) => set(() => ({
      cartItems: items
    })),
  }),
  {
    name: 'order-storage', // Unique name for local storage key
  }
));
