import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../Components/layout/Topbar';
import ProfileSidebar from '../../Components/sidebar/ProfileSidebar';
import ProfileCard from '../../Components/cards/ProfileCard';

interface ProfileProps {
  onMount?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  gender: string;
  avatar: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const { userId = '1' } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [activeContentTab, setActiveContentTab] = useState('personal');

  const user: UserData = {
    id: userId,
    name: 'Brooklyn Simmons',
    email: 'brooklyn.s@example.com',
    gender: 'Female',
    avatar: '/images/profile.png',
  };

  return (
    <>
      {/* Topbar */}
      <Topbar
        title={
          <div className="font-['Lexend'] font-light text-[16px] leading-6 text-[#16151C]">
            User Detail
          </div>
        }
        subtitle="User All Information"
        subtitleClassName="text-[14px] leading-5 text-[#A2A1A8] font-light"
      />

      <div className="w-full flex overflow-hidden flex-row px-6 mt-[-18px] pb-2">
        {/* <div className="w-full h-full border-2 border-[#A2A1A833] rounded-lg p-4 px-0"> */}
          <div className="relative left-45px] w-full h-full border-2 border-[#A2A1A833] rounded-[10px]">
            {/* Header section with profile */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <img
                      src="/images/gender.png"
                      alt="Gender"
                      className="w-[24px] h-[24px] opacity-60"
                    />
                    <span>{user.gender}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <img
                      src="/images/gmail.png"
                      alt="Email"
                      className="w-[24px] h-[24px] opacity-60"
                    />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => console.log('Edit profile clicked')}
                className="flex items-center gap-2 bg-[#7152F3] hover:bg-[#6944F5] text-white text-sm font-medium px-5 py-2.5 rounded-[10px] transition"
              >
                <img
                  src="/images/edit.png"
                  alt="Edit"
                  className="w-[24px] h-[24px] invert"
                />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Sidebar + content */}
            <div className="flex flex-row p-6 border border-[#A2A1A833]">
              {/* Sidebar */}
              <div className="w-[242px] h-[280px] pr-6 border-[#A2A1A833]">
                <div className="flex flex-col bg-white rounded-md border border-gray-200 overflow-hidden">
                  {[
                    { id: 'profile', label: 'Profile', icon: '/images/person.png' },
                    { id: 'activity', label: 'Daily Activity', icon: '/images/calendar-check.png' },
                    { id: 'download', label: 'Download', icon: '/images/download.png' },
                    { id: 'bookmarks', label: 'Bookmarks', icon: '/images/notepad.png' },
                    { id: 'dashboard', label: 'Dashboard', icon: '/images/apps.png' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'activity') navigate(`/users/${userId}`);
                        else if (item.id === 'download') navigate(`/users/${userId}/downloads`);
                        else if (item.id === 'bookmarks') navigate(`/users/${userId}/bookmarks`);
                        else if (item.id === 'profile') navigate(`/users/${userId}/profile`);
                        else if (item.id === 'dashboard') navigate(`/users/${userId}/dashboard`);
                        else setActiveTab(item.id);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 transition
                        ${
                          activeTab === item.id
                            ? 'bg-[#7152F3] text-white rounded-[10px]'
                            : 'text-[#16151C] hover:bg-gray-50'
                        } 
                        font-['Lexend'] font-light text-base leading-6`}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-6 h-6"
                        style={{
                          filter:
                            activeTab === item.id
                              ? 'hue-rotate(270deg) saturate(5)'
                              : 'brightness(0)',
                        }}
                      />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right side content */}
              <div className="flex-1 p-4 pt-0 pb-2">
                <div className="bg-white rounded-lg p-4 pt-2">
                  {/* Tabs */}
                  <div className="flex gap-4 border-b border-[#A2A1A833] mb-3">
                    <div
                      className={`w-fit pb-2 cursor-pointer flex items-center ${
                        activeContentTab === 'personal'
                          ? 'border-b-4 border-[#7152F3] text-[#7152F3]'
                          : ''
                      }`}
                      onClick={() => setActiveContentTab('personal')}
                    >
                      <img
                        src="/images/person.png"
                        alt="Personal"
                        className="w-5 h-5 mr-2"
                        style={{
                          filter:
                            activeContentTab === 'personal'
                              ? 'hue-rotate(720deg) saturate(30)'
                              : 'none',
                        }}
                      />
                      <span className="font-['Lexend'] font-semibold text-base leading-6 tracking-normal">Personal Information</span>
                    </div>
                    <div
                      className={`w-fit pb-2 cursor-pointer flex items-center ${
                        activeContentTab === 'account'
                          ? 'border-b-4 border-[#7152F3] text-[#7152F3]'
                          : ''
                      }`}
                      onClick={() => setActiveContentTab('account')}
                    >
                      <img
                        src="/images/lock.png"
                        alt="Account"
                        className="w-5 h-5 mr-2"
                        style={{
                          filter:
                            activeContentTab === 'account'
                              ? 'hue-rotate(720deg) saturate(30)'
                              : 'none',
                        }}
                      />
                      <span className="font-['Lexend'] font-light text-base leading-6 tracking-normal">Account Access</span>
                    </div>
                  </div>

                  {/* Personal Info Section */}
                  {activeContentTab === 'personal' && (
                    <div className="grid grid-cols-2 gap-x-24 gap-y-4 mt-5">
                      {[
                        { label: 'First Name', value: 'Brooklyn' },
                        { label: 'Last Name', value: 'Simmons' },
                        { label: 'Mobile Number', value: '(702) 555-0122' },
                        { label: 'Email Address', value: 'brooklyn.s@example.com' },
                        { label: 'Date of Birth', value: 'July 14, 1995' },
                        { label: 'Marital Status', value: 'Married' },
                        { label: 'Gender', value: 'Female' },
                        { label: 'Nationality', value: 'America' },
                        { label: 'Address', value: '2464 Royal Ln. Mesa, New Jersey' },
                        { label: 'City', value: 'California' },
                        { label: 'State', value: 'United State' },
                        { label: 'Zip Code', value: '35624' },
                      ].map((info) => (
                        <div key={info.label} className="flex flex-col pb-2 border-b border-gray-200">
                          <p className="text-[#A2A1A8] font-['Lexend'] font-light text-sm leading-[22px] tracking-normal mb-1">{info.label}</p>
                          <p className="font-['Lexend'] font-light text-base leading-6 tracking-normal text-[#16151C]">{info.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Account Access Section */}
                  {activeContentTab === 'account' && (
                    <div className="mt-6">
                      <p className="text-gray-600">Account Access details coming soon...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Profile;
