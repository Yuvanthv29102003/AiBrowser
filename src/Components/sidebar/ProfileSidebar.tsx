import React from 'react';
import { NavLink } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'profile', icon: <PersonOutlineIcon className="w-5 h-5" />, label: 'My Profile' },
    { id: 'notifications', icon: <NotificationsNoneOutlinedIcon className="w-5 h-5" />, label: 'Notifications' },
    { id: 'billing', icon: <CreditCardOutlinedIcon className="w-5 h-5" />, label: 'Billing' },
    { id: 'security', icon: <LockOutlinedIcon className="w-5 h-5" />, label: 'Security' },
    { id: 'settings', icon: <SettingsOutlinedIcon className="w-5 h-5" />, label: 'Settings' },
    { id: 'help', icon: <HelpOutlineOutlinedIcon className="w-5 h-5" />, label: 'Help & Support' },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === item.id
                ? 'bg-[#4B4DED] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
