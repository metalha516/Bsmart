import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, X, Send, Sparkles, User, ShoppingCart, ArrowRight } from 'lucide-react';
import { AI_SUGGESTION_CHIPS, generateAiResponse } from '../../data/chatbotKnowledge';
import { PRODUCTS } from '../../data/productsData';

export const AiChatbot = () => {
  const {
    isChatbotOpen,
    setIsChatbotOpen,
    activeCategoryKey,
    addToCart,
    setSelectedProduct,
    setIsRfqModalOpen
  } = useApp();

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hello! I am your **Bsmart AI Sales Assistant**. I can help you find vehicle fitment parts, size solar PV systems, recommend cosmetics, or calculate B2B container quotes. How can I assist you?",
      suggestedProductId: null
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isChatbotOpen) return null;

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate AI response
    setTimeout(() => {
      const aiReply = generateAiResponse(textToSend, activeCategoryKey);
      setMessages((prev) => [...prev, { sender: 'ai', ...aiReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[540px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slideUp">
      
      {/* Chatbot Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-4 flex items-center justify-between shadow">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white shadow">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm flex items-center gap-1">
              Bsmart AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </h3>
            <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online | Fitment & Solar AI
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsChatbotOpen(false)}
          title="Close AI Assistant"
          aria-label="Close AI Assistant"
          className="text-white/80 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/70 text-xs">
        {messages.map((msg, idx) => {
          const matchedProduct = msg.suggestedProductId
            ? PRODUCTS.find((p) => p.id === msg.suggestedProductId)
            : null;

          return (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold shadow">
                  AI
                </div>
              )}

              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-taobao-orange text-white rounded-tr-none font-medium'
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm space-y-2'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                {/* Suggested Product Card inside AI Bubble */}
                {matchedProduct && (
                  <div className="mt-2 bg-orange-50 border border-orange-200 p-2.5 rounded-xl flex items-center justify-between gap-2">
                    <img
                      src={matchedProduct.image}
                      alt={matchedProduct.title}
                      className="w-10 h-10 object-cover rounded-lg border border-orange-200 flex-shrink-0"
                    />
                    <div className="flex-1 truncate">
                      <span className="font-extrabold text-[11px] text-gray-900 truncate block">
                        {matchedProduct.title}
                      </span>
                      <span className="text-[10px] font-bold text-taobao-orange">
                        ${matchedProduct.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(matchedProduct, 1)}
                      className="bg-taobao-orange hover:bg-taobao-darkOrange text-white p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow flex-shrink-0"
                    >
                      <ShoppingCart className="w-3 h-3" /> Add
                    </button>
                  </div>
                )}

                {/* RFQ Action */}
                {msg.action === 'openRfq' && (
                  <button
                    onClick={() => setIsRfqModalOpen(true)}
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg text-[11px] font-bold flex items-center justify-center space-x-1 shadow"
                  >
                    <span>Request Custom B2B Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-gray-800 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold shadow">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Suggestion Chips */}
      <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap scrollbar-none text-[10px]">
        {AI_SUGGESTION_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold px-2.5 py-1 rounded-full border border-blue-200 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask AI car part fitment, solar setup, cosmetics..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="w-full text-xs border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-600"
        />
        <button
          onClick={() => handleSendMessage()}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl shadow transition-colors flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
