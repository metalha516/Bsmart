import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/productsData';
import { Plus, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';

export const FrequentlyBoughtTogether = ({ currentProduct }) => {
  const { addToCart, formatPrice, setIsCheckoutOpen } = useApp();

  if (!currentProduct || !currentProduct.bundleIds || currentProduct.bundleIds.length === 0) {
    return null;
  }

  const bundleItems = PRODUCTS.filter((p) => currentProduct.bundleIds.includes(p.id));
  const fullBundle = [currentProduct, ...bundleItems];

  const totalOriginalPrice = fullBundle.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscountPrice = totalOriginalPrice * 0.85; // 15% bundle discount
  const savings = totalOriginalPrice - bundleDiscountPrice;

  const handleAddBundleToCart = () => {
    fullBundle.forEach((item) => addToCart(item, 1));
    setIsCheckoutOpen(true);
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl p-5 border border-orange-200 shadow-sm space-y-4 my-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-taobao-orange" />
        <h3 className="font-extrabold text-sm text-gray-900">
          Frequently Bought Together (Save 15% Bundle Discount)
        </h3>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Bundle Items Cards */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {fullBundle.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div className="bg-white p-2.5 rounded-xl border border-gray-200 w-36 flex-shrink-0 text-center space-y-1 shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-20 object-cover rounded-lg" />
                <h4 className="text-[11px] font-extrabold text-gray-900 truncate">{item.title}</h4>
                <span className="text-xs font-black text-taobao-orange block">{formatPrice(item.price)}</span>
              </div>

              {idx < fullBundle.length - 1 && (
                <div className="text-taobao-orange font-bold text-lg flex-shrink-0">+</div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bundle Price & Add Button */}
        <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm text-center md:text-right space-y-2 flex-shrink-0">
          <div>
            <span className="text-xs text-gray-500 block">Bundle Price ({fullBundle.length} items):</span>
            <span className="text-xs text-gray-400 line-through mr-2">{formatPrice(totalOriginalPrice)}</span>
            <span className="text-lg font-black text-taobao-red">{formatPrice(bundleDiscountPrice)}</span>
          </div>

          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md inline-block">
            🎁 Save {formatPrice(savings)} with 1-Click Multi-Add
          </span>

          <button
            onClick={handleAddBundleToCart}
            className="w-full bg-gradient-to-r from-taobao-orange to-taobao-red text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add 3-Item Bundle to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
