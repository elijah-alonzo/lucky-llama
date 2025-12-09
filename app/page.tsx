'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToGameModes = () => {
    setActiveSection('gamemodes');
    document.getElementById('gamemodes')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const openPortfolio = () => {
    window.open('https://elijah-alonzo.vercel.app', '_blank');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#371843' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(55, 24, 67, 0.9)', borderBottom: '1px solid rgba(93, 30, 118, 0.4)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/lucky-llama-logo.png"
                alt="Lucky Llama"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-white">Lucky <span style={{ color: '#fffd30' }}>Llama</span></span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={scrollToGameModes}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#fffd30', color: '#371843' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                <span className="text-white">Lucky </span>
                <span style={{ color: '#fffd30' }}>Llama</span>
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">
                A web app with the sole purpose of providing interactive ways for randomizing and making party games exciting. 
                Stop overthinking and start choosing with fun, fair randomization!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToGameModes}
                  className="px-8 py-4 text-base font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: '#fffd30', color: '#371843' }}
                >
                  Get Started
                </button>
                <button 
                  onClick={openPortfolio}
                  className="px-8 py-4 text-base font-semibold border-2 rounded-xl transition-all hover:shadow-lg"
                  style={{ borderColor: '#fffd30', color: '#fffd30' }}
                >
                  Support the Dev
                </button>
              </div>


            </div>

            {/* Right Content - Lucky Llama Logo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full flex items-center justify-center shadow-2xl overflow-hidden" style={{ backgroundColor: '#fffd30' }}>
                  <Image
                    src="/lucky-llama-logo.png"
                    alt="Lucky Llama Logo"
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section id="gamemodes" className="py-20" style={{ backgroundColor: 'rgba(55, 24, 67, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Choose Your <span style={{ color: '#fffd30' }}>Game Mode</span>
            </h2>
            <p className="text-base text-gray-300 max-w-3xl mx-auto">
              Four exciting ways to make decisions and add fun to your gatherings. 
              Each mode offers a unique interactive experience perfect for parties and team activities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Rolling Roulette */}
            <div className="certification-card">
              <div className="certification-image bg-white flex items-center justify-center">
                <Image
                  src="/llama-roullete.png"
                  alt="Rolling Roulette"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="certification-content">
                <h5 className="certification-title">Rolling Roulette</h5>
                <p className="certification-description">
                  A spinner that holds multiple text options. Perfect for making random selections from a list of choices.
                </p>
                <button className="certification-button">
                  Play Now
                </button>
              </div>
            </div>

            {/* Capricious Cards */}
            <div className="certification-card">
              <div className="certification-image bg-white flex items-center justify-center">
                <Image
                  src="/llama-cards.png"
                  alt="Capricious Cards"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="certification-content">
                <h3 className="certification-title">Capricious Cards</h3>
                <p className="certification-description">
                  Multiple cards are set and flipped on their backside. Selecting one unflips the card to reveal your choice.
                </p>
                <button className="certification-button" disabled>
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Blithe Bottle */}
            <div className="certification-card">
              <div className="certification-image bg-white flex items-center justify-center">
                <Image
                  src="/llama-bottle.png"
                  alt="Blithe Bottle"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="certification-content">
                <h3 className="certification-title">Blithe Bottle</h3>
                <p className="certification-description">
                  Digital spin the bottle game. Perfect for party games and icebreakers with friends and groups.
                </p>
                <button className="certification-button" disabled>
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Spinning Slots */}
            <div className="certification-card">
              <div className="certification-image flex items-center justify-center">
                <Image
                  src="/llama-slot.png"
                  alt="Spinning Slots"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="certification-content">
                <h3 className="certification-title">Spinning Slots</h3>
                <p className="certification-description">
                  Classic slot machine experience for random combinations and exciting decision-making entertainment.
                </p>
                <button className="certification-button" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#371843', borderTop:'1px solid rgba(93, 30, 118, 0.4)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/lucky-llama-logo.png"
                  alt="Lucky Llama"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-lg font-bold text-white">
                  Lucky <span style={{ color: '#fffd30' }}>Llama</span>
                </span>
              </div>
              <p className="text-white max-w-md">
                Got any reccomendations? suggestions? or need improvements? Feel free to reach out to me via my social links!
              </p>
            </div>
            
            <div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="https://linkedin.com/in/elijah-alonzo" target="_blank" className="flex items-center space-x-2 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/elijah-alonzo" target="_blank" className="flex items-center space-x-2 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:elijahalonzo.me@gmail.com" className="flex items-center space-x-2 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email</span>
                  </a>
                </li>
                <li>
                  <a href="https://elijah-alonzo.vercel.app" target="_blank" className="flex items-center space-x-2 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>Portfolio</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
