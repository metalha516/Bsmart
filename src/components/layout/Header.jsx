import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Camera,
  ShoppingCart,
  User,
  ShieldCheck,
  FileText,
  Sparkles,
  Car,
  Sparkles as MakeupIcon,
  Smartphone,
  Sun,
  BarChart3
} from 'lucide-react';
import { CATEGORIES } from '../../data/productsData';

export const Header = () => {
  const {
    userMode,
    currentView,
    setCurrentView,
    activeCategoryKey,
    setActiveCategoryKey,
    searchQuery,
    setSearchQuery,
    cart,
    cartTotal,
    formatPrice,
    setIsAuthModalOpen,
    setIsRfqModalOpen,
    setIsVisualSearchOpen,
    setIsCheckoutOpen
  } = useApp();

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const getCategoryIcon = (key) => {
    switch (key) {
      case 'car-parts': return <Car className="w-4 h-4 text-orange-500" />;
      case 'cosmetics': return <MakeupIcon className="w-4 h-4 text-pink-500" />;
      case 'electronics': return <Smartphone className="w-4 h-4 text-blue-500" />;
      case 'solar-energy': return <Sun className="w-4 h-4 text-amber-500" />;
      default: return null;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo & Platform Name */}
          <div
            onClick={() => {
              setCurrentView('home');
              setActiveCategoryKey('all');
            }}
            className="flex items-center space-x-2 cursor-pointer select-none group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-taobao-orange to-taobao-red flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:scale-105 transition-transform">
              B
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                  BSMART
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${userMode === 'B2B' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-orange-100 text-orange-800 border border-orange-200'
                  }`}>
                  {userMode} Mode
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Direct-from-China Verified Suppliers</p>
            </div>
          </div>

          {/* Search Bar Block */}
          <div className="flex-1 max-w-2xl mx-2">
            <div className="relative flex items-center shadow-sm">
              {/* Category Dropdown Selector inside Search */}
              <select
                value={activeCategoryKey}
                onChange={(e) => {
                  setActiveCategoryKey(e.target.value);
                  if (currentView !== 'home') setCurrentView('home');
                }}
                aria-label="Filter by Category"
                className="bg-gray-100 border-2 border-r-0 border-taobao-orange text-gray-700 text-xs rounded-l-lg px-3 py-2.5 focus:outline-none hidden md:block cursor-pointer font-medium"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Main Text Input Wrapper */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={
                    userMode === 'B2B'
                      ? 'Search bulk car parts, solar panels, electronics by SKU or model...'
                      : 'Search 10,000+ factory products, car parts, cosmetics, solar panels...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-r-0 border-taobao-orange px-4 py-2 text-sm text-gray-800 focus:outline-none rounded-l-lg md:rounded-l-none pr-10"
                />

                {/* Visual Search Camera Icon inside search input box */}
                <button
                  type="button"
                  onClick={() => setIsVisualSearchOpen(true)}
                  title="Search by image upload (Visual Search)"
                  aria-label="Search by image upload"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-taobao-orange p-1 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Search Submit Button */}
              <button
                onClick={() => {
                  if (currentView !== 'home') setCurrentView('home');
                }}
                className="bg-gradient-to-r from-taobao-orange to-taobao-red text-white px-6 py-2.5 rounded-r-lg font-bold text-sm flex items-center space-x-1.5 hover:brightness-110 transition-all flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            {/* Quick Trending Keyword Tags */}
            <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-gray-500 overflow-hidden">
              <span className="font-semibold text-gray-700 flex-shrink-0">Trending:</span>
              <button
                onClick={() => { setSearchQuery('Brake Pads'); setActiveCategoryKey('car-parts'); setCurrentView('home'); }}
                className="hover:text-taobao-orange hover:underline truncate"
              >
                Corolla Brake Pads
              </button>
              <span>|</span>
              <button
                onClick={() => { setSearchQuery('Solar Panel'); setActiveCategoryKey('solar-energy'); setCurrentView('home'); }}
                className="hover:text-taobao-orange hover:underline truncate"
              >
                550W Tier-1 Solar
              </button>
              <span>|</span>
              <button
                onClick={() => { setSearchQuery('Niacinamide'); setActiveCategoryKey('cosmetics'); setCurrentView('home'); }}
                className="hover:text-taobao-orange hover:underline truncate"
              >
                Niacinamide Serum
              </button>
              <span>|</span>
              <button
                onClick={() => { setSearchQuery('Headphones'); setActiveCategoryKey('electronics'); setCurrentView('home'); }}
                className="hover:text-taobao-orange hover:underline truncate hidden sm:inline"
              >
                ANC Headphones
              </button>
            </div>
          </div>

          {/* User Account & Cart Controls */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Quick B2B RFQ Button */}
            {userMode === 'B2B' && (
              <button
                onClick={() => setIsRfqModalOpen(true)}
                className="hidden lg:flex items-center space-x-1.5 bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100 px-3 py-2 rounded-lg font-semibold text-xs transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Request B2B Quote</span>
              </button>
            )}

            {/* User Login Profile Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center space-x-1.5 text-gray-700 hover:text-taobao-orange p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-left hidden lg:block text-xs">
                <span className="block font-semibold text-gray-800">Account</span>
                <span className="block text-[10px] text-gray-500">Login / Register</span>
              </div>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="relative flex items-center space-x-2 bg-gradient-to-r from-taobao-orange to-taobao-red text-white px-4 py-2 rounded-lg shadow font-semibold text-xs hover:brightness-110 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartItems > 0 && (
                <span className="bg-white text-taobao-red text-[11px] font-extrabold px-1.5 py-0.2 rounded-full shadow">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Navigation Category Ribbon */}
        <div className="mt-3 border-t border-gray-100 pt-2 flex items-center justify-between text-xs font-semibold text-gray-700 overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => {
                setActiveCategoryKey('all');
                setCurrentView('home');
              }}
              className={`pb-1 transition-colors border-b-2 ${activeCategoryKey === 'all' && currentView === 'home'
                  ? 'border-taobao-orange text-taobao-orange font-bold'
                  : 'border-transparent hover:text-taobao-orange'
                }`}
            >
              🔥 All Featured Products
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryKey(cat.id);
                  setCurrentView('home');
                }}
                className={`flex items-center space-x-1.5 pb-1 transition-colors border-b-2 ${activeCategoryKey === cat.id && currentView === 'home'
                    ? 'border-taobao-orange text-taobao-orange font-bold'
                    : 'border-transparent hover:text-taobao-orange'
                  }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Hub Redirection Badges */}
          <div className="hidden lg:flex items-center space-x-3 text-[11px]">
            <button
              onClick={() => {
                const target = window.location.protocol === 'file:' ? '../Solar/index.html' : `${import.meta.env.BASE_URL}Solar/index.html`;
                window.open(target, '_blank');
              }}
              className="text-amber-700 font-bold bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1 transition-all"
            >
              <Sun className="w-3.5 h-3.5 text-amber-600" /> Solar Sizing Calculator
            </button>
            <button
              onClick={() => setCurrentView('analytics-dashboard')}
              className="text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1 transition-all"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" /> 10-Yr Forecast Engine
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
