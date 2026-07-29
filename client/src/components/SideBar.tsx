
import { typeIcons } from "./Constants"

export const SideBar =() =>{

  return (
    <nav className='h-16 sm:h-20 w-screen px-2 sm:px-4 md:px-6 lg:px-10 bg-[#0F1629]/70 border border-white/10 p-2 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl text-gray-300 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm md:text-base lg:text-lg overflow-x-auto'>
        <div className='flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-800 whitespace-nowrap cursor-pointer transition-colors'>
          {typeIcons["Notes"]}
          <span className="hidden sm:inline">Notes</span>
        </div>
        <div className='flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-800 whitespace-nowrap cursor-pointer transition-colors'>
          {typeIcons['YouTube']}
          <span className="hidden sm:inline">YouTube</span>
        </div>
        <div className='flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-800 whitespace-nowrap cursor-pointer transition-colors'>
          {typeIcons['Tweets']}
          <span className="hidden sm:inline">Tweets</span>
        </div>
        <div className='flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-800 whitespace-nowrap cursor-pointer transition-colors'>
            {typeIcons['URL']}
            <span className="hidden sm:inline">URL</span>
        </div>
    </nav>
  )
}
