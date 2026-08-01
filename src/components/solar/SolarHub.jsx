import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Zap, Battery, Calculator, ArrowRight, ShieldCheck, CheckCircle2, ShoppingCart, FileText } from 'lucide-react';
import { PRODUCTS } from '../../data/productsData';

export const SolarHub = () => {
  const { addToCart, formatPrice, setIsRfqModalOpen, setIsCheckoutOpen } = useApp();

  // Appliance Counter State
  const [appliances, setAppliances] = useState({
    ac: 1, // 1.5-ton AC (~1500W)
    fridge: 1, // Refrigerator (~250W)
    fans: 4, // Ceiling Fans (~75W each)
    lights: 8, // LED Bulbs (~15W each)
    tv: 1, // Smart TV (~100W)
    pump: 0 // Water Pump (~750W)
  });

  // Calculate System Metrics
  const totalWatts =
    appliances.ac * 1500 +
    appliances.fridge * 250 +
    appliances.fans * 75 +
    appliances.lights * 15 +
    appliances.tv * 100 +
    appliances.pump * 750;

  const dailyKwh = ((totalWatts * 8) / 1000).toFixed(1); // 8 hours avg peak use
  const inverterKw = Math.ceil((totalWatts * 1.25) / 1000); // 25% safety margin
  const panelCount = Math.ceil((totalWatts * 1.3) / 550); // 550W panels
  const batteryKwh = (dailyKwh * 0.8).toFixed(1);
  const annualSavingsUsd = Math.round(dailyKwh * 365 * 0.15); // $0.15/kWh avg rate

  const handleUpdateAppliance = (key, delta) => {
    setAppliances((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  const handleAddSolarKitToCart = () => {
    // Add Solar Panel (550W), Inverter (5.5kW), and LiFePO4 Battery
    const panel = PRODUCTS.find((p) => p.id === 'solar-01');
    const inverter = PRODUCTS.find((p) => p.id === 'solar-02');
    const battery = PRODUCTS.find((p) => p.id === 'solar-03');

    if (panel) addToCart(panel, panelCount);
    if (inverter) addToCart(inverter, 1);
    if (battery) addToCart(battery, 1);

    setIsCheckoutOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 animate-fadeIn">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-white p-8 lg:p-12 shadow-2xl">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="bg-black/30 backdrop-blur-md text-amber-200 border border-amber-300/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
            <Sun className="w-4 h-4 text-amber-300" /> Direct China Solar Supply Hub
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Smart Solar Power Calculator & Green Energy Marketplace
          </h1>
          <p className="text-sm text-amber-100 font-medium">
            Calculate exact solar capacity, inverter sizing, and lithium battery banks for home or commercial factory installations. Buy Tier-1 solar kits at direct China wholesale prices.
          </p>
        </div>

        <div className="absolute right-4 bottom-0 opacity-20 pointer-events-none hidden lg:block">
          <Sun className="w-96 h-96 text-white animate-spin-slow" />
        </div>
      </div>

      {/* Main Interactive Solar Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">Interactive Household & Commercial Load Sizer</h2>
            <p className="text-xs text-gray-500">Adjust appliance quantities below to dynamically calculate system requirements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Appliance Counter Inputs (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">1. Select Appliances</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* AC */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                  <span className="font-bold text-gray-900 block">1.5 Ton Inverter AC</span>
                  <span className="text-[10px] text-gray-500">~1500W per unit</span>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white px-2 py-1">
                  <button onClick={() => handleUpdateAppliance('ac', -1)} className="font-bold text-gray-600 px-1">-</button>
                  <span className="font-bold text-amber-600 px-1">{appliances.ac}</span>
                  <button onClick={() => handleUpdateAppliance('ac', 1)} className="font-bold text-gray-600 px-1">+</button>
                </div>
              </div>

              {/* Refrigerator */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                  <span className="font-bold text-gray-900 block">Double Door Refrigerator</span>
                  <span className="text-[10px] text-gray-500">~250W continuous</span>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white px-2 py-1">
                  <button onClick={() => handleUpdateAppliance('fridge', -1)} className="font-bold text-gray-600 px-1">-</button>
                  <span className="font-bold text-amber-600 px-1">{appliances.fridge}</span>
                  <button onClick={() => handleUpdateAppliance('fridge', 1)} className="font-bold text-gray-600 px-1">+</button>
                </div>
              </div>

              {/* Ceiling Fans */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                  <span className="font-bold text-gray-900 block">Ceiling / Stand Fans</span>
                  <span className="text-[10px] text-gray-500">~75W per unit</span>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white px-2 py-1">
                  <button onClick={() => handleUpdateAppliance('fans', -1)} className="font-bold text-gray-600 px-1">-</button>
                  <span className="font-bold text-amber-600 px-1">{appliances.fans}</span>
                  <button onClick={() => handleUpdateAppliance('fans', 1)} className="font-bold text-gray-600 px-1">+</button>
                </div>
              </div>

              {/* LED Lights */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                  <span className="font-bold text-gray-900 block">LED Bulbs & Tube Lights</span>
                  <span className="text-[10px] text-gray-500">~15W per bulb</span>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white px-2 py-1">
                  <button onClick={() => handleUpdateAppliance('lights', -1)} className="font-bold text-gray-600 px-1">-</button>
                  <span className="font-bold text-amber-600 px-1">{appliances.lights}</span>
                  <button onClick={() => handleUpdateAppliance('lights', 1)} className="font-bold text-gray-600 px-1">+</button>
                </div>
              </div>

              {/* Smart TV */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                  <span className="font-bold text-gray-900 block">55" Smart TV / Desktop PC</span>
                  <span className="text-[10px] text-gray-500">~100W unit</span>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white px-2 py-1">
                  <button onClick={() => handleUpdateAppliance('tv', -1)} className="font-bold text-gray-600 px-1">-</button>
                  <span className="font-bold text-amber-600 px-1">{appliances.tv}</span>
                  <button onClick={() => handleUpdateAppliance('tv', 1)} className="font-bold text-gray-600 px-1">+</button>
                </div>
              </div>

              {/* Water Pump */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                  <span className="font-bold text-gray-900 block">1 HP Water Pump</span>
                  <span className="text-[10px] text-gray-500">~750W surge</span>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white px-2 py-1">
                  <button onClick={() => handleUpdateAppliance('pump', -1)} className="font-bold text-gray-600 px-1">-</button>
                  <span className="font-bold text-amber-600 px-1">{appliances.pump}</span>
                  <button onClick={() => handleUpdateAppliance('pump', 1)} className="font-bold text-gray-600 px-1">+</button>
                </div>
              </div>

            </div>
          </div>

          {/* Results Sizing Summary Card (Right col) */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">2. System Output Calculation</h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400">Total Peak Wattage:</span>
                  <span className="font-extrabold text-base text-white">{totalWatts} Watts</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400">Est. Daily Consumption:</span>
                  <span className="font-bold text-amber-300">{dailyKwh} kWh / day</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400">Recommended Inverter:</span>
                  <span className="font-bold text-emerald-400">{inverterKw}kW Hybrid Inverter</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400">550W Solar Panels Needed:</span>
                  <span className="font-bold text-amber-400">{panelCount}x Tier-1 Panels</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400">Lithium Battery Storage:</span>
                  <span className="font-bold text-blue-400">{batteryKwh} kWh LiFePO4</span>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-[11px] text-amber-300 font-semibold">
                  🌱 Estimated Electricity Savings: <strong className="text-white font-extrabold">${annualSavingsUsd}/year</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddSolarKitToCart}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 py-3 rounded-xl font-black text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Customized Solar Kit to Cart</span>
              </button>

              <button
                onClick={() => setIsRfqModalOpen(true)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl font-bold text-xs border border-gray-700 flex items-center justify-center space-x-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Request B2B Factory Wholesale Quote</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Recommended Pre-Packaged Solar Kits */}
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-4">Complete Factory-Direct Solar Kits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.filter((p) => p.categoryKey === 'solar-energy').map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <img src={item.image} alt={item.title} className="w-full h-44 object-cover rounded-xl mb-3" />
                <span className="bg-amber-100 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                  {item.category}
                </span>
                <h3 className="font-extrabold text-sm text-gray-900 mt-2 line-clamp-2">{item.title}</h3>
                
                <div className="mt-3 space-y-1 text-xs text-gray-600">
                  {Object.entries(item.specs).slice(0, 3).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-gray-500 font-medium">{k}:</span>
                      <span className="font-bold text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                  <div className="text-lg font-black text-taobao-orange">{formatPrice(item.price)}</div>
                </div>

                <button
                  onClick={() => addToCart(item, 1)}
                  className="bg-taobao-orange hover:bg-taobao-darkOrange text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
