import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, Sun, BarChart3, Globe, Flame } from 'lucide-react';

export const AnnouncementBar = () => {
  const {
    userMode,
    setUserMode,
    currency,
    setCurrency,
    currentView,
    setCurrentView,
    setIsSpinWheelOpen
  } = useApp();

  return (
    <div className="bg-gray-900 text-white text-xs py-1.5 px-4 border-b border-gray-800 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Promo Ticker */}
        <div className="flex items-center space-x-3 overflow-hidden">
          <span className="bg-taobao-orange text-white px-2 py-0.5 rounded font-bold text-[10px] uppercase flex items-center gap-1 animate-pulse">
            <Flame className="w-3 h-3" /> Double 11 Deal
          </span>
          <p className="truncate text-gray-300">
            🔥 Direct-from-Factory China Wholesale | Free Freight Inspection on Orders &gt; $500!
          </p>
          <button
            onClick={() => setIsSpinWheelOpen(true)}
            className="text-amber-400 font-semibold underline hover:text-amber-300 flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> Spin Wheel Coupon
          </button>
        </div>

        {/* Right Controls: Mode Toggle, Solar Link, Analytics, Currency */}
        <div className="flex items-center space-x-4">
          {/* View / Mode Toggles */}
          <div className="flex items-center bg-gray-800 rounded-lg p-0.5 border border-gray-700">
            <button
              onClick={() => {
                setUserMode('B2C');
                if (currentView !== 'home') setCurrentView('home');
              }}
              className={`px-2.5 py-0.5 rounded-md font-medium transition-all ${
                userMode === 'B2C' && currentView === 'home'
                  ? 'bg-taobao-orange text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Retail (B2C)
            </button>
            <button
              onClick={() => {
                setUserMode('B2B');
                if (currentView !== 'home') setCurrentView('home');
              }}
              className={`px-2.5 py-0.5 rounded-md font-medium transition-all ${
                userMode === 'B2B' && currentView === 'home'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Wholesale (B2B)
            </button>
          </div>

          {/* Solar Hub Nav Link */}
          <button
            onClick={() => {
              const target = window.location.protocol === 'file:' ? '../Solar/index.html' : '/Solar/index.html';
              window.open(target, '_blank');
            }}
            className={`flex items-center space-x-1 font-semibold px-2 py-0.5 rounded-md transition-all text-amber-400 hover:text-amber-300`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Solar Solutions</span>
          </button>

          {/* Admin Analytics Link */}
          <button
            onClick={() => setCurrentView('analytics-dashboard')}
            className={`flex items-center space-x-1 font-semibold px-2 py-0.5 rounded-md transition-all ${
              currentView === 'analytics-dashboard'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>10-Yr ML Analytics</span>
          </button>

          {/* Currency Dropdown */}
          <div className="flex items-center space-x-1 text-gray-300">
            <Globe className="w-3.5 h-3.5" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Currency"
              className="bg-gray-800 text-white rounded px-1.5 py-0.5 border border-gray-700 focus:outline-none cursor-pointer text-xs"
            >
              <option value="USD">$ USD</option>
              <option value="BDT">৳ BDT</option>
              <option value="RMB">¥ RMB</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
