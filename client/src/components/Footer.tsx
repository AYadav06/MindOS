import React from 'react';
import { Logo } from '../assets/Logo';
import { Twitter, Linkedin, Github, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'About us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact us', href: '/contact' },
  ];

  const contactLinks = [
    { name: 'contact@mindos.com', href: 'mailto:contact@mindos.com' },
    { name: 'Privacy policy', href: '/privacy' },
    { name: 'Terms of services', href: '/terms' },
  ];

  const socialIcons = [
    { name: 'Twitter', href: 'https://twitter.com/mindos', icon: Twitter },
    { name: 'Phone', href: 'tel:+1234567890', icon: Phone },
    { name: 'Email', href: 'mailto:hello@mindos.com', icon: Mail },
  ];

  return (
    <footer className=" bg-slate-800/50 p-4 backdrop-blur-sm border border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section - Navigation Links and Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-700">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-4 md:mb-0">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold text-white">MINDOS</span>
          </div>
        </div>

        {/* Bottom Section - Contact/Legal Links and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Contact and Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialIcons.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-500/40 transition-all duration-300"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            © {currentYear} MindOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 