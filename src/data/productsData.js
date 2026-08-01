export const CATEGORIES = [
  {
    id: 'car-parts',
    name: 'Car Parts & Accessories',
    icon: 'Car',
    subcategories: ['Engine Components', 'Brake Systems', 'LED Headlights', 'Car Audio & Navigation', 'Interior Styling', 'EV Charging Accessories'],
    popularTags: ['Toyota Corolla', 'Honda Civic', 'Brake Pads', 'LED Turbo', 'OLED Screen']
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Personal Care',
    icon: 'Sparkles',
    subcategories: ['Skincare Serums', 'Hydrating Moisturizers', 'Lipstick & Makeup', 'Sunscreen SPF50+', 'Hair Care & Oils', 'Anti-Aging Creams'],
    popularTags: ['Niacinamide', 'Hyaluronic', 'Sensitive Skin', 'Matte Red', 'Organic']
  },
  {
    id: 'electronics',
    name: 'Electronic Devices & Gadgets',
    icon: 'Smartphone',
    subcategories: ['Smartwatches & Bands', 'Wireless Earbuds ANC', 'Portable Power Banks', 'Smart Home Hubs', 'Action Cameras 4K', 'Gaming Accessories'],
    popularTags: ['Bluetooth 5.3', '65W GaN Charger', 'AMOLED Display', 'Active Noise Cancelling']
  },
  {
    id: 'solar-energy',
    name: 'Solar Panels & Green Energy',
    icon: 'Sun',
    subcategories: ['Monocrystalline Panels', 'Hybrid Inverters', 'LiFePO4 Lithium Batteries', 'MPPT Solar Controllers', 'Solar Water Pumps', 'Complete Off-Grid Kits'],
    popularTags: ['550W Tier-1', '5kW Hybrid', '48V 200Ah', 'Pure Sine Wave', 'B2B Wholesale']
  }
];

