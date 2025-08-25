
import { Pattern } from './Pattern'

export const Hero = () => {
  return (
    <div className='h-96 max-w-4xl text-gray-300 mt-15 mx-auto p-5 text-center shadow-2xl'>
         <Pattern />
         <h1 className='text-7xl mt-2 font-semibold'>MindOS - From Chaos</h1>
         <h1 className='text-7xl font-semibold mt-8'>To Clarity With AI</h1>
       <div className='w-xl mx-auto mt-6'>
        <h2 className='text-xl text-gray-400'>Mind-OS is your personal knowledge engine. Effortlessly capture your thoughts, connect disparate ideas, and build a digital extension of your mind.</h2>
        </div>
    </div>
  )
}
