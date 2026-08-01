import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Star, ShieldCheck, Flame, Layers, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    userMode,
    addToCart,
    formatPrice,
    getB2bPrice,
    setSelectedProduct,
    setIsRfqModalOpen
  } = useApp();

  const displayPrice = userMode === 'B2B'
    ? getB2bPrice(product, product.moq || 1)
    : product.price;

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer select-none"
    >
      <div>
        {/* Product Image Box */}
        <div className="relative overflow-hidden bg-gray-100 h-48 sm:h-52">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Tag */}
          <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
            {product.category}
          </span>

          {/* Mode Specific Tag */}
          {userMode === 'B2B' ? (
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
              MOQ: {product.moq} pcs
            </span>
          ) : (
            product.originalPrice > product.price && (
              <span className="absolute top-2 right-2 bg-taobao-red text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )
          )}

          {/* Scarcity FOMO Warning */}
          {product.stock <= 5 && (
            <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 shadow animate-pulse">
              <Flame className="w-3 h-3 fill-white" /> Only {product.stock} left in stock!
            </div>
          )}

          {/* Quick View Overlay Button */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              className="bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-taobao-orange hover:text-white transition-colors flex items-center space-x-1"
            >
              <Eye className="w-4 h-4" />
              <span>Quick Inspect</span>
            </button>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-4 space-y-2">
          {/* Fitment or Skin Type Badge */}
          {product.fitment && (
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded inline-block">
              🚗 Fitment: {product.fitment.make} {product.fitment.model} ({product.fitment.years[0]}+)
            </span>
          )}
          {product.skinType && (
            <span className="text-[10px] bg-pink-50 text-pink-700 font-bold px-2 py-0.5 rounded inline-block">
              ✨ Skin: {product.skinType}
            </span>
          )}

          <h3 className="font-extrabold text-xs text-gray-900 line-clamp-2 group-hover:text-taobao-orange transition-colors">
            {product.title}
          </h3>

          {/* Ratings & Sales Count */}
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal ml-1">({product.reviewsCount})</span>
            </div>
            <span className="font-semibold">{product.salesCount.toLocaleString()} sold</span>
          </div>

          {/* B2B Tier Pricing Table Preview */}
          {userMode === 'B2B' && product.b2bTiers && (
            <div className="bg-blue-50/70 p-2 rounded-lg border border-blue-100 text-[10px] space-y-1 my-1">
              <div className="font-bold text-blue-900 flex items-center justify-between">
                <span>Tiered Volume Pricing</span>
                <span className="text-[9px] text-blue-600">Factory Direct</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[9px] text-gray-700 font-medium">
                {product.b2bTiers.slice(0, 2).map((tier, idx) => (
                  <div key={idx} className="bg-white p-1 rounded border border-blue-200">
                    {tier.min}-{tier.max ? tier.max : '+'} pcs: <strong className="text-blue-700">${tier.price.toFixed(2)}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Price & Add Button */}
      <div className="p-4 pt-0 flex items-center justify-between">
        <div>
          {userMode === 'B2C' && (
            <span className="text-[10px] text-gray-400 line-through block">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <div className="flex items-baseline space-x-1">
            <span className={`text-lg font-black ${userMode === 'B2B' ? 'text-blue-700' : 'text-taobao-orange'}`}>
              {formatPrice(displayPrice)}
            </span>
            {userMode === 'B2B' && <span className="text-[10px] text-gray-500 font-bold">/ unit</span>}
          </div>
        </div>

        {userMode === 'B2B' ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.moq);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-bold shadow transition-all flex items-center space-x-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Bulk Order</span>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="bg-gradient-to-r from-taobao-orange to-taobao-red hover:brightness-110 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow transition-all flex items-center space-x-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};
