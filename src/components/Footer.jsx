import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-6">
            <h5 className="font-bold text-lg mb-4">SGP</h5>
            <p className="text-sm">
            Students can file complaints, track status, and receive notifications</p>
          </div>
         
          <div className="w-full md:w-1/4 mb-6">
            <h5 className="font-bold text-lg mb-4">Contact Us</h5>
            <p className="text-sm mb-2">PSG College of Technology,Peelamedu,Coimbatore-641004</p>
            <p className="text-sm mb-2">Email: psgtech@gmail.com</p>
            <p className="text-sm mb-2">Phone: 9876543210</p>
            
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">&copy; 2024 SGP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
