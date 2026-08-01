import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, Send, Building, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RfqModal = () => {
  const { isRfqModalOpen, setIsRfqModalOpen } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [incoterm, setIncoterm] = useState('FOB');

  if (!isRfqModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsRfqModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 relative">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-extrabold text-sm">Request B2B Factory Quote (RFQ)</h2>
              <p className="text-[11px] text-blue-200">Direct OEM / ODM Container Wholesale Supplier Quotes</p>
            </div>
          </div>

          <button
            onClick={() => setIsRfqModalOpen(false)}
            title="Close"
            aria-label="Close"
            className="text-white/80 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-extrabold text-gray-900">RFQ Submitted to China Factory!</h3>
              <p className="text-xs text-gray-500">Our B2B Trade Specialists will email your customized Proforma Invoice within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-extrabold text-gray-700 mb-1">Company / Enterprise Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Energy Solutions Ltd."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-gray-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-gray-700 mb-1">Preferred Incoterm</label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    aria-label="Preferred Incoterm"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="FOB">FOB Guangzhou Port</option>
                    <option value="CIF">CIF Chittagong / Port</option>
                    <option value="EXW">EXW Factory China</option>
                    <option value="DDP">DDP Delivered Duty Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-gray-700 mb-1">Product Specification & Target Quantity</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Specify SKU, custom OEM branding logo, target quantity (e.g. 500x Solar Inverters + 1000x Brake Pads)..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl flex items-center justify-between text-[11px] text-blue-900">
                <span className="flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Guaranteed Direct China Wholesale Pricing
                </span>
                <span className="font-bold text-blue-700">Verified Suppliers</span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-1.5 text-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit RFQ Quote Request</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
