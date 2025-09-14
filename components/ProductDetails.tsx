
import React from 'react';
import type { Product } from '../types';
import { CheckCircleIcon } from './IconComponents';

const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={product.imageUrl} alt={product.name} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-brand-gold font-semibold">Verified Batch: {product.batchId}</div>
          <h1 className="block mt-1 text-3xl leading-tight font-serif font-bold text-brand-green">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-center text-green-700 font-semibold">
              <CheckCircleIcon className="w-6 h-6 mr-2" />
              <span>Authenticity Verified on Blockchain</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
