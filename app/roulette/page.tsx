'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SpinWheel from '../components/SpinWheel';
import FloatingInput from '../components/FloatingInput';

export default function Roulette() {
  const [wheelItems, setWheelItems] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string>('');
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const wheelRef = useRef<{ spinToIndex: (index: number) => void }>(null);

  const handleSpin = () => {
    if (wheelItems.length === 0) return;
    setIsSpinning(true);
    setWinner('');
    setShowModal(false);
    const randomIndex = Math.floor(Math.random() * wheelItems.length);
    setWinnerIndex(randomIndex);
    setWinner(wheelItems[randomIndex]);
    if (wheelRef.current) {
      wheelRef.current.spinToIndex(randomIndex);
    }
    setTimeout(() => {
      setIsSpinning(false);
      setShowModal(true);
    }, 4000);
  };

  const handleUpdateItems = (newItems: string[]) => {
    setWheelItems(newItems);
    setShowInput(false);
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="text-left w-full max-w-xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                <span className="text-white">Rolling </span>
                <span style={{ color: '#fffd30' }}>Roulette</span>
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">
                Spin the wheel to make random selections from your custom list. Perfect for party games and decision making!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || wheelItems.length === 0}
                  className="px-8 py-4 text-base font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ 
                    backgroundColor: isSpinning ? '#94a3b8' : '#fffd30', 
                    color: '#371843'
                  }}
                >
                  {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                </button>
                <button 
                  onClick={() => setShowInput(!showInput)}
                  className="px-8 py-4 text-base font-semibold border-2 rounded-xl transition-all hover:shadow-lg"
                  style={{ borderColor: '#fffd30', color: '#fffd30' }}
                >
                  Customize Wheel
                </button>
              </div>

              {/* Items Count */}
              <div className="text-gray-300">
                {wheelItems.length} {wheelItems.length === 1 ? 'item' : 'items'} on the wheel
              </div>
            </div>

            {/* Right Content - Wheel */}
            <div className="flex justify-center lg:justify-end w-full">
              <div className="relative w-full flex justify-center">
                <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[550px] aspect-square">
                  <SpinWheel 
                    ref={wheelRef}
                    items={wheelItems}
                    isSpinning={isSpinning}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Input Button */}
      <FloatingInput 
        isVisible={showInput}
        onToggle={() => setShowInput(!showInput)}
        currentItems={wheelItems}
        onUpdateItems={handleUpdateItems}
      />

      {/* Result Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="w-full max-w-2xl rounded-3xl shadow-2xl p-12 relative animate-[modal-pop_0.4s_ease-out] animate-[modal-glitter_2s_ease-in-out_infinite]"
            style={{ 
              backgroundColor: '#371843', 
              border: '4px solid #fffd30'
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center justify-center mb-8">
              <div className="text-center">
                <h2 className="text-5xl font-semibold mb-3" style={{ color: '#fffd30' }}>
                  {winner}
                </h2>
                <p className="text-lg text-gray-200 font-base">
                  has been selected!
                </p>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}