export const PRODUCTS = [
  // 1. Car Parts & Accessories
  {
    id: 'car-01',
    title: 'High Performance Ceramic Brake Pads Set (Front & Rear)',
    category: 'Car Parts & Accessories',
    categoryKey: 'car-parts',
    price: 45.00,
    originalPrice: 65.00,
    moq: 10,
    b2bTiers: [
      { min: 1, max: 9, price: 45.00 },
      { min: 10, max: 49, price: 34.00 },
      { min: 50, max: 200, price: 26.50 },
      { min: 201, max: 1000, price: 21.00 }
    ],
    stock: 4, // Scarcity trigger!
    rating: 4.9,
    reviewsCount: 342,
    salesCount: 1420,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&auto=format&fit=crop&q=80',
    flashSale: true,
    soldPercentage: 88,
    fitment: {
      make: 'Toyota',
      model: 'Corolla',
      years: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
    },
    specs: {
      Material: 'Premium Low-Dust Ceramic Formula',
      Warranty: '3 Years / 50,000 km',
      Certification: 'ISO9001 / E-Mark Approved',
      NoiseLevel: 'Ultra Quiet Anti-Squeal Shim'
    },
    tags: ['Dustless', 'High Thermal Tolerance', 'OEM Replacement'],
    bundleIds: ['car-02', 'car-03']
  },
  {
    id: 'car-02',
    title: 'Ultra-Brightness 120W 24,000LM Canbus LED Headlight Bulbs Kit (Pair)',
    category: 'Car Parts & Accessories',
    categoryKey: 'car-parts',
    price: 29.90,
    originalPrice: 49.90,
    moq: 20,
    b2bTiers: [
      { min: 1, max: 19, price: 29.90 },
      { min: 20, max: 99, price: 21.50 },
      { min: 100, max: 500, price: 16.00 }
    ],
    stock: 12,
    rating: 4.8,
    reviewsCount: 512,
    salesCount: 3890,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
    flashSale: true,
    soldPercentage: 92,
    fitment: {
      make: 'Universal',
      model: 'H4/H7/H11/9005',
      years: ['All Years']
    },
    specs: {
      Power: '120W/Pair',
      Lumens: '24,000LM Cool White 6500K',
      Cooling: '12,000 RPM Silent Turbo Fan',
      Waterproof: 'IP68 Submersible'
    },
    tags: ['Plug & Play', 'No Dashboard Error', 'CSP Chips'],
    bundleIds: ['car-01', 'car-03']
  },
  {
    id: 'car-03',
    title: '10.1" Android 13 Car Multimedia Stereo Player with Apple CarPlay & DSP',
    category: 'Car Parts & Accessories',
    categoryKey: 'car-parts',
    price: 135.00,
    originalPrice: 195.00,
    moq: 5,
    b2bTiers: [
      { min: 1, max: 4, price: 135.00 },
      { min: 5, max: 19, price: 108.00 },
      { min: 20, max: 100, price: 92.00 }
    ],
    stock: 7,
    rating: 4.9,
    reviewsCount: 189,
    salesCount: 840,
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&auto=format&fit=crop&q=80',
    flashSale: false,
    soldPercentage: 65,
    fitment: {
      make: 'Honda',
      model: 'Civic',
      years: ['2016', '2017', '2018', '2019', '2020', '2021']
    },
    specs: {
      RAM_ROM: '4GB RAM + 64GB ROM Octa-Core',
      Screen: '1280x720 IPS HD Touchscreen',
      Connectivity: 'Wireless CarPlay / Android Auto / 4G LTE Slot',
      Audio: '32-Band Equalizer DSP Processor'
    },
    tags: ['GPS Navigation', 'AHDBackup Camera Included'],
    bundleIds: ['car-01', 'car-02']
  },

  // 2. Cosmetics & Personal Care
  {
    id: 'cos-01',
    title: 'Advanced Hydrating Niacinamide 10% + Zinc Skin Brightening Serum (50ml)',
    category: 'Cosmetics & Personal Care',
    categoryKey: 'cosmetics',
    price: 18.50,
    originalPrice: 28.00,
    moq: 25,
    b2bTiers: [
      { min: 1, max: 24, price: 18.50 },
      { min: 25, max: 99, price: 12.00 },
      { min: 100, max: 500, price: 8.50 },
      { min: 501, max: 5000, price: 5.80 }
    ],
    stock: 3, // Scarcity trigger!
    rating: 4.95,
    reviewsCount: 1240,
    salesCount: 8950,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    flashSale: true,
    soldPercentage: 96,
    skinType: 'All Skin Types / Oily & Sensitive',
    specs: {
      Volume: '50ml Drop Bottle',
      KeyIngredients: 'Niacinamide 10%, Zinc PCA 1%, Hyaluronic Acid',
      Benefits: 'Minimizes Pores, Brightens Tone, Reduces Blemishes',
      CrueltyFree: '100% Vegan & Cruelty-Free'
    },
    tags: ['Glass Skin', 'Bestseller', 'Dermatologist Tested'],
    bundleIds: ['cos-02', 'cos-03']
  },
  {
    id: 'cos-02',
    title: 'Moisturizing Peptide Collagen Anti-Wrinkle Eye Cream (30g)',
    category: 'Cosmetics & Personal Care',
    categoryKey: 'cosmetics',
    price: 14.90,
    originalPrice: 24.00,
    moq: 30,
    b2bTiers: [
      { min: 1, max: 29, price: 14.90 },
      { min: 30, max: 149, price: 9.80 },
      { min: 150, max: 1000, price: 6.20 }
    ],
    stock: 18,
    rating: 4.85,
    reviewsCount: 780,
    salesCount: 4310,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    flashSale: true,
    soldPercentage: 81,
    skinType: 'Dry & Aging Skin',
    specs: {
      Volume: '30g Squeeze Tube with Cooling Applicator Tip',
      KeyIngredients: 'Triple Peptides, Hydrolyzed Collagen, Caffeine',
      Effect: 'Dark Circle Removal, Puffiness Reduction, Fine Line Eraser'
    },
    tags: ['Anti-Puffiness', 'Instant Lifting'],
    bundleIds: ['cos-01', 'cos-03']
  },
  {
    id: 'cos-03',
    title: 'Invisible Daily Sunscreen Fluid SPF 50+ PA++++ Broad Spectrum (80ml)',
    category: 'Cosmetics & Personal Care',
    categoryKey: 'cosmetics',
    price: 16.00,
    originalPrice: 22.00,
    moq: 20,
    b2bTiers: [
      { min: 1, max: 19, price: 16.00 },
      { min: 20, max: 99, price: 10.50 },
      { min: 100, max: 500, price: 7.20 }
    ],
    stock: 9,
    rating: 4.9,
    reviewsCount: 930,
    salesCount: 6100,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    flashSale: false,
    soldPercentage: 74,
    skinType: 'Combination / Sensitive',
    specs: {
      SPF: 'SPF 50+ PA++++',
      Finish: 'Non-Greasy Water-Light Matte',
      ReefSafe: 'Oxybenzone-Free Reef Friendly Formula'
    },
    tags: ['No White Cast', 'Makeup Primer Friendly'],
    bundleIds: ['cos-01', 'cos-02']
  },

  // 3. Electronic Devices & Gadgets
  {
    id: 'elec-01',
    title: 'Active Noise Cancelling Wireless Headphones with 60H Playtime & Spatial Audio',
    category: 'Electronic Devices & Gadgets',
    categoryKey: 'electronics',
    price: 69.90,
    originalPrice: 119.00,
    moq: 10,
    b2bTiers: [
      { min: 1, max: 9, price: 69.90 },
      { min: 10, max: 49, price: 52.00 },
      { min: 50, max: 200, price: 41.00 },
      { min: 201, max: 1000, price: 34.50 }
    ],
    stock: 5,
    rating: 4.88,
    reviewsCount: 1540,
    salesCount: 7890,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    flashSale: true,
    soldPercentage: 90,
    specs: {
      ANC: '-42dB Hybrid Active Noise Cancellation',
      Battery: '60 Hours (ANC Off) / 45 Hours (ANC On)',
      Bluetooth: 'V5.3 Dual Device Multipoint Connection',
      AudioCodec: 'LDAC Hi-Res Audio Certified & AAC'
    },
    tags: ['Hi-Res Audio', 'Foldable', 'Multipoint BT'],
    bundleIds: ['elec-02', 'elec-03']
  },
  {
    id: 'elec-02',
    title: '140W 4-Port GaN Fast Wall Charger for Laptops, Smartphones & Tablets',
    category: 'Electronic Devices & Gadgets',
    categoryKey: 'electronics',
    price: 49.00,
    originalPrice: 75.00,
    moq: 15,
    b2bTiers: [
      { min: 1, max: 14, price: 49.00 },
      { min: 15, max: 49, price: 36.00 },
      { min: 50, max: 200, price: 28.00 }
    ],
    stock: 14,
    rating: 4.92,
    reviewsCount: 890,
    salesCount: 5200,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    flashSale: false,
    soldPercentage: 70,
    specs: {
      Power: '140W Max USB PD 3.1 & PPS',
      Ports: '3x USB-C + 1x USB-A Fast Charging',
      Technology: 'GaN III Temperature Safety Tech',
      Compatibility: 'MacBook Pro, iPhone 15/16, Galaxy S24, Dell XPS'
    },
    tags: ['GaN III', 'PD3.1 140W', 'Travel Adapters Included'],
    bundleIds: ['elec-01', 'elec-03']
  },
  {
    id: 'elec-03',
    title: 'AMOLED Smartwatch with BT Calling, GPS Tracking & 100+ Sports Modes',
    category: 'Electronic Devices & Gadgets',
    categoryKey: 'electronics',
    price: 55.00,
    originalPrice: 89.00,
    moq: 10,
    b2bTiers: [
      { min: 1, max: 9, price: 55.00 },
      { min: 10, max: 49, price: 42.00 },
      { min: 50, max: 200, price: 32.00 }
    ],
    stock: 8,
    rating: 4.82,
    reviewsCount: 670,
    salesCount: 3900,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    flashSale: true,
    soldPercentage: 85,
    specs: {
      Display: '1.43" Always-On AMOLED 466x466 Screen',
      HealthSensors: 'Heart Rate, SpO2, Sleep, Stress Monitor',
      WaterResistance: '5ATM & IP68 Waterproof',
      BatteryLife: '14 Days Typical Usage'
    },
    tags: ['Always-On AMOLED', '5ATM Waterproof', 'BT Phone Calls'],
    bundleIds: ['elec-01', 'elec-02']
  },

  // 4. Solar Panels & Green Energy Products
  {
    id: 'solar-01',
    title: '550W Monocrystalline PERC Solar Panel (Tier 1 High-Efficiency 21.8%)',
    category: 'Solar Panels & Green Energy Products',
    categoryKey: 'solar-energy',
    price: 165.00,
    originalPrice: 220.00,
    moq: 10, // 10 panels pallet MOQ
    b2bTiers: [
      { min: 1, max: 9, price: 165.00 },
      { min: 10, max: 49, price: 125.00 },
      { min: 50, max: 199, price: 98.00 },
      { min: 200, max: 2000, price: 82.00 } // Container load wholesale
    ],
    stock: 2, // High FOMO scarcity alert!
    rating: 4.98,
    reviewsCount: 410,
    salesCount: 18500,
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
    flashSale: true,
    soldPercentage: 94,
    specs: {
      MaxPower: '550 Watt Output',
      CellType: '144 Half-Cut Monocrystalline PERC',
      Efficiency: '21.8% Module Efficiency',
      Warranty: '25-Year Linear Power Output Guarantee',
      Dimensions: '2278 x 1134 x 35 mm (27.5 kg)'
    },
    tags: ['Tier-1 Listed', 'PID Resistant', 'Heavy Load Weatherproof'],
    bundleIds: ['solar-02', 'solar-03']
  },
  {
    id: 'solar-02',
    title: '5.5kW Pure Sine Wave Hybrid Solar Inverter (MPPT 100A 48V)',
    category: 'Solar Panels & Green Energy Products',
    categoryKey: 'solar-energy',
    price: 490.00,
    originalPrice: 650.00,
    moq: 2,
    b2bTiers: [
      { min: 1, max: 1, price: 490.00 },
      { min: 2, max: 9, price: 395.00 },
      { min: 10, max: 50, price: 330.00 }
    ],
    stock: 6,
    rating: 4.94,
    reviewsCount: 290,
    salesCount: 2400,
    image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&auto=format&fit=crop&q=80',
    flashSale: false,
    soldPercentage: 78,
    specs: {
      RatedPower: '5500W Pure Sine Wave 230VAC',
      MPPTVoltage: '120VDC - 450VDC High PV Voltage Range',
      BatteryType: 'Compatible with Lithium LiFePO4 & Lead-Acid',
      Features: 'Built-in WiFi Monitoring Module, Parallel Capacity up to 9 Units'
    },
    tags: ['Parallel Support', 'WiFi Cloud App', 'Grid Tie & Off-Grid'],
    bundleIds: ['solar-01', 'solar-03']
  },
  {
    id: 'solar-03',
    title: '48V 200Ah 10kWh Wall-Mounted LiFePO4 Battery Pack (6000+ Deep Cycles)',
    category: 'Solar Panels & Green Energy Products',
    categoryKey: 'solar-energy',
    price: 1450.00,
    originalPrice: 1980.00,
    moq: 1,
    b2bTiers: [
      { min: 1, max: 1, price: 1450.00 },
      { min: 2, max: 4, price: 1220.00 },
      { min: 5, max: 30, price: 990.00 }
    ],
    stock: 4,
    rating: 4.97,
    reviewsCount: 165,
    salesCount: 1120,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&auto=format&fit=crop&q=80',
    flashSale: true,
    soldPercentage: 89,
    specs: {
      EnergyCapacity: '10.24 kWh (51.2V 200Ah)',
      BatteryCell: 'Grade-A EV LiFePO4 Chemistry',
      CycleLife: '> 6000 Cycles @ 80% DOD',
      BMS: 'Smart 200A BMS with RS485/CAN Communications'
    },
    tags: ['Grade-A LiFePO4', '6000+ Cycles', 'CAN/RS485 Smart BMS'],
    bundleIds: ['solar-01', 'solar-02']
  }
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, user: 'Rahim K.', city: 'Dhaka', action: 'purchased 50x Tier-1 550W Solar Panels', time: '2 mins ago', amount: '$4,100' },
  { id: 2, user: 'Chen L.', city: 'Guangzhou', action: 'placed B2B RFQ for 500x Ceramic Brake Pads', time: '5 mins ago', amount: '$10,500' },
  { id: 3, user: 'Fatima Z.', city: 'Chittagong', action: 'bought Niacinamide Serum Bundle', time: '8 mins ago', amount: '$34.50' },
  { id: 4, user: 'David M.', city: 'Dubai', action: 'ordered 5.5kW Hybrid Inverter Kit', time: '12 mins ago', amount: '$1,940' },
  { id: 5, user: 'Sultana A.', city: 'Sylhet', action: 'redeemed 20% Off Coupon from Spin Wheel', time: '15 mins ago', amount: 'Saved $24' }
];
