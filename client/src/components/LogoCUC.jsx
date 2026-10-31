import React from 'react';

export const LogoCUC = ({ className = "h-10", variant = "dark" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Cooperativa Unidos por el Calzado"
        className={`h-full w-auto object-contain select-none ${
          variant === 'white' ? 'brightness-0 invert' : ''
        }`}
      />
    </div>
  );
};