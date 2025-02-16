import React from 'react';
import image from "./images/WhatsApp Image 2025-02-13 at 12.51.10_d0589120.jpg"

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src= {image} 
        alt="Innolink Softwares" 
        className="h-10"
      />
      <div className="ml-2 hidden lg:block">
        <span className="block text-sm text-gray-600">SMART TECH | SMARTER WORLD</span>
      </div>
    </div>
  );
};

export default Logo;