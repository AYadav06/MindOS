import { typeIcons } from "./NoteCard";
export const SideBar = () => {

  return (
    <nav className='max-w-2xs h-screen bg-[#0F1629]/70 border border-white/10 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg text-gray-300'>
        <div className='w-3xs flex p-3 gap-3 mb-4 rounded-lg hover:bg-light-accent hover:bg-[#0F1629]/70 '>{typeIcons["Notes"]}Notes</div>
        <div className='w-3xs hover:bg-[#0F1629]/70 flex p-3 gap-3 mb-4 rounded-lg'>{typeIcons['YouTube']} YouTube</div>
        <div className='w-3xs bg-light-secondary flex p-3 gap-3 mb-4 rounded-lg hover:bg-[#0F1629]/70 '>{typeIcons['Tweets']}Tweets</div>
        <div className='w-3xs bg-light-secondary flex p-3 gap-3 mb-4 rounded-lg hover:bg-[#0F1629]/70 '>
            {typeIcons['URL']}URL
            </div>
    </nav>
  )
}
