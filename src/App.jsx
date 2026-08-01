import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { LeftCategorySidebar } from './components/layout/LeftCategorySidebar';
import { StickyRightWidget } from './components/layout/StickyRightWidget';
import { Footer } from './components/layout/Footer';
import { ProductGrid } from './components/products/ProductGrid';
import { FlashSales } from './components/products/FlashSales';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { SolarHub } from './components/solar/SolarHub';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { LoginModal } from './components/auth/LoginModal';
import { SpinWheelModal } from './components/gamification/SpinWheelModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { RfqModal } from './components/b2b/RfqModal';
import { VisualSearchModal } from './components/common/VisualSearchModal';
import { LivePurchaseToast } from './components/common/LivePurchaseToast';
import { AiChatbot } from './components/chatbot/AiChatbot';
import { Sparkles, Sun, Car, ShieldCheck, Flame, ChevronRight, ArrowRight } from 'lucide-react';

const MainContent = () => {
  const { currentView, setCurrentView, setActiveCategoryKey } = useApp();

  // Hero Slider Banners
  const banners = [
    {
      id: 1,
      title: 'Double 11 Global Wholesale Carnival',
      subtitle: 'Direct China Manufacturer Prices on Car Parts, Electronics & Cosmetics',
      bg: 'from-orange-600 via-red-600 to-taobao-orange',
      category: 'all'
    },
    {
      id: 2,
      title: 'Solar Solutions & Green Energy Portal',
      subtitle: 'Tier-1 550W Panels, 5.5kW Hybrid Inverters & LiFePO4 Battery Banks',
      bg: 'from-amber-600 via-yellow-600 to-amber-500',
      category: 'solar-energy'
    },
    {
      id: 3,
      title: 'OEM Car Parts & Fitment Guaranteed',
      subtitle: 'Ceramic Brake Pads, LED Headlight Kits & Android CarPlay Units',
      bg: 'from-gray-900 via-gray-800 to-blue-900',
      category: 'car-parts'
    }
  ];

  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <AnnouncementBar />
        <Header />

        {/* Main View Router */}
        <main className="pb-12">
          {currentView === 'solar-hub' && <SolarHub />}
          {currentView === 'analytics-dashboard' && <AnalyticsDashboard />}
          {currentView === 'home' && (
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
              
              {/* Top Hero Layout: Left Sidebar + Center Slider Banner + Right Profile Widget */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left Sidebar (3 Cols) */}
                <div className="lg:col-span-3">
                  <LeftCategorySidebar />
                </div>

                {/* Hero Banner Slider (6 Cols) */}
                <div className="lg:col-span-6 flex flex-col space-y-4">
                  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${banners[activeBanner].bg} text-white p-6 sm:p-8 h-64 flex flex-col justify-between shadow-lg transition-all duration-700`}>
                    <div className="space-y-2 z-10">
                      <span className="bg-black/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1 border border-white/20">
                        <Flame className="w-3 h-3 text-amber-300" /> Featured Direct Supply
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                        {banners[activeBanner].title}
                      </h2>
                      <p className="text-xs text-white/90 font-medium line-clamp-2">
                        {banners[activeBanner].subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between z-10 pt-2">
                      <button
                        onClick={() => {
                          if (banners[activeBanner].category !== 'all') {
                            setActiveCategoryKey(banners[activeBanner].category);
                          }
                        }}
                        className="bg-white text-gray-900 hover:bg-taobao-orange hover:text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center space-x-1"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex space-x-1.5">
                        {banners.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveBanner(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-2 rounded-full transition-all ${
                              activeBanner === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2 Quick Highlight Banners below Hero */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => {
                        const target = window.location.protocol === 'file:' ? '../Solar/index.html' : `${import.meta.env.BASE_URL}Solar/index.html`;
                        window.open(target, '_blank');
                      }}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] bg-black/20 text-white font-extrabold px-2 py-0.5 rounded">SOLAR HUB</span>
                        <h4 className="font-extrabold text-xs mt-1">Solar PV &amp; Battery Sizing</h4>
                        <p className="text-[10px] text-gray-800 font-medium">Interactive kW calculator &gt;</p>
                      </div>
                      <Sun className="w-8 h-8 text-gray-900/80" />
                    </div>

                    <div
                      onClick={() => setCurrentView('analytics-dashboard')}
                      className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] bg-white/20 text-white font-extrabold px-2 py-0.5 rounded">RETAILER ADMIN</span>
                        <h4 className="font-extrabold text-xs mt-1">10-Yr ML Analytics</h4>
                        <p className="text-[10px] text-emerald-100 font-medium">Predictive demand forecast &gt;</p>
                      </div>
                      <Sparkles className="w-8 h-8 text-emerald-200" />
                    </div>
                  </div>
                </div>

                {/* Right Profile & Factory Guarantee Widget (3 Cols) */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-taobao-orange to-taobao-red text-white font-black text-2xl mx-auto flex items-center justify-center shadow-md">
                      B
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs text-gray-900">Hi, Welcome to Bsmart Global!</h3>
                      <p className="text-[11px] text-gray-500">Sign in for exclusive member prices &amp; RFQ tracking</p>
                    </div>

                    <div className="flex space-x-2 pt-1">
                      <button
                        onClick={() => useApp().setIsAuthModalOpen(true)}
                        className="flex-1 bg-taobao-orange hover:bg-taobao-darkOrange text-white py-2 rounded-xl text-xs font-bold shadow transition-all"
                      >
                        Log In
                      </button>
                      <button
                        onClick={() => useApp().setIsAuthModalOpen(true)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl text-xs font-bold border border-gray-300 transition-all"
                      >
                        Register
                      </button>
                    </div>
                  </div>

                  {/* Guaranteed Factory Perks Card */}
                  <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-2xl p-4 shadow-sm space-y-2 text-xs">
                    <h4 className="font-extrabold text-amber-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-amber-400" /> Factory Direct Assurance
                    </h4>
                    <ul className="space-y-1.5 text-[11px] text-gray-300 font-medium">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-taobao-orange rounded-full"></span> 100% Pre-Shipment Inspection
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-taobao-orange rounded-full"></span> Tiered B2B Volume Pricing
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-taobao-orange rounded-full"></span> Fast Sea &amp; Air Door Freight
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* Flash Sales Section */}
              <FlashSales />

              {/* Main Product Catalog Grid */}
              <ProductGrid />

            </div>
          )}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <StickyRightWidget />
      <LoginModal />
      <SpinWheelModal />
      <CheckoutModal />
      <RfqModal />
      <VisualSearchModal />
      <AiChatbot />
      <ProductDetailModal />
      <LivePurchaseToast />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
