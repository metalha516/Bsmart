import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Trophy, CheckCircle, Flame, ArrowRight } from 'lucide-react';

const SEGMENTS = [
  { label: '5% OFF', code: 'LUCKY5', discount: 5, color: '#FF5000' },
  { label: '10% OFF', code: 'LUCKY10', discount: 10, color: '#2563EB' },
  { label: '12% OFF', code: 'BSMART12', discount: 12, color: '#059669' },
  { label: '15% OFF', code: 'SAVER15', discount: 15, color: '#D97706' },
  { label: '18% OFF', code: 'MEGA18', discount: 18, color: '#7C3AED' },
  { label: '20% OFF', code: 'SUPER20', discount: 20, color: '#E11D48' },
];

export const SpinWheelModal = () => {
  const { isSpinWheelOpen, setIsSpinWheelOpen, setAppliedCoupon } = useApp();
  const [mustSpin, setMustSpin] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winningSegment, setWinningSegment] = useState(null);

  if (!isSpinWheelOpen) return null;

  const handleSpinClick = () => {
    if (mustSpin) return;
    setMustSpin(true);

    // Pick winning segment
    const winningIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segmentAngle = 360 / SEGMENTS.length;
    const extraRounds = 5 * 360; // 5 full rotations
    // Center pointer is at top (0 deg). Target rotation aligns segment center under pointer.
    const targetRotation = rotation + extraRounds + (360 - (winningIndex * segmentAngle + segmentAngle / 2));

    setRotation(targetRotation);

    setTimeout(() => {
      setMustSpin(false);
      const winner = SEGMENTS[winningIndex];
      setWinningSegment(winner);
      setAppliedCoupon(winner);
      localStorage.setItem('hasSpunWheel', 'true');
    }, 4000);
  };

  const sliceAngle = 360 / SEGMENTS.length;
  const radius = 142;
  const cx = 150;
  const cy = 150;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn select-none">
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-amber-500/40 relative overflow-hidden text-center">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSpinWheelOpen(false)}
          title="Close Modal"
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 p-1.5 rounded-full z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Header */}
        <div className="flex items-center justify-center space-x-2 text-amber-400 mb-1">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-black">Daily Lucky Wheel</span>
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
          Spin & Win Instant Discount!
        </h2>
        <p className="text-xs text-gray-400 mt-1">Claim up to 20% OFF (Discount guaranteed under 25%)</p>

        {winningSegment ? (
          <div className="py-8 space-y-4 animate-scaleUp">
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full mx-auto flex items-center justify-center text-gray-900 shadow-xl shadow-amber-500/30">
              <Trophy className="w-10 h-10" />
            </div>
            <div>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-bold uppercase">
                🎉 Congratulations!
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">
                You Won {winningSegment.label}!
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Coupon Code <span className="font-mono bg-gray-800 text-amber-400 px-2.5 py-1 rounded font-bold border border-amber-400/30">{winningSegment.code}</span> has been automatically applied!
              </p>
            </div>

            <button
              onClick={() => setIsSpinWheelOpen(false)}
              className="w-full bg-gradient-to-r from-taobao-orange to-taobao-red text-white py-3 rounded-xl font-black text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <span>Start Shopping with Discount</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center">
            
            {/* Wheel Container with Pointer */}
            <div className="relative w-72 h-72 flex items-center justify-center">
              
              {/* Pointer Arrow at Top */}
              <div className="absolute top-[-6px] z-30 flex flex-col items-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
                <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400"></div>
              </div>

              {/* Spinning SVG Wheel */}
              <div
                className="w-full h-full rounded-full transition-transform duration-[4000ms] cubic-bezier(0.15, 0.9, 0.25, 1) shadow-2xl"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl">
                  {SEGMENTS.map((seg, i) => {
                    const startAngle = i * sliceAngle - 90;
                    const endAngle = (i + 1) * sliceAngle - 90;
                    const midAngle = (i + 0.5) * sliceAngle - 90;

                    const radStart = (startAngle * Math.PI) / 180;
                    const radEnd = (endAngle * Math.PI) / 180;
                    const radMid = (midAngle * Math.PI) / 180;

                    const x1 = cx + radius * Math.cos(radStart);
                    const y1 = cy + radius * Math.sin(radStart);
                    const x2 = cx + radius * Math.cos(radEnd);
                    const y2 = cy + radius * Math.sin(radEnd);

                    // Text position
                    const textRadius = 92;
                    const tx = cx + textRadius * Math.cos(radMid);
                    const ty = cy + textRadius * Math.sin(radMid);
                    const textRotation = (i + 0.5) * sliceAngle;

                    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

                    return (
                      <g key={i}>
                        {/* Slice Path */}
                        <path
                          d={d}
                          fill={seg.color}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />

                        {/* Slice Text Label */}
                        <text
                          x={tx}
                          y={ty}
                          fill="#FFFFFF"
                          fontSize="13"
                          fontWeight="900"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${textRotation}, ${tx}, ${ty})`}
                          style={{
                            textShadow: '0px 1px 3px rgba(0, 0, 0, 0.8)',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {seg.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center Hub Circle */}
                  <circle cx={cx} cy={cy} r="34" fill="#111827" stroke="#F59E0B" strokeWidth="4" />
                  <text
                    x={cx}
                    y={cy}
                    fill="#F59E0B"
                    fontSize="12"
                    fontWeight="900"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    Bsmart
                  </text>
                </svg>
              </div>
            </div>

            {/* Spin Action Button */}
            <button
              onClick={handleSpinClick}
              disabled={mustSpin}
              className="mt-6 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-900 py-3.5 rounded-xl font-black text-sm shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>{mustSpin ? 'Spinning Wheel...' : 'SPIN THE WHEEL NOW'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
