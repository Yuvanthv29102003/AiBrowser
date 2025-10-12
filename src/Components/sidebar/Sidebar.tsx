import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const navLinks = [
    { icon: "/images/apps.png", label: "Dashboard", path: "/dashboard" },
    { icon: "/images/user.png", label: "All Users", path: "/" },
    { icon: "/images/people.png", label: "All Websites", path: "/websites" },
    { icon: "/images/location.png", label: "Trending Topics", path: "/trending" },
    { icon: "/images/upcoming.png", label: "Upcoming Modules", path: "/upcoming" },
    { icon: "/images/people.png", label: "All Employees", path: "/employees" },
    { icon: "/images/community.png", label: "All Departments", path: "/departments" },
    { icon: "/images/calendar-check.png", label: "Attendance", path: "/attendance" },
    { icon: "/images/coin-dollar.png", label: "Payroll", path: "/payroll" },
    { icon: "/images/briefcase.png", label: "Jobs", path: "/jobs" },
    { icon: "/images/setting.png", label: "Settings", path: "/settings" },
  ] as const;

  const handleNavClick = (path: string, label: string) => {
    setActivePage(label);
    navigate(path);
  };

  const toggleTheme = (mode: "light" | "dark") => {
    if (mode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`fixed flex flex-col w-[280px] h-screen left-0 top-0 backdrop-blur-md transition-all duration-200 ml-4`}
      style={{ backgroundColor: "#A2A1A80D" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-start p-6 pb-2 pl-[4.5rem]">
        <div className="w-[36.41px] h-[36.41px] flex items-center justify-center mr-1">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-[36.41px] h-[36.41px] object-contain"
          />
        </div>
        <span className="w-[77.75px] h-[20.05px] text-[#16151C] opacity-100 font-medium text-[20px] mb-2">
          HRMS
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col mt-4 w-full">
        {navLinks.map((link, idx) => {
          const isActive = location.pathname === link.path || 
                         (link.path === '/' && location.pathname.startsWith('/users/'));
          return (
            <div
              key={idx}
              onClick={() => handleNavClick(link.path, link.label)}
              className={`relative transition-all duration-200 flex items-center cursor-pointer pl-6 hover:bg-gray-100 text-gray-700
                ${isActive ? 'text-[#7152F3] font-medium' : ''}`}
              style={isActive ? {
                background: 'linear-gradient(to right, transparent 1.5rem, #7152F30D 1.5rem, #7152F30D 100%)',
                backgroundClip: 'content-box',
                paddingLeft: '3.0rem',
                marginLeft: '0.5rem',
                width: 'calc(100% - 0.5rem)',
                borderTopRightRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              } : { border: 'none', outline: 'none', boxShadow: 'none' }}
            >
              <div className="relative z-10 flex items-center w-full">
                <div className="relative w-full">
                  <NavItem
                    icon={link.icon}
                    label={link.label}
                    isActive={isActive}
                    dark={isDarkMode}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <div className="p-4">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default Sidebar;
