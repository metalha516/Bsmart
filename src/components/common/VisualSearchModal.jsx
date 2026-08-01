import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Camera, Upload, Sparkles, CheckCircle } from 'lucide-react';

export const VisualSearchModal = () => {
  const { isVisualSearchOpen, setIsVisualSearchOpen, setSearchQuery, setCurrentView } = useApp();
  const [analyzing, setAnalyzing] = useState(false);

  if (!isVisualSearchOpen) return null;

  const handleSelectSample = (keyword) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setSearchQuery(keyword);
      setCurrentView('home');
      setIsVisualSearchOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 relative">
        
        {/* Modal Header */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-taobao-orange" />
            <h2 className="font-extrabold text-sm">Bsmart Visual Image Search</h2>
          </div>

          <button
            onClick={() => setIsVisualSearchOpen(false)}
            title="Close"
            aria-label="Close"
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Box */}
        <div className="p-6 text-center space-y-4">
          {analyzing ? (
            <div className="py-12 space-y-3">
              <Sparkles className="w-12 h-12 text-taobao-orange mx-auto animate-spin" />
              <h3 className="text-base font-extrabold text-gray-900">AI Visual Recognition Matching...</h3>
              <p className="text-xs text-gray-500">Scanning 1,000,000+ factory product images in China database</p>
            </div>
          ) : (
            <>
              <div className="border-2 border-dashed border-taobao-orange/60 bg-orange-50/50 rounded-2xl p-8 hover:bg-orange-50 transition-all cursor-pointer group">
                <Upload className="w-10 h-10 text-taobao-orange mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-extrabold text-gray-900 mt-2">Drop an image here or click to upload</h3>
                <p className="text-xs text-gray-500 mt-1">Upload product photos or car part diagrams for instant AI match</p>
              </div>

              <div>
                <span className="text-xs font-extrabold text-gray-700 block mb-2">Or test with a sample image:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleSelectSample('Brake Pads')}
                    className="p-2 bg-gray-50 hover:bg-orange-100 hover:text-taobao-orange border border-gray-200 rounded-lg text-left font-bold transition-all"
                  >
                    🚗 Car Brake Pad Photo
                  </button>
                  <button
                    onClick={() => handleSelectSample('Solar Panel')}
                    className="p-2 bg-gray-50 hover:bg-amber-100 hover:text-amber-800 border border-gray-200 rounded-lg text-left font-bold transition-all"
                  >
                    ☀️ Solar Panel Kit Photo
                  </button>
                  <button
                    onClick={() => handleSelectSample('Niacinamide')}
                    className="p-2 bg-gray-50 hover:bg-pink-100 hover:text-pink-800 border border-gray-200 rounded-lg text-left font-bold transition-all"
                  >
                    ✨ Cosmetic Serum Bottle
                  </button>
                  <button
                    onClick={() => handleSelectSample('Headphones')}
                    className="p-2 bg-gray-50 hover:bg-blue-100 hover:text-blue-800 border border-gray-200 rounded-lg text-left font-bold transition-all"
                  >
                    🎧 Wireless Headset Photo
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
