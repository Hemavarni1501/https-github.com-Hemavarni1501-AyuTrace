
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QrScanner from './components/QrScanner';
import TraceabilityTimeline from './components/TraceabilityTimeline';
import { LoadingSpinner } from './components/IconComponents';
import { getTraceabilityData } from './services/traceabilityService';
import type { TraceabilityData } from './types';

const App: React.FC = () => {
  const [traceabilityData, setTraceabilityData] = useState<TraceabilityData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const handleSearch = useCallback(async (batchId: string) => {
    if (!batchId) {
      setError('Please enter a Batch ID.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTraceabilityData(null);
    setShowIntro(false);

    try {
      // Simulate network delay for a better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = await getTraceabilityData(batchId);
      setTraceabilityData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setTraceabilityData(null);
    setError(null);
    setIsLoading(false);
    setShowIntro(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <QrScanner onSearch={handleSearch} onReset={handleReset} isSearching={isLoading} hasResult={!!traceabilityData} />

          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white/50 rounded-lg shadow-md mt-8">
              <LoadingSpinner />
              <p className="mt-4 text-lg font-semibold text-brand-green">Verifying on the blockchain...</p>
              <p className="text-gray-600">Retrieving provenance data for your product.</p>
            </div>
          )}

          {error && (
            <div className="mt-8 text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md animate-fade-in-up">
              <h3 className="font-bold text-lg">Traceability Failed</h3>
              <p>{error}</p>
            </div>
          )}

          {traceabilityData && (
             <div className="animate-fade-in-up">
                <TraceabilityTimeline data={traceabilityData} />
            </div>
          )}

          {showIntro && !isLoading && !error && (
            <div className="mt-8 text-center p-8 bg-white/80 rounded-lg shadow-lg border border-gray-200 animate-fade-in-up">
                <h2 className="text-2xl font-serif text-brand-green mb-2">Welcome to AyuTrace</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Enter a product's batch ID to uncover its complete journey, from the soil to your hands. We provide full transparency, ensuring the authenticity and purity of your Ayurvedic herbs.
                </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
