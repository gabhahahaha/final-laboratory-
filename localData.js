const defaults = {
  fos_users: [
    { id:'admin-1', name:'System Admin', email:'admin@foodie.com', password:'admin123', role:'admin' },
    { id:'customer-1', name:'Sample Customer', email:'customer@foodie.com', password:'user123', role:'customer' },
  ],
  fos_foods: [
    { id:'f1', name:'Classic Burger', category:'Burgers', price:129, description:'Juicy beef patty, lettuce and house sauce.', emoji:'🍔', available:true },
    { id:'f2', name:'Cheesy Pizza', category:'Pizza', price:249, description:'Loaded with cheese and tomato sauce.', emoji:'🍕', available:true },
    { id:'f3', name:'Chicken Meal', category:'Meals', price:159, description:'Crispy chicken with rice and gravy.', emoji:'🍗', available:true },
    { id:'f4', name:'Iced Coffee', category:'Drinks', price:79, description:'Cold and creamy coffee.', emoji:'🧋', available:true },
    { id:'f5', name:'Pancake Stack', category:'Desserts', price:99, description:'Fluffy pancakes with syrup.', emoji:'🥞', available:true },
    { id:'f6', name:'French Fries', category:'Sides', price:69, description:'Golden and crispy fries.', emoji:'🍟', available:true },
  ],
  fos_orders: [],
}
export function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) return JSON.parse(raw)
    if (defaults[key]) { localStorage.setItem(key, JSON.stringify(defaults[key])); return defaults[key] }
    return fallback
  } catch { return fallback }
}
export function writeStore(key, value) { localStorage.setItem(key, JSON.stringify(value)) }
export function seedStore() { Object.entries(defaults).forEach(([k,v]) => { if (!localStorage.getItem(k)) writeStore(k,v) }) }
