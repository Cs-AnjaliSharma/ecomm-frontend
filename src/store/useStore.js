import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_COUPONS } from "../utils/mockData";

export const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      cartDrawerOpen: false,
      appliedCoupon: null,

      setCartDrawerOpen: (isOpen) => set({ cartDrawerOpen: isOpen }),

      addToCart: (product, { size, finish, splitPieces = null, quantity = 1, customImage = null, customNotes = "" }) => {
        const cart = get().cart;
        
        // Generate a composite key to identify unique variant combinations in the cart
        const variantId = `${product.id}-${size}-${finish}-${splitPieces || "default"}-${customNotes ? encodeURIComponent(customNotes) : ""}`;

        const existingIndex = cart.findIndex((item) => item.variantId === variantId);

        if (existingIndex > -1) {
          const newCart = [...cart];
          newCart[existingIndex].quantity += quantity;
          set({ cart: newCart, cartDrawerOpen: true });
        } else {
          set({
            cart: [
              ...cart,
              {
                variantId,
                product,
                size,
                finish,
                splitPieces,
                quantity,
                customImage,
                customNotes
              }
            ],
            cartDrawerOpen: true
          });
        }
      },

      removeFromCart: (variantId) => {
        const filteredCart = get().cart.filter((item) => item.variantId !== variantId);
        set({ cart: filteredCart });
      },

      updateQuantity: (variantId, amount) => {
        const cart = get().cart;
        const itemIndex = cart.findIndex((item) => item.variantId === variantId);
        if (itemIndex === -1) return;

        const newCart = [...cart];
        newCart[itemIndex].quantity += amount;

        if (newCart[itemIndex].quantity <= 0) {
          set({ cart: newCart.filter((item) => item.variantId !== variantId) });
        } else {
          set({ cart: newCart });
        }
      },

      toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some((item) => item.id === product.id);

        if (exists) {
          set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },

      applyCoupon: (code) => {
        if (!code) {
          set({ appliedCoupon: null });
          return { success: true, message: "Coupon removed" };
        }

        const coupon = MOCK_COUPONS.find(
          (c) => c.code.toUpperCase() === code.trim().toUpperCase()
        );

        if (!coupon) {
          return { success: false, message: "Invalid Coupon Code" };
        }

        // Calculate current subtotal
        const subtotal = get().getCartSubtotal();
        if (subtotal < coupon.minPurchase) {
          return {
            success: false,
            message: `Minimum purchase of $${coupon.minPurchase} required.`
          };
        }

        set({ appliedCoupon: coupon });
        return { success: true, message: "Coupon applied successfully!" };
      },

      clearCart: () => set({ cart: [], appliedCoupon: null }),

      // Helpers for calculations
      getCartSubtotal: () => {
        return get().cart.reduce((total, item) => {
          let price = item.product.price;
          // Apply framing price add-on if applicable
          if (item.finish === "Black Wooden Frame") {
            price += 150; // Frame add-on price
          }
          // Adjust price slightly based on size
          if (item.size === "A3") price += 50;
          if (item.size === "13x19 Inches") price += 100;
          
          return total + price * item.quantity;
        }, 0);
      },

      getCartDiscount: () => {
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;

        const subtotal = get().getCartSubtotal();
        let discount = (subtotal * coupon.discountPercentage) / 100;
        
        if (coupon.maxDiscount && discount > coupon.maxDiscount) {
          discount = coupon.maxDiscount;
        }
        return discount;
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const discount = get().getCartDiscount();
        // Shipping is free above $500, otherwise $49 flat
        const shipping = subtotal > 500 || subtotal === 0 ? 0 : 49;
        return subtotal - discount + shipping;
      }
    }),
    {
      name: "posterized-shop-storage", // name of the item in localStorage
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist
      }) // only persist cart and wishlist
    }
  )
);
