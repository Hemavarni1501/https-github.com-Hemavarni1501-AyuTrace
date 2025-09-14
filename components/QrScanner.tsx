
import React, { useState } from 'react';
import { SearchIcon, XCircleIcon } from './IconComponents';

interface QrScannerProps {
  onSearch: (batchId: string) => void;
  onReset: () => void;
  isSearching: boolean;
  hasResult: boolean;
}

const QrScanner: React.FC<QrScannerProps> = ({ onSearch, onReset, isSearching, hasResult }) => {
  const [batchId, setBatchId] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(batchId);
  };
  
  const handleResetClick = () => {
    setBatchId('');
    onReset();
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 relative">
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
        Trace Your Ayurvedic Product
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="Enter Batch ID (e.g., ASHWA-2024-G1-B1)"
          className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-light-green focus:border-brand-light-green transition duration-200"
          disabled={isSearching || hasResult}
        />
        {!hasResult ? (
          <button
            type="submit"
            disabled={isSearching || !batchId}
            className="flex items-center justify-center px-6 py-3 bg-brand-green text-white font-semibold rounded-md hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <SearchIcon className="w-5 h-5 mr-2" />
            {isSearching ? 'Tracing...' : 'Trace'}
          </button>
        ) : (
            <button
            type="button"
            onClick={handleResetClick}
            className="flex items-center justify-center px-6 py-3 bg-brand-brown text-white font-semibold rounded-md hover:bg-brand-brown/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-brown transition duration-200"
          >
            <XCircleIcon className="w-5 h-5 mr-2" />
            Scan Another
          </button>
        )}
      </form>
       {!hasResult && <p className="text-xs text-center text-gray-500 mt-3">
            Click the input and try our sample ID: <button onClick={() => setBatchId('ASHWA-2024-G1-B1')} className="font-mono text-brand-green hover:underline">ASHWA-2024-G1-B1</button>
        </p>}
    </div>
  );
};

export default QrScanner;
