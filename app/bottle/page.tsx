'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Bottle() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [pointingDirection, setPointingDirection] = useState('');
  const [showResult, setShowResult] = useState(false);

  const directions = [
    'North', 'Northeast', 'East', 'Southeast', 
    'South', 'Southwest', 'West', 'Northwest'
  ];

  const handleSpin = () => {
    setIsSpinning(true);
    setShowResult(false);
    setPointingDirection('');
    
    // Generate random rotation (5-10 full spins + random angle)
    const extraSpins = Math.floor(Math.random() * 6) + 5; // 5-10 spins
    const randomAngle = Math.random() * 360;
    const finalRotation = rotation + (extraSpins * 360) + randomAngle;
    
    setRotation(finalRotation);
    
    // Calculate final direction based on final angle
    const normalizedAngle = (finalRotation % 360 + 360) % 360;
    const directionIndex = Math.floor(((normalizedAngle + 22.5) % 360) / 45);
    
    setTimeout(() => {
      setIsSpinning(false);
      setPointingDirection(directions[directionIndex]);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#371843' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(55, 24, 67, 0.9)', borderBottom: '1px solid rgba(93, 30, 118, 0.4)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/lucky-llama-logo.png"
                alt="Lucky Llama"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-white">Lucky <span style={{ color: '#fffd30' }}>Llama</span></span>
            </Link>
            {/* Back Button */}
            <Link 
              href="/"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:opacity-90 text-white border border-white/20"
              style={{ marginLeft: 'auto' }}
            >
              &#8592; Back Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-left w-full max-w-xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                <span className="text-white">Blithe </span>
                <span style={{ color: '#fffd30' }}>Bottle</span>
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">
                Got no bottle? No worries, Blithe Bottle has you covered! Spin the virtual bottle anytime, anywhere.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="px-8 py-4 text-base font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ 
                    backgroundColor: isSpinning ? '#94a3b8' : '#fffd30', 
                    color: '#371843'
                  }}
                >
                  {isSpinning ? 'Spinning...' : 'Spin the Bottle!'}
                </button>
              </div>


            </div>

            {/* Right Content - Bottle */}
            <div className="flex justify-center lg:justify-end w-full px-4 sm:px-0">
              <div className="relative w-full flex justify-center">
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] aspect-square flex items-center justify-center">
                  {/* Spinning Bottle */}
                  <div 
                    className={`w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] flex items-center justify-center`}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
                    }}
                  >
                    <Image
                      src="/bottle.png"
                      alt="Spinning Bottle"
                      width={400}
                      height={400}
                      className="object-contain drop-shadow-2xl w-full h-full"
                      style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-[modal-pop_0.4s_ease-out]"
            style={{ 
              backgroundColor: '#371843', 
              border: '4px solid #fffd30'
            }}
          >
            <button
              onClick={() => setShowResult(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col items-center justify-center mb-4">
              {/* Show bottle pointing in the direction - emphasized */}
              <div className="mb-4">
                <div 
                  className="w-50 h-50 flex items-center justify-center"
                  style={{
                    transform: `rotate(${rotation}deg)`
                  }}
                >
                  <Image
                    src="/bottle.png"
                    alt="Bottle pointing direction"
                    width={250}
                    height={250}
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-300">
                  The bottle points at
                </p>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#fffd30' }}>
                  {pointingDirection}
                </h3>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}