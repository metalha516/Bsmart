import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Truck, CreditCard, Headphones, Award } from 'lucide-react';

export const Footer = () => {
  const { setCurrentView, setActiveCategoryKey } = useApp();

  return (
    <footer className="bg-gray-900 text-white mt-12 border-t border-gray-800 text-xs select-none">
      
      {/* Trust Badges Ribbon */}
      <div className="bg-gray-800/80 border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-taobao-orange/20 text-taobao-orange flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-100">Verified Factory Supply</h4>
              <p className="text-[11px] text-gray-400">Direct China manufacturer audit</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-100">Express Global Freight</h4>
              <p className="text-[11px] text-gray-400">Air express &amp; Sea container loading</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-100">Secure Alipay Escrow</h4>
              <p className="text-[11px] text-gray-400">bKash, Cards &amp; B2B Wire Transfer</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-100">10-Year Quality Guarantee</h4>
              <p className="text-[11px] text-gray-400">ISO9001 / CE / E-Mark Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-taobao-orange text-white flex items-center justify-center font-black text-lg">
              B
            </div>
            <span className="text-base font-extrabold tracking-tight">
              BSMART<span className="text-taobao-orange">GLOBAL</span>
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            The world's premier direct-from-China e-commerce marketplace for B2C retail shoppers and enterprise B2B bulk wholesalers.
          </p>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-gray-200 text-sm uppercase tracking-wider">Product Directory</h4>
          <ul className="space-y-1.5 text-gray-400">
            <li>
              <button onClick={() => { setActiveCategoryKey('car-parts'); setCurrentView('home'); }} className="hover:text-taobao-orange">
                Car Parts &amp; Accessories
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveCategoryKey('cosmetics'); setCurrentView('home'); }} className="hover:text-taobao-orange">
                Cosmetics &amp; Personal Care
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveCategoryKey('electronics'); setCurrentView('home'); }} className="hover:text-taobao-orange">
                Electronic Devices &amp; Gadgets
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveCategoryKey('solar-energy'); setCurrentView('home'); }} className="hover:text-taobao-orange">
                Solar Panels &amp; Green Energy
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Special Portals */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-gray-200 text-sm uppercase tracking-wider">Enterprise &amp; Tools</h4>
          <ul className="space-y-1.5 text-gray-400">
            <li>
              <button
                onClick={() => {
                  const target = window.location.protocol === 'file:' ? '../Solar/index.html' : '/Solar/index.html';
                  window.open(target, '_blank');
                }}
                className="hover:text-amber-400 font-bold text-amber-400"
              >
                ☀️ Solar Solutions Calculator Hub
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('analytics-dashboard')} className="hover:text-emerald-400 font-bold text-emerald-400">
                📊 10-Year ML Analytics Dashboard
              </button>
            </li>
            <li>
              <span className="text-gray-400">Custom OEM / ODM Branding</span>
            </li>
            <li>
              <span className="text-gray-400">Direct Container Freight Tracking</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Support */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-gray-200 text-sm uppercase tracking-wider">Direct Contact</h4>
          <p className="text-gray-400">Guangzhou Trade Logistics Park, Guangdong, China</p>
          <p className="text-gray-400">Email: support@taobao-global-supply.com</p>
          <p className="text-gray-400">Hotline: +86 20 8899 7700 / +880 9612 000000</p>
        </div>

      </div>

      <div className="bg-black py-4 text-center text-gray-500 text-[11px] border-t border-gray-800">
        © 2026 Bsmart Direct-from-China Global Supply Marketplace. All rights reserved.
      </div>
    </footer>
  );
};
