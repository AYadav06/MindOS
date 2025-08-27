
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Problem } from '../components/Problem'
import { Solution } from '../components/Solution'
import { Feature } from '../components/Features'
import { Testimonials } from '../components/Testimonials'



export const Home = () => {
  return (
     <div className='min-h-screen w-screen bg-gradient-to-l from-blue-950 via-black to-blue-950'>
    <Navbar />
    <Hero />
    <Problem />
    <Solution />
    < Feature/>
    <Testimonials />

        </div>
  )
}
