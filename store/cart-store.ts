import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  isBundle?: boolean; // accessoire offert avec trolley
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  addTrolleyBundle: (
    trolley: Omit<CartItem, "quantity">,
    bundleItems: Omit<CartItem, "quantity" | "isBundle">[]
  ) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.slug === item.slug);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.slug === item.slug
                ? { ...i, quantity: i.quantity + 1 }
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

      clearCart: () => set({ items: [] }),

      addTrolleyBundle: (trolley, bundleItems) => {
        const items = get().items.filter(
          (i) => !i.isBundle && i.slug !== trolley.slug
        );
        set({
          items: [
            ...items,
            { ...trolley, quantity: 1 },
            ...bundleItems.map((b) => ({
              ...b,
              quantity: 1,
              price: 0,
              isBundle: true,
            })),
          ],
        });
      },
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
