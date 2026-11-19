export default function StatusBadge({status}) {
 const styles={Pending:'bg-amber-100 text-amber-800',Confirmed:'bg-blue-100 text-blue-800',Preparing:'bg-violet-100 text-violet-800',Ready:'bg-emerald-100 text-emerald-800',Completed:'bg-stone-200 text-stone-700',Rejected:'bg-red-100 text-red-700'}
 return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status]||'bg-stone-100 text-stone-700'}`}>{status}</span>
}
