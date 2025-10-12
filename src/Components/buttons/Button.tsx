import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  active?: boolean; // New prop to control active/inactive styling
}

const Button: React.FC<ButtonProps> = ({ label, active = false, ...props }) => {
  const baseClass =
    "flex-1 py-2 text-sm font-medium transition-colors rounded-lg"; // same as ThemeToggle

  const activeClass = active
    ? "bg-[#7152F3] text-white hover:bg-[#5e44d1]"
    : "bg-transparent text-gray-600 hover:bg-gray-100"; // inactive styling

  return (
    <button 
      className={`${baseClass} ${activeClass} focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent`}
      style={{ boxShadow: 'none !important', outline: 'none' }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
