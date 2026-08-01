/* ==========================================================================
   BSMART SOLAR & TECH SUPPLY - LIGHT MARKETPLACE ENTRY POINT
   ========================================================================== */

import { initNavigation } from './navigation.js';
import { initCalculator } from './calculator.js';
import { initModals } from './modals.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Modules
  initNavigation();
  initCalculator();
  initModals();

  // Detail Modal Trigger Setup for Bento & Promo Cards
  const detailTriggers = document.querySelectorAll('[data-open-detail]');
  detailTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const serviceId = trigger.dataset.openDetail;
      openServiceDetailModal(serviceId);
    });
  });
});

function openServiceDetailModal(serviceId) {
  const detailModal = document.getElementById('detail-modal');
  const modalTitle = document.getElementById('detail-modal-title');
  const modalBody = document.getElementById('detail-modal-body');

  if (!detailModal || !modalTitle || !modalBody) return;

  const serviceData = {
    'china-supply': {
      title: 'China Direct Supply Chain & Tier-1 Panel Procurement',
      content: `
        <p>Bsmart operates dedicated sourcing offices in Ningbo and Shenzhen, securing factory-direct contracts with BloombergNEF Tier-1 solar photovoltaic manufacturers.</p>
        <h4 style="margin-top:14px; margin-bottom:6px; color:var(--accent-orange);">Direct Procurement Specifications:</h4>
        <ul style="padding-left:18px; line-height:1.7; color:var(--text-secondary);">
          <li>Factory-direct prices for LONGi Hi-MO, Trina Vertex, and Jinko Tiger Neo modules.</li>
          <li>On-site factory electroluminescence (EL) flash testing before container loading.</li>
          <li>FCL & LCL maritime containerized shipping logistics with custom clearance.</li>
          <li>OEM panel badging and spec customization for volume contractors.</li>
        </ul>
      `
    },
    'station-setup': {
      title: 'Commercial & Utility Solar Station EPC Setup',
      content: `
        <p>Full-scope Engineering, Procurement, and Construction (EPC) services for commercial rooftop microgrids and multi-megawatt utility power plants.</p>
        <h4 style="margin-top:14px; margin-bottom:6px; color:var(--accent-orange);">Turnkey Station Capabilities:</h4>
        <ul style="padding-left:18px; line-height:1.7; color:var(--text-secondary);">
          <li>Geotechnical, structural, and electrical grid-tie design.</li>
          <li>Step-up high voltage transformers and central inverter station setup.</li>
          <li>Utility-scale BESS lithium energy storage integration.</li>
          <li>Grid synchronization & utility authority commissioning compliance.</li>
        </ul>
      `
    },
    'wholesale': {
      title: 'Wholesale & Retail Equipment Distribution',
      content: `
        <p>Bulk supply solutions for regional electrical distributors, solar contractors, and installers needing fast local fulfillment.</p>
        <ul style="padding-left:18px; line-height:1.7; color:var(--text-secondary);">
          <li>Full Container Load (FCL) direct factory pricing.</li>
          <li>Regional bonded warehouse inventory for 48-hour order dispatch.</li>
          <li>Tiered volume discounts with flexible payment terms for verified partners.</li>
        </ul>
      `
    },
    'installation': {
      title: 'Professional Engineering & Structural Installation',
      content: `
        <p>Certified field installation teams managing roof ballast mounting, ground racking, and electrical string wiring.</p>
        <ul style="padding-left:18px; line-height:1.7; color:var(--text-secondary);">
          <li>Class-A licensed electrical engineers and certified mounting technicians.</li>
          <li>Wind-load and snow-load structural rating guarantee.</li>
          <li>Thermal infrared array inspection prior to grid energization.</li>
        </ul>
      `
    },
    'tech-support': {
      title: '24/7 Remote Telemetry & Technical Maintenance',
      content: `
        <p>Cloud IoT telemetry monitoring of inverter performance, string yields, and battery state-of-charge with proactive alert dispatch.</p>
        <ul style="padding-left:18px; line-height:1.7; color:var(--text-secondary);">
          <li>Fleet telemetry monitoring app for commercial plant operators.</li>
          <li>Rapid spare parts dispatch from regional warehouse stock.</li>
          <li>Dedicated 24/7 technical hotline and field SLA support.</li>
        </ul>
      `
    },
    'cost-reduction': {
      title: 'Energy Efficiency & ROI Optimization',
      content: `
        <p>Peak-shaving algorithms, demand charge reduction, and carbon offset monetization to accelerate capital payback.</p>
        <ul style="padding-left:18px; line-height:1.7; color:var(--text-secondary);">
          <li>Historical utility tariff analysis and peak load shaving.</li>
          <li>ESG carbon credit certification for enterprise compliance.</li>
          <li>Capital payback accelerated to 2.2 - 3.8 years.</li>
        </ul>
      `
    }
  };

  const info = serviceData[serviceId] || { title: 'Service Details', content: 'Detailed specifications for this supply category.' };
  modalTitle.textContent = info.title;
  modalBody.innerHTML = info.content;

  detailModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
