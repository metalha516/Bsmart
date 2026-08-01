import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/productsData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userMode, setUserMode] = useState('B2C'); // 'B2C' or 'B2B'
  const [currency, setCurrency] = useState('USD'); // 'USD', 'BDT', 'RMB'
  const [currentView, setCurrentView] = useState('home'); // 'home', 'solar-hub', 'analytics-dashboard'
  const [activeCategoryKey, setActiveCategoryKey] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart & Orders
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Modals & Drawers
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Vehicle Finder State
  const [vehicleFitment, setVehicleFitment] = useState({ make: '', model: '', year: '' });

  // Show Spin-Wheel on initial load after 3 seconds if not spun
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSpun = localStorage.getItem('hasSpunWheel');
      if (!hasSpun) {
        setIsSpinWheelOpen(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const exchangeRates = {
    USD: { rate: 1, symbol: '$', code: 'USD' },
    BDT: { rate: 118, symbol: '৳', code: 'BDT' },
    RMB: { rate: 7.25, symbol: '¥', code: 'RMB' }
  };

  const formatPrice = (priceInUsd) => {
    const { rate, symbol } = exchangeRates[currency];
    const val = (priceInUsd * rate).toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
    return `${symbol}${val}`;
  };

  const getB2bPrice = (product, quantity) => {
    if (!product.b2bTiers || product.b2bTiers.length === 0) return product.price;
    let unitPrice = product.price;
    for (const tier of product.b2bTiers) {
      if (quantity >= tier.min) {
        unitPrice = tier.price;
      }
    }
    return unitPrice;
  };

  const addToCart = (product, qty = 1) => {
    const reqQty = userMode === 'B2B' ? Math.max(qty, product.moq || 1) : qty;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + reqQty;
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQty }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: reqQty }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const cartSubtotal = cart.reduce((sum, item) => {
    const unitPrice = userMode === 'B2B'
      ? getB2bPrice(item.product, item.quantity)
      : item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discount) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <AppContext.Provider
      value={{
        userMode,
        setUserMode,
        currency,
        setCurrency,
        currentView,
        setCurrentView,
        activeCategoryKey,
        setActiveCategoryKey,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartSubtotal,
        discountAmount,
        cartTotal,
        appliedCoupon,
        setAppliedCoupon,
        formatPrice,
        getB2bPrice,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSpinWheelOpen,
        setIsSpinWheelOpen,
        isRfqModalOpen,
        setIsRfqModalOpen,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isChatbotOpen,
        setIsChatbotOpen,
        selectedProduct,
        setSelectedProduct,
        vehicleFitment,
        setVehicleFitment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
