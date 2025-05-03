import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../index.css';

const Footer = () => {
  return (
    <footer className="mt-16 bg-darker text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Sahand Shabanlouei</h3>
            <p className="text-gray-400 max-w-md">
              Junior Frontend Developer passionate about creating beautiful and responsive web applications.
              Currently exploring React, JavaScript, and modern web development practices.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/SahandShabanloueii" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/sahandshabanlouei" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a 
              href="mailto:sahandshabanlouei@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sahand MovieDB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 