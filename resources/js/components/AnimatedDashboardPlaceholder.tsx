import React from 'react';

const AnimatedDashboardPlaceholder = () => {
  return (
    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-gradient-to-br from-[#FFC49A]/20 to-[#FF9966]/10 flex items-center justify-center">
      {/* Floating musical notes SVG */}
      <div className="absolute animate-float">
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 24 24"
          className="text-[#E05B3A]"
        >
          <path 
            fill="currentColor" 
            d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
          />
        </svg>
      </div>
      {/* Additional floating music symbol */}
      <div className="absolute animate-float-slower" style={{ top: '40%', left: '20%' }}>
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 24 24"
          className="text-[#FF9966]"
        >
          <path 
            fill="currentColor" 
            d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
          />
        </svg>
      </div>

      {/* Main message */}
      <div className="text-center z-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
          Empieza a tomar clases con nosotros
        </h2>
        <p className="text-lg md:text-xl text-gray-600 animate-fade-in delay-100">
          adquiere el plan perfecto para ti
        </p>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        @keyframes float-slower {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
          position: absolute;
          top: 20%;
          right: 15%;
        }
        
        .animate-float-slower {
          animation: float-slower 8s ease-in-out infinite;
          position: absolute;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .delay-100 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default AnimatedDashboardPlaceholder;