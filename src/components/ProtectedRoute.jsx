import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
export default function ProtectedRoute({role}) {
  const user = useAppStore(s=>s.user)
  if (!user) return <Navigate to="/login" replace/>
  if (role && user.role !== role) return <Navigate to={user.role==='admin'?'/admin':'/customer'} replace/>
  return <Outlet/>
}
