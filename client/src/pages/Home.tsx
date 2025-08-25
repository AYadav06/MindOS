
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'

export const Home = () => {
  return (
     <div className='h-screen w-screen bg-gradient-to-l from-blue-950 via-black to-blue-950'>
    <Navbar />
    <Hero />
        </div>
  )
}
