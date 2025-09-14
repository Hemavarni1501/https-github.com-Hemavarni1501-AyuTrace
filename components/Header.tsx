
import React from 'react';
import { LeafIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-green shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-white">
          <LeafIcon className="h-8 w-8 text-brand-gold" />
          <h1 className="ml-3 text-2xl font-serif tracking-wider">
            Ayu<span className="font-bold text-brand-gold">Trace</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
