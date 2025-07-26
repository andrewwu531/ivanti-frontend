import React from "react";
import Logo from "../ui/Logo";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
