import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/productsData';
import { Flame, Clock, ShoppingCart, Zap, ArrowRight } from 'lucide-react';

export const FlashSales = () => {
  const { addToCart, formatPrice, setSelectedProduct, userMode, getB2bPrice } = useApp();

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = PRODUCTS.filter((p) => p.flashSale);

  return (
    <div className="bg-gradient-to-r from-red-600 via-taobao-red to-taobao-orange rounded-2xl p-5 text-white shadow-xl select-none">
      
      {/* Header with Countdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/20">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-white text-taobao-red flex items-center justify-center font-extrabold shadow animate-bounce">
            <Flame className="w-5 h-5 fill-taobao-red" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight uppercase flex items-center gap-1.5">
              Bsmart Flash Deals &amp; Crazy Sales
            </h2>
            <p className="text-xs text-red-100 font-medium">Limited Quantities Direct From Factory • Up to 60% OFF</p>
          </div>
        </div>

        {/* Timer Box */}
        <div className="flex items-center space-x-1 text-xs font-black">
          <Clock className="w-4 h-4 text-amber-300 mr-1" />
          <span className="text-red-100 mr-1">Ends In:</span>
          <span className="bg-black/40 text-amber-300 px-2 py-1 rounded-md font-mono text-sm shadow border border-white/10">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-black/40 text-amber-300 px-2 py-1 rounded-md font-mono text-sm shadow border border-white/10">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-black/40 text-amber-300 px-2 py-1 rounded-md font-mono text-sm shadow border border-white/10">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Flash Product Cards Carousel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {flashProducts.map((product) => {
          const displayPrice = userMode === 'B2B'
            ? getB2bPrice(product, product.moq)
            : product.price;

          return (
            <div
              key={product.id}
              className="bg-white text-gray-900 rounded-xl p-3 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div>
                <div className="relative overflow-hidden rounded-lg mb-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-taobao-red text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>

                  {/* Scarcity Low Stock Alert */}
                  {product.stock <= 5 && (
                    <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded">
                      Only {product.stock} items left!
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-xs text-gray-900 line-clamp-1 group-hover:text-taobao-orange transition-colors">
                  {product.title}
                </h3>

                {/* Progress Bar */}
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                    <span>Sold {product.soldPercentage}%</span>
                    <span className="text-taobao-red font-black">Fast Selling</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-taobao-orange to-taobao-red h-full rounded-full"
                      style={{ width: `${product.soldPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 line-through block">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-base font-black text-taobao-red">
                    {formatPrice(displayPrice)}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1);
                  }}
                  className="bg-gradient-to-r from-taobao-orange to-taobao-red hover:brightness-110 text-white p-2 rounded-lg text-xs font-bold shadow flex items-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
