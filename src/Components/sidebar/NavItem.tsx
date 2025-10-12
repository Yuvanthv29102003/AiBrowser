import React from "react";

interface NavItemProps {
  icon: string;
  label: string;
  dark: boolean;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, dark, isActive = false }) => {
  return (
    <div className="relative w-full">
      {isActive && (
        <div 
          className="absolute left-0 top-0 h-full w-1 bg-[#7152F3] rounded-r-sm"
          style={{
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
          }}
        />
      )}
      <button
        className={`flex w-full px-6 py-3 transition-all duration-200 ${
          dark 
            ? isActive 
              ? 'text-white' 
              : 'text-gray-300 hover:bg-[#2B2C2F]' 
            : isActive 
              ? 'text-[#16151C]' 
              : 'text-[#16151C] hover:bg-gray-100 font-dark'
        } font-['Lexend'] text-base leading-6 focus:outline-none focus:ring-0 border-none`}
        style={{
          outline: 'none',
          border: 'none',
          WebkitTapHighlightColor: 'transparent',
          paddingLeft: isActive ? 'calc(1.5rem - 4px)' : '4rem'
        }}
      >
        <div className="flex items-center">
          <div className="relative">
            <img 
              src={icon} 
              alt={label} 
              className={`w-[24px] h-[24px] mr-3 flex-shrink-0 ${icon.includes('calendar-check') ? 'invert-[100%]' : ''} ${isActive ? 'opacity-100' : 'opacity-60'}`}
            />
          </div>
          <span className={isActive ? 'font-medium' : ''}>{label}</span>
        </div>
      </button>
    </div>
  );
};

export default NavItem;
