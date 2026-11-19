import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Utensils, LayoutDashboard, ShoppingBag, ClipboardList, LogOut, Menu as MenuIcon, X, Package, Users } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

export default function Layout() {
  const {user, logout, cart} = useAppStore()
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const customerLinks = [
    ['/customer','Dashboard',LayoutDashboard], ['/menu','Food Menu',Utensils], ['/cart','My Cart',ShoppingBag], ['/my-orders','My Orders',ClipboardList],
  ]
  const adminLinks = [
    ['/admin','Dashboard',LayoutDashboard], ['/admin/menu','Manage Menu',Package], ['/admin/orders','Manage Orders',ClipboardList],
  ]
  const links = user?.role === 'admin' ? adminLinks : customerLinks
  function signOut(){ logout(); navigate('/login') }
  return <div className="min-h-screen bg-stone-50">
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <NavLink to={user?.role==='admin'?'/admin':'/customer'} className="flex items-center gap-2 font-black text-brand-900"><span className="rounded-xl bg-brand-100 p-2 text-xl">🍽️</span><span className="text-xl">Foodie</span></NavLink>
        <button className="rounded-lg p-2 md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<MenuIcon/>}</button>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([to,label,Icon])=><NavLink key={to} to={to} end className={({isActive})=>`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${isActive?'bg-brand-50 text-brand-700':'text-stone-600 hover:bg-stone-100'}`}><Icon size={17}/>{label}{to==='/cart'&&cart.length>0&&<span className="rounded-full bg-brand-600 px-2 text-xs text-white">{cart.reduce((n,x)=>n+x.qty,0)}</span>}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex"><div className="text-right"><p className="text-sm font-bold">{user?.name}</p><p className="text-xs capitalize text-stone-500">{user?.role}</p></div><button onClick={signOut} className="rounded-xl border border-stone-200 p-2 text-stone-600 hover:bg-stone-100" title="Logout"><LogOut size={18}/></button></div>
      </div>
      {open&&<div className="border-t p-3 md:hidden">{links.map(([to,label,Icon])=><NavLink onClick={()=>setOpen(false)} key={to} to={to} className="flex items-center gap-3 rounded-lg px-3 py-3"><Icon size={18}/>{label}</NavLink>)}<button onClick={signOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-600"><LogOut size={18}/>Logout</button></div>}
    </header>
    <main className="mx-auto max-w-7xl px-4 py-8"><Outlet/></main>
    <footer className="border-t bg-white py-5 text-center text-xs text-stone-500">Foodie Food Ordering System · Student project prototype</footer>
  </div>
}
