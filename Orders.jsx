import { useEffect,useState } from 'react'
import { api } from '../api/client'
import { useAppStore } from '../store/useAppStore'
import StatusBadge from '../components/StatusBadge'
import { Empty } from './Customer'
export function CustomerOrders(){
 const user=useAppStore(s=>s.user),[orders,setOrders]=useState([])
 useEffect(()=>{api.getOrders().then(r=>setOrders(r.data.filter(o=>o.customerId===user.id).reverse()))},[user.id])
 return <div><h1 className="text-3xl font-black">My Orders</h1><p className="mt-1 text-stone-500">Check the progress of your orders.</p>{!orders.length?<Empty text="You have not placed an order yet."/>:<div className="mt-6 space-y-4">{orders.map(o=><article key={o.id} className="rounded-2xl border bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-black">Order #{o.id.slice(0,8).toUpperCase()}</p><p className="text-xs text-stone-500">{new Date(o.createdAt).toLocaleString()}</p></div><StatusBadge status={o.status}/></div><div className="my-4 space-y-1 text-sm">{o.items.map(i=><p key={i.id}>{i.qty} × {i.name} <span className="text-stone-500">— ₱{(i.qty*i.price).toFixed(2)}</span></p>)}</div><div className="flex flex-wrap justify-between gap-2 border-t pt-3 text-sm"><span className="text-stone-500">{o.payment} · {o.address}</span><b className="text-brand-700">Total: ₱{o.total.toFixed(2)}</b></div>{o.status==='Rejected'&&<p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">Your order was rejected by the admin. Please contact the restaurant for details.</p>}</article>)}</div>}</div>
}