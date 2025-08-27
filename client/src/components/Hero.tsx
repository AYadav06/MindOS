
import Card from './Card'
import { Pattern } from './Pattern'

export const Hero = () => {
  return (
    <div className='bg-gradient-to-l from-blue-950 via-black to-blue-950'>

    <div className='min-h-[300px] lg:h-96 max-w-4xl text-gray-300 mt-6 lg:mt-12 mx-auto p-4 lg:p-5 text-center shadow-2xl'>
         <Pattern />
         <h1 className='text-4xl sm:text-5xl lg:text-7xl mt-2 font-semibold'>MindOS - From Chaos</h1>
         <h1 className='text-4xl sm:text-5xl lg:text-7xl font-semibold mt-4 lg:mt-8'>To Clarity With AI</h1>
       <div className='w-full lg:w-xl mx-auto mt-6 lg:mt-8 px-2'>
        <h2 className='text-lg sm:text-xl text-gray-400 leading-relaxed'>Mind-OS is your personal knowledge engine. Effortlessly capture your thoughts, connect disparate ideas, and build a digital extension of your mind.</h2>
        </div>
        <div className='mt-8 lg:mt-10'>
            <button className='bg-gradient-to-l from-blue-900 via-black to-blue-900 px-6 py-3 lg:p-2 rounded-xl text-gray-300 shadow-2xl text-lg lg:text-xl hover:scale-105 transition-transform'>Get Started</button>
        </div>
    </div>
    <div className='h-0.5 w-screen bg-gray-700 opacity-15 mt-8 lg:mt-12'> </div>
    <div className='flex gap-2 py-4 lg:py-8'>
         <Card/>
    </div>
    </div>
  )
}
