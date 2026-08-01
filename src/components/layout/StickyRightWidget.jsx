import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  QrCode,
  ShoppingCart,
  Sparkles,
  Bot,
  FileText,
  ChevronUp,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const StickyRightWidget = () => {
  const {
    cart,
    setIsAuthModalOpen,
    setIsSpinWheelOpen,
    setIsRfqModalOpen,
    setIsChatbotOpen,
    setIsCheckoutOpen
  } = useApp();

  const [showBackToTop, setShowBackToTop] = useState(false);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 bottom-8 z-40 flex flex-col items-center space-y-2 select-none">
      
      {/* 1. Quick Profile / Login Modal Trigger */}
      <button
        onClick={() => setIsAuthModalOpen(true)}
        title="Account & Login"
        className="w-11 h-11 bg-white hover:bg-orange-50 text-gray-700 hover:text-taobao-orange rounded-full shadow-lg border border-gray-200 flex flex-col items-center justify-center transition-all group relative"
      >
        <User className="w-5 h-5" />
        <span className="text-[9px] font-bold">Profile</span>
        <div className="absolute right-14 bg-gray-900 text-white text-[11px] px-2 py-1 rounded shadow-md hidden group-hover:block whitespace-nowrap">
          Sign In / QR Scan
        </div>
      </button>

      {/* 2. QR Code Login Trigger */}
      <button
        onClick={() => setIsAuthModalOpen(true)}
        title="Bsmart Mobile QR Scan"
        className="w-11 h-11 bg-white hover:bg-orange-50 text-gray-700 hover:text-taobao-orange rounded-full shadow-lg border border-gray-200 flex flex-col items-center justify-center transition-all group relative"
      >
        <QrCode className="w-5 h-5 text-taobao-orange" />
        <span className="text-[9px] font-bold">QR Login</span>
        <div className="absolute right-14 bg-gray-900 text-white text-[11px] px-2 py-1 rounded shadow-md hidden group-hover:block whitespace-nowrap">
          Scan QR Code via App
        </div>
      </button>

      {/* 3. Spin Wheel Coupon Launcher */}
      <button
        onClick={() => setIsSpinWheelOpen(true)}
        title="Spin the Wheel Coupon"
        className="w-11 h-11 bg-gradient-to-tr from-amber-400 to-yellow-500 text-gray-900 rounded-full shadow-lg flex flex-col items-center justify-center transition-transform hover:scale-110 group relative animate-pulse"
      >
        <Sparkles className="w-5 h-5 text-gray-900" />
        <span className="text-[9px] font-black">Lucky</span>
        <div className="absolute right-14 bg-gray-900 text-amber-300 font-bold text-[11px] px-2 py-1 rounded shadow-md hidden group-hover:block whitespace-nowrap">
          🎁 Spin Wheel Discounts!
        </div>
      </button>

      {/* 4. Cart Quick Access Button */}
      <button
        onClick={() => setIsCheckoutOpen(true)}
        title="View Cart & 1-Click Checkout"
        className="w-11 h-11 bg-taobao-orange hover:bg-taobao-darkOrange text-white rounded-full shadow-xl flex flex-col items-center justify-center transition-all relative group"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="text-[9px] font-bold">Cart</span>
        {totalCartItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
            {totalCartItems}
          </span>
        )}
        <div className="absolute right-14 bg-gray-900 text-white text-[11px] px-2 py-1 rounded shadow-md hidden group-hover:block whitespace-nowrap">
          Checkout ({totalCartItems} items)
        </div>
      </button>

      {/* 5. AI Assistant Launcher Button */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        title="AI Sales Assistant"
        className="w-11 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-xl flex flex-col items-center justify-center transition-all hover:scale-105 group relative"
      >
        <Bot className="w-5 h-5" />
        <span className="text-[9px] font-bold">AI Assistant</span>
        <span className="absolute -top-1 -left-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <div className="absolute right-14 bg-gray-900 text-white text-[11px] px-2 py-1 rounded shadow-md hidden group-hover:block whitespace-nowrap">
          🤖 Ask AI Fitment & Solar Sizing
        </div>
      </button>

      {/* 6. Request B2B Quote Button */}
      <button
        onClick={() => setIsRfqModalOpen(true)}
        title="Request B2B Quote"
        className="w-11 h-11 bg-white hover:bg-blue-50 text-blue-700 rounded-full shadow-lg border border-blue-200 flex flex-col items-center justify-center transition-all group relative"
      >
        <FileText className="w-5 h-5 text-blue-600" />
        <span className="text-[9px] font-bold">RFQ Quote</span>
        <div className="absolute right-14 bg-gray-900 text-white text-[11px] px-2 py-1 rounded shadow-md hidden group-hover:block whitespace-nowrap">
          Bulk Order Custom RFQ
        </div>
      </button>

      {/* 7. Scroll to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          title="Back to Top"
          aria-label="Back to Top"
          className="w-11 h-11 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center transition-all animate-fadeIn"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

    </div>
  );
};
