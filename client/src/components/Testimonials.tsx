import React from 'react';
import { Quote, Star, Users, Award, TrendingUp } from 'lucide-react';

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

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "500K+", label: "Connections Made", icon: TrendingUp },
    { number: "4.9", label: "User Rating", icon: Star },
    { number: "50+", label: "Integrations", icon: Award }
  ];

  return (
    <section className="py-16 lg:py-24 px-4 bg-gradient-to-l from-blue-950 via-black to-blue-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300 mb-6">
            Trusted by thinkers, creators, and lifelong learners
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of researchers, creators, and professionals who've transformed their knowledge management with MindOS
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-[#0F1629]/30 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-[#0F1629]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 bg-[#0F1629]/30 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-[#0F1629]/50 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-blue-400" />
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-300">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-blue-400">
                    {testimonial.field}
                  </div>
                </div>
              </div>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-[#0F1629]/50 border border-white/10 rounded-2xl backdrop-blur-sm">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Ready to transform your knowledge management?
              </h3>
              <p className="text-gray-400">
                Join thousands of users who've already upgraded their thinking
              </p>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 