
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { Testimonial } from '../components/Testimonial'
import { Footer } from '../components/Footer'


export const Home = () => {
  return (
    <div className='relative'>
        <Navbar />
        <Hero/> 
       <Testimonial />
       <Footer />
    </div>
  )
}

