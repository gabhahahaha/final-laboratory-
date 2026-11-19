import axios from 'axios'
import { readStore, writeStore } from '../store/localData'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 8000,
})

// Demo adapter: keeps the app functional without a separately hosted API.
// Replace with a real Axios API endpoint when connecting the MySQL backend.
http.interceptors.request.use(config => config)
http.interceptors.response.use(response => response, error => Promise.reject(error))

export const api = {
  async login(email, password) {
    await new Promise(r => setTimeout(r, 250))
    const users = readStore('fos_users', [])
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!user) throw new Error('Incorrect email or password.')
    return { data: { id:user.id, name:user.name, email:user.email, role:user.role } }
  },
  async getFoods() {
    await new Promise(r => setTimeout(r, 120))
    return { data: readStore('fos_foods', []) }
  },
  async saveFood(food) {
    const foods = readStore('fos_foods', [])
    const next = food.id ? foods.map(f => f.id === food.id ? food : f) : [...foods, {...food, id:crypto.randomUUID()}]
    writeStore('fos_foods', next)
    return { data: next }
  },
  async deleteFood(id) {
    writeStore('fos_foods', readStore('fos_foods', []).filter(f => f.id !== id))
    return { data: { success:true } }
  },
  async getOrders() { return { data: readStore('fos_orders', []) } },
  async saveOrder(order) {
    const orders = [...readStore('fos_orders', []), {...order, id:crypto.randomUUID(), createdAt:new Date().toISOString()}]
    writeStore('fos_orders', orders)
    return { data: orders }
  },
  async updateOrder(id, patch) {
    const orders = readStore('fos_orders', []).map(o => o.id === id ? {...o, ...patch} : o)
    writeStore('fos_orders', orders)
    return { data: orders }
  },
}
export default http
