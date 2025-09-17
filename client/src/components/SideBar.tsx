
import { typeIcons } from "./Constants"

export const SideBar =() =>{

  return (
    <nav className='h-20 w-screen px-10 bg-[#0F1629]/70 border border-white/10 p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl text-gray-300 flex items-center justify-center gap-50 text-lg'>
        <div className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800'>{typeIcons["Notes"]}Notes</div>
        <div className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800'>{typeIcons['YouTube']} YouTube</div>
        <div className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800'>{typeIcons['Tweets']}Tweets</div>
        <div className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800'>
            {typeIcons['URL']}URL
            </div>
    </nav>
  )
}
