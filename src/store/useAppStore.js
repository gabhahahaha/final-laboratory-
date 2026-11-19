import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(persist((set, get) => ({
  user: null,
  cart: [],
  setUser: user => set({user}),
  logout: () => set({user:null, cart:[]}),
  addToCart: food => {
    const cart = get().cart
    const found = cart.find(x => x.id === food.id)
    set({cart: found ? cart.map(x => x.id === food.id ? {...x, qty:x.qty+1} : x) : [...cart, {...food, qty:1}]})
  },
  changeQty: (id, qty) => set({cart: qty <= 0 ? get().cart.filter(x=>x.id!==id) : get().cart.map(x=>x.id===id?{...x,qty}:x)}),
  clearCart: () => set({cart:[]}),
}), {name:'foodie-app-state', partialize: s => ({user:s.user, cart:s.cart})}))
