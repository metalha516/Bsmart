import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, CreditCard, Phone, ArrowRight, Tag } from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    cartTotal,
    appliedCoupon,
    formatPrice,
    userMode,
    getB2bPrice
  } = useApp();

  const [step, setStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100 relative">
        
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-taobao-orange" />
            <h2 className="font-extrabold text-sm">
              {step === 'cart' && 'Your Shopping Cart & Order Review'}
              {step === 'checkout' && '1-Click Fast OTP Checkout'}
              {step === 'success' && 'Order Confirmed!'}
            </h2>
            <span className="text-[10px] bg-taobao-orange text-white px-2 py-0.5 rounded font-bold">
              {userMode} Mode
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            title="Close"
            aria-label="Close"
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {step === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-extrabold text-gray-900">Order Placed Successfully!</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Thank you for shopping on Bsmart Global. Order ID <span className="font-mono font-bold text-gray-800">#BS-2026-99812</span> has been assigned. Direct China factory dispatch is being processed.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl max-w-sm mx-auto text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping Address:</span>
                  <span className="font-semibold text-gray-800">{address || 'Dhaka, Bangladesh'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Paid:</span>
                  <span className="font-bold text-taobao-orange">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Status:</span>
                  <span className="font-bold text-emerald-600">VERIFIED VIA OTP</span>
                </div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="bg-taobao-orange hover:bg-taobao-darkOrange text-white px-8 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Cart Review */}
              {step === 'cart' && (
                <div>
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 space-y-2">
                      <ShoppingBag className="w-12 h-12 mx-auto text-gray-300" />
                      <p className="text-sm font-semibold">Your cart is currently empty.</p>
                      <p className="text-xs text-gray-400">Explore car parts, solar kits, cosmetics, and gadgets!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => {
                        const unitPrice = userMode === 'B2B'
                          ? getB2bPrice(item.product, item.quantity)
                          : item.product.price;
                        return (
                          <div
                            key={item.product.id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.product.image}
                                alt={item.product.title}
                                className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                              />
                              <div>
                                <h4 className="font-extrabold text-gray-900 line-clamp-1">{item.product.title}</h4>
                                <span className="text-[10px] text-gray-500 block">{item.product.category}</span>
                                {userMode === 'B2B' && item.quantity < item.product.moq && (
                                  <span className="text-[10px] text-red-600 font-bold block">
                                    ⚠️ Below MOQ of {item.product.moq} pcs
                                  </span>
                                )}
                                <span className="font-bold text-taobao-orange text-xs mt-1 block">
                                  {formatPrice(unitPrice)} / unit
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              {/* Quantity Adjuster */}
                              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                  aria-label="Decrease quantity"
                                  className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-3 py-1 font-bold text-gray-800">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                  className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                title="Remove Item"
                                aria-label="Remove Item"
                                className="text-gray-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {/* Coupon Banner */}
                      {appliedCoupon && (
                        <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-amber-900 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <Tag className="w-4 h-4 text-amber-600" />
                            Applied Coupon: <strong className="font-mono">{appliedCoupon.code}</strong> ({appliedCoupon.discount}% OFF)
                          </span>
                          <span className="text-emerald-600 font-bold">-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: 1-Click Checkout Form */}
              {step === 'checkout' && (
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="bg-orange-50/70 border border-orange-200 p-3 rounded-xl text-xs text-orange-900">
                    <p className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-taobao-orange" /> Instant 1-Click Mobile Checkout
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5">No password required. Instant OTP authentication minimizes checkout delays.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone (OTP Verification)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-taobao-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Address</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Enter full shipping address, district, postal code..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-taobao-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Select Payment Method</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`p-2.5 rounded-lg border text-left font-bold transition-all ${
                          paymentMethod === 'bkash'
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        🇧🇩 bKash / Nagad Instant
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-lg border text-left font-bold transition-all ${
                          paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        💳 Credit Card (Visa/Master)
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2.5 rounded-lg border text-left font-bold transition-all ${
                          paymentMethod === 'cod'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        💵 Cash on Delivery
                      </button>

                      {userMode === 'B2B' && (
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('wire')}
                          className={`p-2.5 rounded-lg border text-left font-bold transition-all ${
                            paymentMethod === 'wire'
                              ? 'border-amber-500 bg-amber-50 text-amber-800'
                              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          🏦 B2B Letter of Credit / Wire
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-taobao-orange to-taobao-red text-white py-3 rounded-xl font-black text-sm shadow-xl hover:brightness-110 transition-all"
                  >
                    Confirm & Send OTP Order ({formatPrice(cartTotal)})
                  </button>
                </form>
              )}
            </>
          )}

        </div>

        {/* Footer Pricing Summary */}
        {step !== 'success' && cart.length > 0 && (
          <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-500 block">Total Due ({cart.length} items):</span>
              <span className="text-lg font-black text-taobao-orange">{formatPrice(cartTotal)}</span>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="bg-gradient-to-r from-taobao-orange to-taobao-red text-white px-6 py-2.5 rounded-xl font-extrabold shadow-md hover:brightness-110 transition-all flex items-center space-x-1"
              >
                <span>Proceed to 1-Click Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setStep('cart')}
                className="text-gray-600 hover:text-gray-900 font-bold underline"
              >
                Back to Cart
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
