// src/components/Testimonial.tsx
import React from 'react';

export const Testimonial: React.FC = () => {
  return (
    <section className="px-4 py-20 text-center">
      <blockquote className="max-w-3xl mx-auto mb-4 text-2xl italic leading-relaxed text-light-text md:text-3xl">
        "I've tried every note-taking app out there. Mind-OS is the first one that doesn't 
        feel like a digital filing cabinet—it feels like an extension of my own mind."
      </blockquote>
      <cite className="font-semibold not-italic text-light-text">– Alex Carter, Designer & Writer</cite>
    </section>
  );
};
