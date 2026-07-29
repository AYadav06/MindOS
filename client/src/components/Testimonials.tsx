import { Quote, Star} from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "MindOS has fundamentally changed how I do research. It's the tool I've been waiting for my entire career.",
      name: "Dr. Sarah Chen",
      role: "PhD Researcher",
      field: "AI Ethics",
      avatar: "SC",
      rating: 5
    },
    {
      quote: "Finally, a way to connect all my scattered thoughts and research. This is exactly what my creative process needed.",
      name: "Marcus Rodriguez",
      role: "Content Creator",
      field: "Tech Education",
      avatar: "MR",
      rating: 5
    },
    {
      quote: "As a product manager, I need to stay on top of trends and research. MindOS makes it effortless to find and connect insights.",
      name: "Alex Thompson",
      role: "Product Manager",
      field: "SaaS",
      avatar: "AT",
      rating: 5
    }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
      
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-4 sm:mb-5 md:mb-6">
            Trusted by thinkers, creators, and lifelong learners
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2">
            Join thousands of researchers, creators, and professionals who've transformed their knowledge management with MindOS
          </p>
        </div>


        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-5 sm:p-6 md:p-8 bg-[#0F1629]/30 border border-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm hover:bg-[#0F1629]/50 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
            >
             
              <div className="mb-4 sm:mb-5 md:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
              </div>

              
              <div className="flex gap-1 mb-4 sm:mb-5 md:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                ))}
              </div>

           
              <blockquote className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-5 md:mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

           
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-800 to-slate-800 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-gray-300">
                    {testimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-blue-400">
                    {testimonial.field}
                  </div>
                </div>
              </div>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-slate-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 