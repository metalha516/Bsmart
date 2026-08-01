// 10-Year Historical Sales Data (2016 - 2026)
export const HISTORICAL_TEN_YEAR_DATA = [
  { year: '2016', revenue: 1.25, orders: 14200, b2cShare: 75, b2bShare: 25, aov: 88, topCategory: 'Electronics' },
  { year: '2017', revenue: 1.80, orders: 21500, b2cShare: 72, b2bShare: 28, aov: 83, topCategory: 'Electronics' },
  { year: '2018', revenue: 2.65, orders: 32000, b2cShare: 68, b2bShare: 32, aov: 82, topCategory: 'Cosmetics' },
  { year: '2019', revenue: 3.90, orders: 45800, b2cShare: 65, b2bShare: 35, aov: 85, topCategory: 'Car Parts' },
  { year: '2020', revenue: 5.40, orders: 68900, b2cShare: 60, b2bShare: 40, aov: 78, topCategory: 'Electronics' },
  { year: '2021', revenue: 7.80, orders: 94200, b2cShare: 55, b2bShare: 45, aov: 82, topCategory: 'Solar Energy' },
  { year: '2022', revenue: 11.20, orders: 128000, b2cShare: 50, b2bShare: 50, aov: 87, topCategory: 'Solar Energy' },
  { year: '2023', revenue: 15.60, orders: 165000, b2cShare: 45, b2bShare: 55, aov: 94, topCategory: 'Solar Energy' },
  { year: '2024', revenue: 21.40, orders: 210000, b2cShare: 42, b2bShare: 58, aov: 101, topCategory: 'Car Parts' },
  { year: '2025', revenue: 28.90, orders: 275000, b2cShare: 38, b2bShare: 62, aov: 105, topCategory: 'Solar Energy' },
  { year: '2026 (YTD)', revenue: 38.50, orders: 340000, b2cShare: 35, b2bShare: 65, aov: 113, topCategory: 'Solar Energy' }
];

// Monthly 2025-2026 Breakdown
export const MONTHLY_SALES_TREND = [
  { month: 'Jan', carParts: 240, cosmetics: 180, electronics: 310, solarEnergy: 520, total: 1250 },
  { month: 'Feb', carParts: 220, cosmetics: 195, electronics: 290, solarEnergy: 580, total: 1285 },
  { month: 'Mar', carParts: 290, cosmetics: 230, electronics: 340, solarEnergy: 740, total: 1600 },
  { month: 'Apr', carParts: 310, cosmetics: 260, electronics: 380, solarEnergy: 890, total: 1840 },
  { month: 'May', carParts: 350, cosmetics: 290, electronics: 410, solarEnergy: 1120, total: 2170 },
  { month: 'Jun', carParts: 380, cosmetics: 310, electronics: 450, solarEnergy: 1350, total: 2490 },
  { month: 'Jul', carParts: 410, cosmetics: 340, electronics: 490, solarEnergy: 1580, total: 2820 },
  { month: 'Aug', carParts: 430, cosmetics: 370, electronics: 520, solarEnergy: 1720, total: 3040 },
  { month: 'Sep', carParts: 460, cosmetics: 410, electronics: 580, solarEnergy: 1890, total: 3340 },
  { month: 'Oct', carParts: 510, cosmetics: 460, electronics: 640, solarEnergy: 2100, total: 3710 },
  { month: 'Nov', carParts: 620, cosmetics: 580, electronics: 820, solarEnergy: 2450, total: 4470 }, // Double 11 Peak!
  { month: 'Dec', carParts: 580, cosmetics: 520, electronics: 760, solarEnergy: 2280, total: 4140 }
];

// Machine Learning Predictive Demand Forecasting (2026 Q3 - 2027 Q4)
export const ML_PREDICTIVE_FORECAST = [
  { period: '2026 Q3 (Act)', actualDemand: 3040, predictedDemand: 3010, confidenceRange: [2900, 3120], riskLevel: 'Low' },
  { period: '2026 Q4 (Est)', actualDemand: null, predictedDemand: 4580, confidenceRange: [4350, 4800], riskLevel: 'High Stock-Out Risk' },
  { period: '2027 Q1 (Pred)', actualDemand: null, predictedDemand: 3800, confidenceRange: [3550, 4050], riskLevel: 'Medium' },
  { period: '2027 Q2 (Pred)', actualDemand: null, predictedDemand: 4950, confidenceRange: [4600, 5300], riskLevel: 'Medium' },
  { period: '2027 Q3 (Pred)', actualDemand: null, predictedDemand: 5800, confidenceRange: [5400, 6200], riskLevel: 'High Demand Surge' },
  { period: '2027 Q4 (Pred)', actualDemand: null, predictedDemand: 7200, confidenceRange: [6700, 7700], riskLevel: 'Peak Double-11 Spike' }
];

// ML High-Margin & Replenishment Recommendations
export const ML_RECOMMENDATIONS = [
  {
    sku: 'SOLAR-550W-TIER1',
    productName: '550W Monocrystalline PERC Solar Panel',
    currentStock: 120,
    predictedDemand30d: 850,
    stockoutDays: 4, // 4 days remaining before stockout!
    suggestedReorder: 1000,
    profitMargin: '38.5%',
    riskTag: 'CRITICAL STOCK-OUT RISK'
  },
  {
    sku: 'CAR-BRAKE-CERAMIC',
    productName: 'Ceramic Low-Dust Brake Pads (Toyota Corolla)',
    currentStock: 350,
    predictedDemand30d: 600,
    stockoutDays: 12,
    suggestedReorder: 500,
    profitMargin: '45.2%',
    riskTag: 'REPLENISHMENT ADVISED'
  },
  {
    sku: 'COS-SERUM-NIACIN',
    productName: 'Niacinamide 10% Brightening Serum (50ml)',
    currentStock: 480,
    predictedDemand30d: 1200,
    stockoutDays: 9,
    suggestedReorder: 2000,
    profitMargin: '62.0%',
    riskTag: 'HIGH MARGIN FAST MOVER'
  },
  {
    sku: 'ELEC-ANC-HEADSET',
    productName: 'Active Noise Cancelling Wireless Headphones',
    currentStock: 620,
    predictedDemand30d: 450,
    stockoutDays: 38,
    suggestedReorder: 0,
    profitMargin: '41.0%',
    riskTag: 'STABLE INVENTORY'
  }
];
