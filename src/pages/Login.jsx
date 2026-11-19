import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Utensils, LockKeyhole, Mail } from 'lucide-react'
import { api } from '../api/client'
import { useAppStore } from '../store/useAppStore'
export default function Login(){
 const [email,setEmail]=useState('customer@foodie.com'),[password,setPassword]=useState('user123'),[error,setError]=useState(''),[loading,setLoading]=useState(false)
 const setUser=useAppStore(s=>s.setUser), nav=useNavigate()
 async function submit(e){e.preventDefault();setError('');setLoading(true);try{const {data}=await api.login(email.trim(),password);setUser(data);nav(data.role==='admin'?'/admin':'/customer')}catch(err){setError(err.message||'Unable to login.')}finally{setLoading(false)}}
 return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-900 via-brand-700 to-orange-500 px-4 py-10">
  <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
   <div className="hidden flex-col justify-between bg-brand-900 p-10 text-white md:flex"><div><div className="mb-8 inline-flex rounded-2xl bg-white/15 p-4"><Utensils size={34}/></div><h1 className="text-4xl font-black leading-tight">Good food.<br/>Good mood.</h1><p className="mt-4 text-orange-100">Order your favorites in just a few clicks.</p></div><p className="text-sm text-orange-100">Foodie · Food Ordering System</p></div>
   <form onSubmit={submit} className="p-7 sm:p-10"><div className="mb-8"><div className="mb-3 inline-flex rounded-xl bg-brand-100 p-3 text-brand-800 md:hidden"><Utensils/></div><p className="text-sm font-bold uppercase tracking-widest text-brand-600">Welcome to Foodie</p><h2 className="mt-2 text-3xl font-black">Sign in</h2><p className="mt-2 text-sm text-stone-500">Enter your account details to continue.</p></div>
    <label className="mb-2 block text-sm font-semibold">Email address</label><div className="mb-5 flex items-center gap-3 rounded-xl border border-stone-200 px-4"><Mail size={18} className="text-stone-400"/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full py-3 outline-none" placeholder="you@example.com"/></div>
    <label className="mb-2 block text-sm font-semibold">Password</label><div className="mb-4 flex items-center gap-3 rounded-xl border border-stone-200 px-4"><LockKeyhole size={18} className="text-stone-400"/><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full py-3 outline-none" placeholder="Password"/></div>
    {error&&<p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <button disabled={loading} className="mt-2 w-full rounded-xl bg-brand-700 py-3 font-bold text-white hover:bg-brand-900">{loading?'Signing in...':'Sign in'}</button>
    <div className="mt-7 rounded-xl bg-stone-50 p-4 text-xs text-stone-600"><p className="mb-2 font-bold text-stone-800">Demo accounts</p><p>Customer: customer@foodie.com / user123</p><p>Admin: admin@foodie.com / admin123</p><p className="mt-2 text-stone-500">Change these before any real deployment. Demo authentication is not production security.</p></div>
   </form>
  </div>
 </div>
}
