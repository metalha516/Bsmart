import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/productsData';
import { Car, Sparkles, Smartphone, Sun, ChevronRight, Filter, CheckCircle2 } from 'lucide-react';

export const LeftCategorySidebar = () => {
  const {
    activeCategoryKey,
    setActiveCategoryKey,
    setCurrentView,
    vehicleFitment,
    setVehicleFitment
  } = useApp();

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const getCategoryIcon = (key) => {
    switch (key) {
      case 'car-parts': return <Car className="w-4 h-4 text-orange-500" />;
      case 'cosmetics': return <Sparkles className="w-4 h-4 text-pink-500" />;
      case 'electronics': return <Smartphone className="w-4 h-4 text-blue-500" />;
      case 'solar-energy': return <Sun className="w-4 h-4 text-amber-500" />;
      default: return null;
    }
  };

  return (
    <aside className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-3 select-none relative">
      {/* Category Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
        <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-taobao-orange" /> Category Directory
        </h3>
        <span className="text-[10px] bg-orange-100 text-taobao-orange font-bold px-1.5 py-0.5 rounded">
          Bsmart Market
        </span>
      </div>

      {/* Main Categories List */}
      <div className="space-y-1">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onMouseEnter={() => setHoveredCategory(cat.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="relative"
          >
            <button
              onClick={() => {
                setActiveCategoryKey(cat.id);
                setCurrentView('home');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategoryKey === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'hover:bg-orange-50 text-gray-700 hover:text-taobao-orange'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                {getCategoryIcon(cat.id)}
                <span className="truncate">{cat.name}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Rich Hover Mega-Menu Fly-Out */}
            {hoveredCategory === cat.id && (
              <div className="hidden lg:block absolute left-full top-0 ml-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 animate-fadeIn">
                <h4 className="font-extrabold text-gray-900 text-xs pb-2 border-b border-gray-100 flex items-center gap-1.5">
                  {getCategoryIcon(cat.id)}
                  <span>{cat.name} Subcategories</span>
                </h4>

                <div className="mt-3 space-y-2">
                  <div className="grid grid-cols-1 gap-1.5">
                    {cat.subcategories.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveCategoryKey(cat.id);
                          setCurrentView('home');
                        }}
                        className="text-left text-xs text-gray-600 hover:text-taobao-orange hover:font-bold py-1 px-2 rounded hover:bg-orange-50 transition-colors flex items-center justify-between"
                      >
                        <span>{sub}</span>
                        <span className="text-[10px] text-gray-400">Direct Factory</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-gray-500 block mb-1.5">Popular Filters:</span>
                    <div className="flex flex-wrap gap-1">
                      {cat.popularTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded-full hover:bg-orange-100 hover:text-taobao-orange cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vehicle Fitment Finder Box (Car Parts Category Specific) */}
      <div className="mt-4 pt-3 border-t border-gray-200 bg-orange-50/60 rounded-lg p-3 border border-orange-100">
        <div className="flex items-center space-x-1.5 mb-2 text-taobao-orange">
          <Car className="w-4 h-4" />
          <h4 className="font-extrabold text-xs">Vehicle Fitment Selector</h4>
        </div>
        <p className="text-[10px] text-gray-500 mb-2">Filter guaranteed exact-fit car parts</p>

        <div className="space-y-1.5">
          <select
            value={vehicleFitment.make}
            onChange={(e) => setVehicleFitment({ ...vehicleFitment, make: e.target.value })}
            aria-label="Select Car Make"
            className="w-full bg-white text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none"
          >
            <option value="">Select Make (e.g. Toyota)</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Nissan">Nissan</option>
            <option value="BMW">BMW</option>
            <option value="Universal">Universal</option>
          </select>

          <select
            value={vehicleFitment.model}
            onChange={(e) => setVehicleFitment({ ...vehicleFitment, model: e.target.value })}
            aria-label="Select Car Model"
            className="w-full bg-white text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none"
          >
            <option value="">Select Model (e.g. Corolla)</option>
            <option value="Corolla">Corolla</option>
            <option value="Civic">Civic</option>
            <option value="Camry">Camry</option>
            <option value="H4/H7/H11/9005">LED Universal Bulb Fit</option>
          </select>

          <select
            value={vehicleFitment.year}
            onChange={(e) => setVehicleFitment({ ...vehicleFitment, year: e.target.value })}
            aria-label="Select Car Year"
            className="w-full bg-white text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none"
          >
            <option value="">Select Year (2016-2023)</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>

          {vehicleFitment.make && vehicleFitment.model && (
            <div className="bg-emerald-100 text-emerald-800 text-[10px] p-1.5 rounded flex items-center gap-1 font-bold mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Filtering for {vehicleFitment.make} {vehicleFitment.model}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
