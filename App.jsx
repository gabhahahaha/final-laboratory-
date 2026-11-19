import { Navigate, Route, Routes } from 'react-router-dom'
import { seedStore } from './store/localData'
import { useAppStore } from './store/useAppStore'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import { CustomerDashboard,FoodMenu,Cart } from './pages/Customer'
import Checkout from './pages/Checkout'
import { CustomerOrders } from './pages/Orders'
import { AdminDashboard,ManageMenu,ManageOrders } from './pages/Admin'
seedStore()
function HomeRedirect(){const user=useAppStore(s=>s.user);return <Navigate to={user?(user.role==='admin'?'/admin':'/customer'):'/login'} replace/>}
export default function App(){return <Routes><Route path="/login" element={<Login/>}/><Route element={<ProtectedRoute/>}><Route element={<Layout/>}><Route element={<ProtectedRoute role="customer"/>}><Route path="/customer" element={<CustomerDashboard/>}/><Route path="/menu" element={<FoodMenu/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/my-orders" element={<CustomerOrders/>}/></Route><Route element={<ProtectedRoute role="admin"/>}><Route path="/admin" element={<AdminDashboard/>}/><Route path="/admin/menu" element={<ManageMenu/>}/><Route path="/admin/orders" element={<ManageOrders/>}/></Route></Route></Route><Route path="*" element={<HomeRedirect/>}/></Routes>}
