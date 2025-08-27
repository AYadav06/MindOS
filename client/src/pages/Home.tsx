
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Feature } from '../components/Features'

export const Home = () => {
  return (
     <div className='min-h-screen w-screen bg-gradient-to-l from-blue-950 via-black to-blue-950'>
    <Navbar />
    <Hero />
    <Feature />
        </div>
  )
}
