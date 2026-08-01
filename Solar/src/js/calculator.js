/* ==========================================================================
   SOLAR ROI CALCULATOR ENGINE (INTERACTIVE HIGH-PRECISION VERSION)
   ========================================================================== */

export function initCalculator() {
  // Input Controls
  const roofAreaInput = document.getElementById('calc-roof-area');
  const roofAreaNum = document.getElementById('calc-roof-area-num');
  const monthlyBillInput = document.getElementById('calc-monthly-bill');
  const monthlyBillNum = document.getElementById('calc-monthly-bill-num');
  const tariffInput = document.getElementById('calc-tariff');
  const tariffVal = document.getElementById('calc-tariff-val');
  
  // Unit & Currency
  const unitSqftBtn = document.getElementById('unit-sqft');
  const unitSqmBtn = document.getElementById('unit-sqm');
  const currencySelector = document.getElementById('currency-selector');
  const areaUnitLabel = document.getElementById('area-unit-label');

  // Facility & BESS
  const facilityOpts = document.querySelectorAll('.facility-opt');
  const bessOpts = document.querySelectorAll('.bess-opt-btn');

  // Presets
  const areaPresetBtns = document.querySelectorAll('[data-preset-area]');
  const billPresetBtns = document.querySelectorAll('[data-preset-bill]');

  // Output Elements
  const systemSizeEl = document.getElementById('res-system-size');
  const monthlySavingsEl = document.getElementById('res-monthly-savings');
  const year25SavingsEl = document.getElementById('res-25yr-savings');
  const paybackEl = document.getElementById('res-payback');
  const co2OffsetEl = document.getElementById('res-co2-offset');
  const energyAnnualEl = document.getElementById('res-energy-annual');

  // CaPE Comparison Elements
  const localCapexEl = document.getElementById('res-local-capex');
  const chinaCapexEl = document.getElementById('res-china-capex');
  const savingsPctEl = document.getElementById('res-savings-pct');
  const calcQuoteBtn = document.getElementById('calc-quote-btn');
  const chartMilestoneTxt = document.getElementById('chart-milestone-txt');

  if (!roofAreaInput || !monthlyBillInput) return;

  // Internal State
  let isMetric = false;
  let currencySymbol = '$';
  let currencyRate = 1.0;
  let currentFacility = 'commercial'; // commercial, industrial, ground, residential
  let facilityMultiplier = 1.0;
  let currentBessKwh = 0; // 0, 50, 100, 250
  let currentTariff = 0.18; // $/kWh

  // Facility Multipliers
  const facilityMap = {
    'commercial': { yieldMult: 1.0, costMult: 1.0, title: 'Commercial Roof' },
    'industrial': { yieldMult: 1.1, costMult: 0.92, title: 'Industrial Plant' },
    'ground': { yieldMult: 1.2, costMult: 0.85, title: 'Ground Mount' },
    'residential': { yieldMult: 0.9, costMult: 1.15, title: 'Residential Villa' }
  };

  // Facility Selection
  facilityOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      facilityOpts.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      currentFacility = opt.dataset.facility || 'commercial';
      facilityMultiplier = facilityMap[currentFacility]?.yieldMult || 1.0;
      updateCalculator();
    });
  });

  // BESS Selection
  bessOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      bessOpts.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      currentBessKwh = parseInt(opt.dataset.bess, 10) || 0;
      updateCalculator();
    });
  });

  // Currency Sync
  if (currencySelector) {
    currencySelector.addEventListener('change', (e) => {
      if (e.target.value === 'CNY') {
        currencySymbol = '¥';
        currencyRate = 7.2;
      } else {
        currencySymbol = '$';
        currencyRate = 1.0;
      }
      updateCalculator();
    });
  }

  // Unit Toggle (SqFt <-> SqM)
  if (unitSqftBtn && unitSqmBtn) {
    unitSqftBtn.addEventListener('click', () => {
      if (!isMetric) return;
      isMetric = false;
      unitSqftBtn.classList.add('active');
      unitSqmBtn.classList.remove('active');
      if (areaUnitLabel) areaUnitLabel.textContent = 'sq ft';
      
      const sqftVal = Math.round((parseFloat(roofAreaInput.value) || 500) * 10.764);
      roofAreaInput.max = 50000;
      roofAreaInput.step = 250;
      roofAreaInput.value = sqftVal;
      if (roofAreaNum) roofAreaNum.value = sqftVal;
      updateCalculator();
    });

    unitSqmBtn.addEventListener('click', () => {
      if (isMetric) return;
      isMetric = true;
      unitSqmBtn.classList.add('active');
      unitSqftBtn.classList.remove('active');
      if (areaUnitLabel) areaUnitLabel.textContent = 'm²';

      const sqmVal = Math.round((parseFloat(roofAreaInput.value) || 5000) / 10.764);
      roofAreaInput.max = 4650;
      roofAreaInput.step = 25;
      roofAreaInput.value = sqmVal;
      if (roofAreaNum) roofAreaNum.value = sqmVal;
      updateCalculator();
    });
  }

  // Synced Inputs: Slider <-> Number Field
  roofAreaInput.addEventListener('input', () => {
    if (roofAreaNum) roofAreaNum.value = roofAreaInput.value;
    updateCalculator();
  });

  if (roofAreaNum) {
    roofAreaNum.addEventListener('input', () => {
      let val = parseFloat(roofAreaNum.value) || 0;
      roofAreaInput.value = val;
      updateCalculator();
    });
  }

  monthlyBillInput.addEventListener('input', () => {
    if (monthlyBillNum) monthlyBillNum.value = monthlyBillInput.value;
    updateCalculator();
  });

  if (monthlyBillNum) {
    monthlyBillNum.addEventListener('input', () => {
      let val = parseFloat(monthlyBillNum.value) || 0;
      monthlyBillInput.value = val;
      updateCalculator();
    });
  }

  if (tariffInput) {
    tariffInput.addEventListener('input', () => {
      currentTariff = parseFloat(tariffInput.value) || 0.18;
      if (tariffVal) tariffVal.textContent = `$${currentTariff.toFixed(2)}/kWh`;
      updateCalculator();
    });
  }

  // Preset Buttons
  areaPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      areaPresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      let val = parseInt(btn.dataset.presetArea, 10);
      if (isMetric) val = Math.round(val / 10.764);
      roofAreaInput.value = val;
      if (roofAreaNum) roofAreaNum.value = val;
      updateCalculator();
    });
  });

  billPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      billPresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      let val = parseInt(btn.dataset.presetBill, 10);
      monthlyBillInput.value = val;
      if (monthlyBillNum) monthlyBillNum.value = val;
      updateCalculator();
    });
  });

  // Calculation Engine Core
  function updateCalculator() {
    let roofAreaVal = parseFloat(roofAreaInput.value) || 1000;
    let monthlyBillVal = parseFloat(monthlyBillInput.value) || 2500;

    const areaInSqFt = isMetric ? roofAreaVal * 10.764 : roofAreaVal;

    // 1. Calculate Recommended System Size (kW)
    // Max panels fit on area: ~75 sq ft per kW
    const maxCapacityFromAreaKw = (areaInSqFt / 75) * facilityMultiplier;
    
    // Capacity needed to offset bill based on tariff: Monthly kWh = Bill / Tariff
    const monthlyKwh = monthlyBillVal / Math.max(0.05, currentTariff);
    const dailyKwh = monthlyKwh / 30;
    // Avg 4.5 Peak Sun Hours per day
    const capacityNeededKw = dailyKwh / 4.5;

    // Optimal system size: bound by roof size & energy demand
    let systemKw = Math.min(maxCapacityFromAreaKw, capacityNeededKw * 1.05);
    systemKw = Math.max(5, Math.round(systemKw * 10) / 10);

    // 2. Annual Energy Production (kWh)
    const annualEnergyKwh = Math.round(systemKw * 1450 * facilityMultiplier);

    // 3. Financial Monthly Savings & BESS Boost
    const baseMonthlySavingsUSD = (annualEnergyKwh / 12) * currentTariff * 0.90;
    
    // Battery storage adds peak shaving savings (+15% to +30%)
    let bessSavingsBoostMult = 1.0;
    if (currentBessKwh === 50) bessSavingsBoostMult = 1.15;
    if (currentBessKwh === 100) bessSavingsBoostMult = 1.25;
    if (currentBessKwh === 250) bessSavingsBoostMult = 1.35;

    const totalMonthlySavingsUSD = Math.round(Math.min(monthlyBillVal * 0.95, baseMonthlySavingsUSD * bessSavingsBoostMult));

    // 4. Capital Outlay (China Direct Bsmart vs Local EPC)
    // Local EPC Avg Price: ~$1,650 / kW
    // Bsmart Direct Factory Price: ~$920 / kW
    const bessCostUSD = currentBessKwh * 260; // $260/kWh storage
    const localCapexUSD = Math.round(systemKw * 1650 + bessCostUSD * 1.4);
    const chinaCapexUSD = Math.round((systemKw * 920 + bessCostUSD) * facilityMap[currentFacility].costMult);

    const capexSavedUSD = localCapexUSD - chinaCapexUSD;
    const savingsPct = Math.round((capexSavedUSD / localCapexUSD) * 100);

    // 5. Payback & 25-Year ROI
    const annualSavingsUSD = totalMonthlySavingsUSD * 12;
    const netPaybackYears = Math.max(1.8, Math.round((chinaCapexUSD / annualSavingsUSD) * 10) / 10);

    // 25-Year Cumulative ROI assuming 4% annual grid electricity price inflation
    let cumulative25YrUSD = 0;
    for (let yr = 1; yr <= 25; yr++) {
      cumulative25YrUSD += annualSavingsUSD * Math.pow(1.04, yr - 1);
    }
    const net25YrROIUSD = Math.round(cumulative25YrUSD - chinaCapexUSD);

    // 6. Environmental CO2 Offset
    const co2TonsAnnual = Math.round((annualEnergyKwh * 0.000705) * 10) / 10;

    // Currency Formatting Conversions
    const monthlySavingsConv = Math.round(totalMonthlySavingsUSD * currencyRate);
    const year25SavingsConv = Math.round((net25YrROIUSD * currencyRate) / 1000);
    const localCapexConv = Math.round(localCapexUSD * currencyRate);
    const chinaCapexConv = Math.round(chinaCapexUSD * currencyRate);

    // Update UI DOM
    if (systemSizeEl) {
      systemSizeEl.textContent = systemKw >= 1000 ? `${(systemKw / 1000).toFixed(2)} MW` : `${systemKw} kW`;
    }
    if (monthlySavingsEl) monthlySavingsEl.textContent = `${currencySymbol}${monthlySavingsConv.toLocaleString()}`;
    if (year25SavingsEl) year25SavingsEl.textContent = `${currencySymbol}${year25SavingsConv.toLocaleString()}k`;
    if (paybackEl) paybackEl.textContent = `${netPaybackYears} Yrs`;
    if (co2OffsetEl) co2OffsetEl.textContent = `${co2TonsAnnual} Tons/Yr`;
    if (energyAnnualEl) energyAnnualEl.textContent = `${(annualEnergyKwh / 1000).toFixed(1)} MWh/Yr`;

    // CaPE Comparison
    if (localCapexEl) localCapexEl.textContent = `${currencySymbol}${localCapexConv.toLocaleString()}`;
    if (chinaCapexEl) chinaCapexEl.textContent = `${currencySymbol}${chinaCapexConv.toLocaleString()}`;
    if (savingsPctEl) savingsPctEl.textContent = `-${savingsPct}% DIRECT SAVINGS`;

    // Render Financial SVG Chart
    renderFinancialChart(annualSavingsUSD, chinaCapexUSD, netPaybackYears);

    // Sync Quote Modal Attributes
    if (calcQuoteBtn) {
      const bessText = currentBessKwh > 0 ? ` + ${currentBessKwh}kWh BESS` : '';
      calcQuoteBtn.dataset.system = `${systemKw} kW (${facilityMap[currentFacility].title}${bessText})`;
      calcQuoteBtn.dataset.savings = `${currencySymbol}${monthlySavingsConv.toLocaleString()}/mo`;
    }
  }

  // Interactive Chart Renderer with Year Milestones
  function renderFinancialChart(annualSavings, capexCost, paybackYrs) {
    const chartPath = document.getElementById('chart-path-bsmart');
    const chartArea = document.getElementById('chart-area-bsmart');
    const chartNodesGroup = document.getElementById('chart-nodes-group');
    if (!chartPath) return;

    const width = 320;
    const height = 110;
    const years = [0, 5, 10, 15, 20, 25];
    const points = [];

    // Calculate max cumulative cashflow at yr 25 for height scaling
    let maxCashflow = 0;
    for (let yr = 0; yr <= 25; yr += 5) {
      let cash = (annualSavings * yr * Math.pow(1.04, yr / 2)) - capexCost;
      if (cash > maxCashflow) maxCashflow = cash;
    }
    maxCashflow = Math.max(maxCashflow, capexCost * 2);

    // Generate path points
    years.forEach((yr, idx) => {
      const x = (yr / 25) * width;
      let cash = (annualSavings * yr * Math.pow(1.04, yr / 2)) - capexCost;
      // Map cash range [-capexCost, maxCashflow] to SVG height [height-5, 10]
      const normalized = (cash + capexCost) / (maxCashflow + capexCost);
      const y = height - 5 - (normalized * (height - 15));
      points.push({ x: Math.round(x), y: Math.round(y), yr, cash });
    });

    const dPath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    chartPath.setAttribute('d', dPath);

    if (chartArea) {
      const dArea = `${dPath} L ${width},${height} L 0,${height} Z`;
      chartArea.setAttribute('d', dArea);
    }

    // Render Interactive Clickable SVG Milestone Dots
    if (chartNodesGroup) {
      chartNodesGroup.innerHTML = '';
      points.forEach(p => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', p.x);
        circle.setAttribute('cy', p.y);
        circle.setAttribute('r', '4');
        circle.setAttribute('class', 'chart-node-circle');
        
        // Hover/Click interaction for milestone preview
        circle.addEventListener('mouseenter', () => {
          if (chartMilestoneTxt) {
            const valFormatted = p.cash >= 0 
              ? `+${currencySymbol}${Math.round((p.cash * currencyRate)/1000)}k Net Profit`
              : `-${currencySymbol}${Math.round((-p.cash * currencyRate)/1000)}k Investment`;
            chartMilestoneTxt.textContent = `Year ${p.yr}: ${valFormatted}`;
          }
        });

        chartNodesGroup.appendChild(circle);
      });
    }

    if (chartMilestoneTxt) {
      chartMilestoneTxt.textContent = `Payback achieved in ${paybackYrs} Years!`;
    }
  }

  // Initial Calculation Run
  updateCalculator();
}
