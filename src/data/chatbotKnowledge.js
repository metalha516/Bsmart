export const AI_SUGGESTION_CHIPS = [
  '🚗 Find brake pads for Toyota Corolla 2020',
  '☀️ Calculate solar kit for 3-ton AC + Fridge',
  '✨ Best serum for oily & sensitive skin',
  '🎧 Compare ANC Headphones vs 140W GaN Charger',
  '📦 Ask for B2B MOQ & Container Wholesale pricing'
];

export function generateAiResponse(userMessage, activeCategory) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('corolla') || msg.includes('brake') || msg.includes('car') || msg.includes('fitment') || msg.includes('headlight')) {
    return {
      text: "Based on our OEM vehicle fitment database, for a **Toyota Corolla (2016-2023)**, we recommend our **High Performance Ceramic Brake Pads Set ($45.00)**. It offers low dust, silent operation, and 50,000 km warranty. Would you like to check B2B wholesale pricing (MOQ 10 pcs @ $34.00/set)?",
      suggestedProductId: 'car-01'
    };
  }

  if (msg.includes('solar') || msg.includes('ac') || msg.includes('fridge') || msg.includes('inverter') || msg.includes('battery') || msg.includes('load')) {
    return {
      text: "To run a **3-ton AC + Double-Door Refrigerator + Home Loads**, you need a **10kW Solar Array (approx. 18x 550W Panels) + 5.5kW / 10kW Hybrid Inverter + 10.24kWh LiFePO4 Lithium Battery**. Our 550W Tier-1 panels start at $165 (or $82/panel for container B2B orders). Shall I switch you to our interactive **Solar Solutions Calculator Hub**?",
      suggestedProductId: 'solar-01'
    };
  }

  if (msg.includes('skin') || msg.includes('serum') || msg.includes('cosmetics') || msg.includes('acne') || msg.includes('oily') || msg.includes('brightening')) {
    return {
      text: "For oily, acne-prone, or sensitive skin, the **Niacinamide 10% + Zinc PCA Serum ($18.50)** is our top-rated formula with 4.95/5 stars (8,950+ sold). It tightens pores and balances sebum without irritation. B2B Tier available down to $5.80/unit for 500+ units!",
      suggestedProductId: 'cos-01'
    };
  }

  if (msg.includes('anc') || msg.includes('headphone') || msg.includes('electronics') || msg.includes('charger') || msg.includes('gadget') || msg.includes('gan')) {
    return {
      text: "Our flagship **Active Noise Cancelling Headphones ($69.90)** features -42dB Hybrid ANC, LDAC Hi-Res Audio, and 60-hour battery life. If you need multi-device fast charging, pair it with our **140W 4-Port GaN Wall Charger ($49.00)**!",
      suggestedProductId: 'elec-01'
    };
  }

  if (msg.includes('b2b') || msg.includes('rfq') || msg.includes('wholesale') || msg.includes('moq') || msg.includes('container')) {
    return {
      text: "We offer direct factory shipping from China with verified CE/ISO certifications, custom OEM branding, and FOB/CIF shipping quotes. You can click the **'Request B2B Quote (RFQ)'** button or switch to **Wholesale B2B Mode** in the top bar to unlock tiered quantity discounts!",
      action: 'openRfq'
    };
  }

  return {
    text: "Hello! I am your **Bsmart AI Sales & Product Specialist**. I can assist you with finding exact Car Part fitments by model/year, sizing Solar PV Systems & Inverters, recommending Skincare & Cosmetics, or calculating B2B wholesale freight costs. How can I help you today?",
    suggestedProductId: null
  };
}
