
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-green/90 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} AyuTrace. All rights reserved.</p>
        <p className="mt-1">Ensuring Purity and Authenticity through Technology.</p>
      </div>
    </footer>
  );
};

export default Footer;
