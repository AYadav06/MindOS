import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Problem } from '../components/Problem'
import { Solution } from '../components/Solution'
import { Feature } from '../components/Features'
import { Testimonials } from '../components/Testimonials'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'


export const Home = () => {
  return (
     <div className='min-h-screen w-full overflow-x-hidden bg-gradient-to-l from-blue-950 via-black to-blue-950'>
    <Navbar />
    <Hero />
    <Problem />
    <Solution />
    < Feature/>
    <Testimonials />
    <FinalCTA />
    <Footer />
        </div>
  )
}
