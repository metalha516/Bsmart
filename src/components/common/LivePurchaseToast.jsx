import React, { useState, useEffect } from 'react';
import { MOCK_NOTIFICATIONS } from '../../data/productsData';
import { ShoppingCart, Flame, X } from 'lucide-react';

export const LivePurchaseToast = () => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentNotification(MOCK_NOTIFICATIONS[index]);
      setVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setVisible(false);
      }, 4000);

      index = (index + 1) % MOCK_NOTIFICATIONS.length;
    }, 9000); // Trigger every 9 seconds

    return () => clearInterval(interval);
  }, []);

  if (!currentNotification || !visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs bg-gray-900 text-white p-3 rounded-2xl shadow-2xl border border-taobao-orange/40 flex items-center space-x-3 animate-slideUp select-none">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-taobao-orange to-taobao-red flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow">
        <ShoppingCart className="w-4 h-4" />
      </div>

      <div className="flex-1 text-[11px] leading-tight">
        <div className="flex items-center justify-between">
          <span className="font-bold text-amber-300">{currentNotification.user} ({currentNotification.city})</span>
          <span className="text-[9px] text-gray-400">{currentNotification.time}</span>
        </div>
        <p className="text-gray-200 mt-0.5 font-medium line-clamp-1">{currentNotification.action}</p>
        <span className="text-emerald-400 font-extrabold text-[10px] block mt-0.5">{currentNotification.amount}</span>
      </div>

      <button
        onClick={() => setVisible(false)}
        title="Close notification"
        aria-label="Close notification"
        className="text-gray-400 hover:text-white p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
