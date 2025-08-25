// src/components/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="px-4 py-16 text-center bg-bg border-neutral-300">
      <div className="grid max-w-4xl gap-8 mx-auto mb-12 text-left sm:grid-cols-3">
        <div className="footer-column">
          <h4 className="mb-4 text-lg font-semibold text-light-text">Product</h4>
          <a href="#features" className="block mb-2 text-light-text transition-colors hover:text-light-primary">Features</a>
          <a href="#pricing" className="block mb-2 text-light-text transition-colors hover:text-light-primary">Pricing</a>
         
        </div>
        <div className="footer-column">
          <h4 className="mb-4 text-lg font-semibold text-light-text">Company</h4>
          <a href="#about" className="block mb-2 text-light-text transition-colors hover:text-light-primary">About Us</a>
          <a href="#blog" className="block mb-2 text-light-text transition-colors hover:text-light-primary">Blog</a>
          {/* <a href="#careers" className="block mb-2 text-gray-400 transition-colors hover:text-primary">Careers</a> */}
        </div>
        <div className="footer-column">
          <h4 className="mb-4 text-lg font-semibold text-light-text">Support</h4>
          {/* <a href="#help" className="block mb-2 text-gray-400 transition-colors hover:text-primary">Help Center</a> */}
          <a href="#contact" className="block mb-2 text-light-text transition-colors hover:text-light-primary">Contact Us</a>
          <a href="#privacy" className="block mb-2 text-light-text transition-colors hover:text-light-primary">Privacy Policy</a>
        </div>
      </div>
      <p className="text-light-text">&copy; {new Date().getFullYear()} Mind-OS. All rights reserved.</p>
    </footer>
  );
};

