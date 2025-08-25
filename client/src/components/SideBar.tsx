
import { typeIcons } from './NoteCard'
export const SideBar = () => {

  return (
    <nav className='max-w-2xs h-screen bg-light-card ml-2'>
  
       
        <div className='w-3xs bg-light-secondary flex p-3 gap-3 mb-4 rounded-lg hover:bg-light-accent'>{typeIcons["Notes"]}Notes</div>
        <div className='w-3xs bg-light-secondary flex p-3 gap-3 mb-4 rounded-lg'>{typeIcons['YouTube']} YouTube</div>
        <div className='w-3xs bg-light-secondary flex p-3 gap-3 mb-4 rounded-lg'>{typeIcons['Tweets']}Tweets</div>
        <div className='w-3xs bg-light-secondary flex p-3 gap-3 mb-4 rounded-lg'>
            {typeIcons['URL']}URL
            </div>
    
    </nav>
  )
}
