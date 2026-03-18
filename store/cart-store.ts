import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  compare_at_price?: number;
  quantity: number;
};

export type SelectedRelay = {
  id: string;
  name: string;
  address: string;
  zipCode: string;
  city: string;
};

type CartStore = {
  items: CartItem[];
  selectedRelay: SelectedRelay | null;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  setRelay: (relay: SelectedRelay | null) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedRelay: null,

      addItem: (item) => {
        const existing = get().items.find((i) => i.slug === item.slug);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.slug === item.slug
                ? { ...i, quantity: i.quantity + 1, compare_at_price: item.compare_at_price ?? i.compare_at_price }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (slug) => {
        set({ items: get().items.filter((i) => i.slug !== slug) });
      },

      updateQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          get().removeItem(slug);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.slug === slug ? { ...i, quantity } : i
          ),
        });
      },

      setRelay: (relay) => set({ selectedRelay: relay }),

      clearCart: () => set({ items: [], selectedRelay: null }),
    }),
    {
      name: "powerbug-cart",
    }
  )
);

// Selectors
export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const TROLLEY_SLUGS = ["nx-lithium", "nx-dhc-lithium"];
export const cartNeedsRelay = (items: CartItem[]) =>
  items.length > 0 && !items.some((item) => TROLLEY_SLUGS.includes(item.slug));
