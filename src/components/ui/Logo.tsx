import React from "react";
import logoSrc from "../../assets/ivanti_logo.webp";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-shrink-0">
        <img src={logoSrc} alt="Ivanti Logo" className="mt-1 w-20 h-12" />
      </div>
      <div className="ml-5">
        <h1 className="text-2xl font-bold text-gray-900">Ivanti</h1>
        <p className="text-sm text-gray-500">Temperature Management System</p>
      </div>
    </div>
  );
};

export default Logo;
