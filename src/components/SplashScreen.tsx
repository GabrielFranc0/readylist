import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 overflow-hidden">
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="splash-circle splash-circle-1"></div>
        <div className="splash-circle splash-circle-2"></div>
        <div className="splash-circle splash-circle-3"></div>
      </div>

      {/* Floating products animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-item floating-item-1">🥛</div>
        <div className="floating-item floating-item-2">🍎</div>
        <div className="floating-item floating-item-3">🥖</div>
        <div className="floating-item floating-item-4">🧀</div>
        <div className="floating-item floating-item-5">🥬</div>
        <div className="floating-item floating-item-6">🍳</div>
      </div>

      {/* Main cart animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="cart-container">
          {/* Cart SVG Animation */}
          <svg
            viewBox="0 0 100 100"
            className="w-32 h-32 md:w-40 md:h-40 cart-bounce"
          >
            {/* Cart body */}
            <g className="cart-body">
              {/* Cart basket */}
              <path
                d="M25 35 L30 65 L70 65 L75 35"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cart-basket"
              />
              {/* Cart handle */}
              <path
                d="M15 35 L25 35"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M10 28 L15 35"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Wheels */}
              <circle cx="38" cy="72" r="5" fill="white" className="wheel wheel-left" />
              <circle cx="62" cy="72" r="5" fill="white" className="wheel wheel-right" />
            </g>

            {/* Animated items falling into cart */}
            <g className="cart-items">
              <text x="40" y="50" fontSize="16" className="cart-item-1">🍎</text>
              <text x="52" y="55" fontSize="14" className="cart-item-2">🥛</text>
              <text x="46" y="48" fontSize="12" className="cart-item-3">🥖</text>
            </g>
          </svg>

          {/* Sparkle effects */}
          <div className="sparkle sparkle-1">✨</div>
          <div className="sparkle sparkle-2">✨</div>
          <div className="sparkle sparkle-3">✨</div>
        </div>

        {/* App name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 tracking-tight splash-title">
          ReadyList
        </h1>
        <p className="text-white/80 text-sm md:text-base mt-2 splash-subtitle">
          Sua lista de compras inteligente
        </p>

        {/* Progress bar */}
        <div className="mt-8 w-48 md:w-64">
          <div className="h-1.5 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 ease-out progress-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/60 text-xs text-center mt-2">
            Carregando...
          </p>
        </div>
      </div>
    </div>
  );
}

