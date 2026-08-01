import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import {
  HISTORICAL_TEN_YEAR_DATA,
  MONTHLY_SALES_TREND,
  ML_PREDICTIVE_FORECAST,
  ML_RECOMMENDATIONS
} from '../../data/analyticsData';
import { BarChart3, TrendingUp, AlertTriangle, Cpu, DollarSign, Package, ShieldCheck, ArrowRight } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState('historical'); // 'historical', 'monthly', 'ml-forecast'

  // Summary Metrics
  const total2026YtdRevenue = "$38.5M";
  const yearOverYearGrowth = "+33.2%";
  const avgOrderValue = "$113.00";
  const totalB2bPercentage = "65%";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 animate-fadeIn">
      
      {/* Dashboard Top Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-6 lg:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" /> AI Machine Learning Sales Engine
          </span>
          <h1 className="text-2xl lg:text-3xl font-black mt-2">
            10-Year Historical Sales Analytics & ML Demand Forecast
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time supply chain predictive analytics for B2C Retailers & B2B Wholesalers (2016 – 2027)
          </p>
        </div>

        <button
          onClick={() => setCurrentView('home')}
          className="bg-taobao-orange hover:bg-taobao-darkOrange text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center space-x-1.5 self-start md:self-auto"
        >
          <span>Return to Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">2026 YTD Revenue</span>
            <span className="text-2xl font-black text-gray-900">{total2026YtdRevenue}</span>
            <span className="text-[11px] text-emerald-600 font-bold block mt-1">↑ {yearOverYearGrowth} YoY Growth</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-taobao-orange flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">B2B Wholesale Share</span>
            <span className="text-2xl font-black text-gray-900">{totalB2bPercentage}</span>
            <span className="text-[11px] text-blue-600 font-bold block mt-1">Bulk Container Shipments</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Average Order Value (AOV)</span>
            <span className="text-2xl font-black text-gray-900">{avgOrderValue}</span>
            <span className="text-[11px] text-gray-500 font-bold block mt-1">Up from $88 in 2016</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Top Category (2026)</span>
            <span className="text-2xl font-black text-amber-600">Solar Energy</span>
            <span className="text-[11px] text-amber-700 font-bold block mt-1">High-Margin Growth</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Interactive Analytics Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-3 gap-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('historical')}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all ${
                activeTab === 'historical'
                  ? 'bg-taobao-orange text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📊 10-Year Historical Sales (2016-2026)
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all ${
                activeTab === 'monthly'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📅 Category Sales Breakdown (2025-2026)
            </button>
            <button
              onClick={() => setActiveTab('ml-forecast')}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all ${
                activeTab === 'ml-forecast'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🤖 ML Demand Forecast (2026-2027)
            </button>
          </div>

          <span className="text-xs text-gray-500 font-semibold">
            Data Source: Taobao Direct Factory ERP Database
          </span>
        </div>

        {/* Chart View 1: 10-Year Historical Trend */}
        {activeTab === 'historical' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-gray-900">Historical Annual Revenue ($ Millions) & B2B vs B2C Growth</h3>
              <div className="flex items-center space-x-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-taobao-orange rounded"></span> Revenue ($M)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-600 rounded"></span> B2B Share (%)</span>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HISTORICAL_TEN_YEAR_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#FF5000" name="Revenue ($M)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="b2bShare" fill="#2563EB" name="B2B Wholesale Share (%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Chart View 2: Monthly Category Breakdown */}
        {activeTab === 'monthly' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-extrabold text-sm text-gray-900">Monthly Product Category Revenue Stack ($ Thousands)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_SALES_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="solarEnergy" stackId="a" fill="#F59E0B" name="Solar Energy ($K)" />
                  <Bar dataKey="carParts" stackId="a" fill="#FF5000" name="Car Parts ($K)" />
                  <Bar dataKey="electronics" stackId="a" fill="#3B82F6" name="Electronics ($K)" />
                  <Bar dataKey="cosmetics" stackId="a" fill="#EC4899" name="Cosmetics ($K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Chart View 3: ML Demand Forecasting */}
        {activeTab === 'ml-forecast' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-extrabold text-sm text-gray-900">Machine Learning Predictive Demand Curves (Quarterly 2026-2027)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ML_PREDICTIVE_FORECAST} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="predictedDemand" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} name="Predicted Demand Units" />
                  <Area type="monotone" dataKey="actualDemand" stroke="#10B981" fill="#10B981" fillOpacity={0.4} name="Actual Demand Units" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>

      {/* Machine Learning Stock-Out Risk Alerts & Inventory Recommendations Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-base text-gray-900">
            ML Inventory Replenishment & Stock-Out Warning Recommendations
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-extrabold uppercase">
                <th className="p-3">SKU</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">30-Day ML Demand</th>
                <th className="p-3">Stockout Days Left</th>
                <th className="p-3">Suggested Reorder</th>
                <th className="p-3">Margin</th>
                <th className="p-3">ML Risk Status Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {ML_RECOMMENDATIONS.map((row) => (
                <tr key={row.sku} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-gray-800">{row.sku}</td>
                  <td className="p-3 font-bold text-gray-900">{row.productName}</td>
                  <td className="p-3 font-extrabold text-gray-700">{row.currentStock} pcs</td>
                  <td className="p-3 font-extrabold text-purple-700">{row.predictedDemand30d} pcs</td>
                  <td className="p-3 font-extrabold text-red-600">{row.stockoutDays} Days</td>
                  <td className="p-3 font-bold text-emerald-700">+{row.suggestedReorder} pcs</td>
                  <td className="p-3 font-extrabold text-gray-900">{row.profitMargin}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                      row.riskTag.includes('CRITICAL')
                        ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse'
                        : row.riskTag.includes('REPLENISHMENT')
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {row.riskTag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
