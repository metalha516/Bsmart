import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, QrCode, Phone, Key, ShieldCheck, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';

export const LoginModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState('qr'); // 'qr', 'otp', 'password'

  // OTP State
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 6) {
      setOtpSent(true);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsAuthModalOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          title="Close Modal"
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 p-1.5 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-taobao-orange to-taobao-red text-white p-6 text-center relative">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center font-extrabold text-2xl mb-2">
            B
          </div>
          <h2 className="text-xl font-extrabold">Bsmart Global Portal Login</h2>
          <p className="text-xs text-orange-100 mt-1">Access B2C Retail Deals & B2B Direct Factory Pricing</p>

          {/* Top Tabs Bar */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center space-x-1 transition-all ${
                activeTab === 'qr' ? 'bg-white text-taobao-orange shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Code Scan</span>
            </button>
            <button
              onClick={() => setActiveTab('otp')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center space-x-1 transition-all ${
                activeTab === 'otp' ? 'bg-white text-taobao-orange shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Mobile OTP</span>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center space-x-1 transition-all ${
                activeTab === 'password' ? 'bg-white text-taobao-orange shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Account Pass</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-6">
          {isLoggedIn ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-extrabold text-gray-900">Authentication Successful!</h3>
              <p className="text-xs text-gray-500">Welcome to Bsmart Direct Wholesale & Retail Market.</p>
            </div>
          ) : (
            <>
              {/* 1. QR Code Login Tab */}
              {activeTab === 'qr' && (
                <div className="text-center py-4 space-y-4">
                  <div className="inline-block p-4 bg-gradient-to-tr from-orange-50 to-amber-50 rounded-2xl border-2 border-dashed border-taobao-orange shadow-inner relative group">
                    {/* Simulated QR Pattern */}
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BSMART-AUTHENTICATE-2026-TOKEN-998877"
                      alt="Bsmart App Scan QR Code"
                      className="w-44 h-44 mx-auto rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white text-xs font-bold p-2">
                      Scan with Bsmart / AliPay App
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 flex items-center justify-center gap-1">
                      <Smartphone className="w-4 h-4 text-taobao-orange" /> Scan with Bsmart Mobile App
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">Open Bsmart App &gt; Tap QR Icon in top search bar &gt; Scan to log in</p>
                  </div>
                </div>
              )}

              {/* 2. Mobile OTP Tab */}
              {activeTab === 'otp' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4 py-2">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 mb-1">Mobile Phone Number</label>
                    <div className="flex">
                      <select aria-label="Country Code" className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-2 text-xs font-bold text-gray-700">
                        <option value="+880">🇧🇩 +880</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+971">🇦🇪 +971</option>
                      </select>
                      <input
                        type="tel"
                        required
                        placeholder="1712345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-r-lg px-3 py-2 text-xs focus:outline-none focus:border-taobao-orange"
                      />
                    </div>
                  </div>

                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full bg-taobao-orange hover:bg-taobao-darkOrange text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow"
                    >
                      Send 6-Digit SMS Verification Code
                    </button>
                  ) : (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="bg-emerald-50 text-emerald-800 p-2 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>OTP code sent to +880 {phone} (Demo Code: 123456)</span>
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-gray-700 mb-1">Enter 6-Digit Verification Code</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="123456"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center text-base tracking-widest font-mono font-bold focus:outline-none focus:border-taobao-orange"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-taobao-orange to-taobao-red text-white py-2.5 rounded-lg text-xs font-extrabold shadow hover:brightness-110 transition-all flex items-center justify-center space-x-1"
                      >
                        <span>Verify & Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </form>
              )}

              {/* 3. Password Account Tab */}
              {activeTab === 'password' && (
                <form onSubmit={handleLoginSubmit} className="space-y-3 py-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Account ID / Email / Phone</label>
                    <input
                      type="text"
                      required
                      placeholder="user@taobao.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-taobao-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-taobao-orange"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-taobao-orange to-taobao-red text-white py-2.5 rounded-lg text-xs font-extrabold shadow hover:brightness-110 transition-all"
                  >
                    Log In
                  </button>
                </form>
              )}
            </>
          )}

          {/* Footer Security Badge */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Alipay 256-Bit SSL Encrypted
            </span>
            <button className="text-gray-500 hover:text-taobao-orange underline">Need Help?</button>
          </div>
        </div>

      </div>
    </div>
  );
};
