import React from 'react';

const AnimatedDashboardPlaceholder = () => {
  return (
    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-gradient-to-br from-[#FFC49A]/20 to-[#FF9966]/10 flex items-center justify-center">
      {/* Floating guitar SVG */}
      <div className="absolute animate-float">
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 24 24"
          className="text-[#E05B3A]"
        >
          <path 
            fill="currentColor" 
            d="M12,3C13.1,3 14,3.9 14,5C14,6.1 13.1,7 12,7C10.9,7 10,6.1 10,5C10,3.9 10.9,3 12,3M19.03,7.39L20.45,5.97C20.62,5.8 20.86,5.8 21.02,5.97L22.44,7.39C22.61,7.56 22.61,7.81 22.44,7.97L21.02,9.39C20.85,9.56 20.61,9.56 20.44,9.39L19.03,7.97C18.86,7.8 18.86,7.56 19.03,7.39M17.23,10.77L15.82,12.19C15.65,12.36 15.65,12.6 15.82,12.77L17.23,14.18C17.4,14.35 17.64,14.35 17.81,14.18L19.22,12.77C19.39,12.6 19.39,12.36 19.22,12.19L17.81,10.77C17.64,10.6 17.41,10.6 17.23,10.77M15.41,19.59L14,21.01C13.83,21.18 13.83,21.42 14,21.59L15.41,23C15.58,23.17 15.82,23.17 15.99,23L17.41,21.59C17.58,21.42 17.58,21.18 17.41,21.01L15.99,19.59C15.82,19.42 15.58,19.42 15.41,19.59M12,17C13.1,17 14,17.9 14,19C14,20.1 13.1,21 12,21C10.9,21 10,20.1 10,19C10,17.9 10.9,17 12,17M5.97,3.56L7.39,2.14C7.56,1.97 7.8,1.97 7.97,2.14L9.39,3.56C9.56,3.73 9.56,3.97 9.39,4.14L7.97,5.56C7.8,5.73 7.56,5.73 7.39,5.56L5.97,4.14C5.8,3.97 5.8,3.73 5.97,3.56M4.22,10.78L2.81,12.19C2.64,12.36 2.64,12.6 2.81,12.77L4.22,14.18C4.39,14.35 4.63,14.35 4.8,14.18L6.21,12.77C6.38,12.6 6.38,12.36 6.21,12.19L4.8,10.78C4.63,10.61 4.39,10.61 4.22,10.78M3.61,7.39L2.19,5.97C2.02,5.8 2.02,5.56 2.19,5.39L3.61,3.97C3.78,3.8 4.02,3.8 4.19,3.97L5.6,5.39C5.77,5.56 5.77,5.8 5.6,5.97L4.19,7.39C4.02,7.56 3.78,7.56 3.61,7.39M9.39,18.44L7.97,19.86C7.8,20.03 7.8,20.27 7.97,20.44L9.39,21.86C9.56,22.03 9.8,22.03 9.97,21.86L11.39,20.44C11.56,20.27 11.56,20.03 11.39,19.86L9.97,18.44C9.8,18.27 9.56,18.27 9.39,18.44M14.61,15.39L13.19,14.97C13.02,14.9 12.9,14.76 12.9,14.6C12.9,14.44 13.02,14.3 13.19,14.23L14.61,13.81C14.78,13.74 15.02,13.74 15.19,13.81L16.61,14.23C16.78,14.3 16.9,14.44 16.9,14.6C16.9,14.76 16.78,14.9 16.61,14.97L15.19,15.39C15.02,15.46 14.78,15.46 14.61,15.39M18.39,14.61L17.97,13.19C17.9,13.02 17.76,12.9 17.6,12.9C17.44,12.9 17.3,13.02 17.23,13.19L16.81,14.61C16.74,14.78 16.74,15.02 16.81,15.19L17.23,16.61C17.3,16.78 17.44,16.9 17.6,16.9C17.76,16.9 17.9,16.78 17.97,16.61L18.39,15.19C18.46,15.02 18.46,14.78 18.39,14.61Z"
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