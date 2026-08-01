import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, ShoppingCart, ShieldCheck, Flame, Layers, Truck, FileText, CheckCircle2 } from 'lucide-react';
import { FrequentlyBoughtTogether } from './FrequentlyBoughtTogether';

export const ProductDetailModal = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    userMode,
    addToCart,
    formatPrice,
    getB2bPrice,
    setIsRfqModalOpen,
    setIsCheckoutOpen
  } = useApp();

  const [quantity, setQuantity] = useState(selectedProduct?.moq || 1);

  if (!selectedProduct) return null;

  const unitPrice = userMode === 'B2B'
    ? getB2bPrice(selectedProduct, quantity)
    : selectedProduct.price;

  const totalPrice = unitPrice * quantity;

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setIsCheckoutOpen(true);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          title="Close Modal"
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="p-6 lg:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Product Image Box */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-80 object-cover"
                />

                {selectedProduct.stock <= 5 && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow animate-pulse">
                    🔥 Scarcity Alert: Only {selectedProduct.stock} items left!
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.tags.map((tag, idx) => (
                  <span key={idx} className="bg-orange-100 text-orange-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Details & Pricing Column */}
            <div className="space-y-4">
              <div>
                <span className="text-xs text-taobao-orange font-bold uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 mt-1">{selectedProduct.title}</h2>
              </div>

              {/* Rating & Sales */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-gray-400 font-normal ml-1">({selectedProduct.reviewsCount} reviews)</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600 font-semibold">{selectedProduct.salesCount.toLocaleString()} Verified Sales</span>
              </div>

              {/* Price Box */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-200 space-y-1">
                <span className="text-xs text-gray-500 font-bold block">
                  {userMode === 'B2B' ? 'Calculated Wholesale Price per Unit:' : 'Retail Price:'}
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-taobao-orange">
                    {formatPrice(unitPrice)}
                  </span>
                  {selectedProduct.originalPrice > unitPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* B2B Tier Pricing Table */}
              {userMode === 'B2B' && selectedProduct.b2bTiers && (
                <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-200 text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold text-blue-900">
                    <span>Wholesale Volume Discount Tiers</span>
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded">MOQ: {selectedProduct.moq} pcs</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {selectedProduct.b2bTiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl border text-center font-semibold ${
                          quantity >= tier.min && (!tier.max || quantity <= tier.max)
                            ? 'bg-blue-600 text-white border-blue-700 shadow'
                            : 'bg-white text-gray-700 border-blue-200'
                        }`}
                      >
                        <div>{tier.min} - {tier.max || '+'} pcs</div>
                        <div className="font-extrabold text-xs">${tier.price.toFixed(2)} / unit</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicle Fitment Info */}
              {selectedProduct.fitment && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span>Guaranteed Exact Vehicle Fitment:</span>
                    <span className="block font-extrabold text-emerald-800">
                      {selectedProduct.fitment.make} {selectedProduct.fitment.model} ({selectedProduct.fitment.years.join(', ')})
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity Selector & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 font-bold hover:bg-gray-100 text-gray-700 text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-extrabold text-sm text-gray-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 font-bold hover:bg-gray-100 text-gray-700 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 font-bold">
                    Subtotal: <strong className="text-taobao-orange">{formatPrice(totalPrice)}</strong>
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, quantity);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-taobao-orange to-taobao-red text-white py-3 rounded-2xl font-extrabold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Shopping Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-2xl font-extrabold text-xs shadow-lg transition-all"
                  >
                    1-Click Buy Now
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Full Specification Matrix */}
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <h3 className="font-extrabold text-sm text-gray-900">Technical Specifications &amp; Factory Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(selectedProduct.specs).map(([key, val]) => (
                <div key={key} className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex justify-between">
                  <span className="text-gray-500 font-medium">{key}:</span>
                  <span className="font-bold text-gray-900">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Bought Together Bundle Cross-Sell */}
          <FrequentlyBoughtTogether currentProduct={selectedProduct} />

        </div>

      </div>
    </div>
  );
};
