
import Card from './Card'
import { Pattern } from './Pattern'

export const Hero = () => {
  return (
    <div className='bg-gradient-to-l from-blue-950 via-black to-blue-950'>

    <div className='h-96 max-w-4xl text-gray-300 mt-12 mx-auto p-5 text-center shadow-2xl'>
         <Pattern />
         <h1 className='text-7xl mt-2 font-semibold'>MindOS - From Chaos</h1>
         <h1 className='text-7xl font-semibold mt-8'>To Clarity With AI</h1>
       <div className='w-xl mx-auto mt-8'>
        <h2 className='text-xl text-gray-400 '>Mind-OS is your personal knowledge engine. Effortlessly capture your thoughts, connect disparate ideas, and build a digital extension of your mind.</h2>
        </div>
        <div className='mt-10'>
            <button className='bg-gradient-to-l from-blue-900 via-black to-blue-900 p-2 rounded-xl text-gray-300 shadow-2xl text-xl'>Get Started</button>
        </div>
    </div>
    <div className='h-0.5 w-screen bg-gray-700 opacity-15 mt-12'> </div>
    <div className='flex h-screen gap-2 '>
         <Card/>
    </div>
    </div>
  )
}
