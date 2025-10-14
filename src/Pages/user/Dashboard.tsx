import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../Components/layout/Topbar';
import ProfileSidebar from '../../Components/sidebar/ProfileSidebar';
import ProfileCard from '../../Components/cards/ProfileCard';
import Pagination from '../../Components/table/Pagination';

interface DashboardProps {
  onMount?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  gender: string;
  avatar: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const { userId = '1' } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 4; // static 4 pages for now


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
              <div className="flex-1 p-4 pb-14 pt-0">
                <div className="bg-white rounded-lg p-4 pt-0">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-1">
                    <div className="w-[313px] h-[154px] bg-white border border-[#A2A1A833] rounded-lg p-4 flex flex-col">
                      <div className="flex flex-row items-center mb-6">
                        <img src="/images/person.png" alt="Person" className="w-5 h-5 mr-2" />
                        <span className="font-['Lexend'] font-light text-base leading-6 tracking-normal text-[#16151C]">Total Bookmarks</span>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <span className="font-['Lexend'] font-semibold text-base leading-6 tracking-normal text-[#16151C]">56</span>
                        <div className="flex items-center justify-start w-[54px] h-[26px] rounded-[5px] p-[5px] bg-[#EAF9F4]">
                          <img src="/images/up.png" alt="Arrow Up" className="w-[12px] mb-0.5 mr-3" />
                          <span className="font-light text-[11px] text-[#30BE82]">12%</span>
                        </div>
                      </div>

                      <hr className="w-[312px] border-[#A2A1A833] mt-6 ml-[-16px]" />
                      <div className="mt-auto pb-[2px]">
                        <span className="font-['Lexend'] font-light text-[12px] leading-[18px] tracking-[0%] text-[#A2A1A8]">Update: July 16, 2025</span>
                      </div>
                    </div>
                    <div className="w-[313px] h-[154px] bg-white border border-[#A2A1A833] rounded-lg relative right-24 p-4 flex flex-col">
                      <div className="flex flex-row items-center mb-6">
                        <img src="/images/person.png" alt="Person" className="w-5 h-5 mr-2" />
                        <span className="font-['Lexend'] font-light text-base leading-6 tracking-normal text-[#16151C]">Total Visited Site</span>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <span className="font-['Lexend'] font-semibold text-base leading-6 tracking-normal text-[#16151C]">1050</span>
                        <div className="flex items-center justify-start w-[54px] h-[26px] rounded-[5px] p-[5px] bg-[#EAF9F4]">
                          <img src="/images/up.png" alt="Arrow Up" className="w-[12px] mb-0.5 mr-3" />
                          <span className="font-light text-[11px] text-[#30BE82]">5%</span>
                        </div>
                      </div>

                      <hr className="w-[312px] border-[#A2A1A833] mt-6 ml-[-16px]" />
                      <div className="mt-auto pb-[2px]">
                        <span className="font-['Lexend'] font-light text-[12px] leading-[18px] tracking-[0%] text-[#A2A1A8]">Update: July 14, 2025</span>
                      </div>
                    </div>
                    <div className="w-[313px] h-[154px] bg-white border border-[#A2A1A833] rounded-lg p-4 flex flex-col">
                      <div className="flex flex-row items-center mb-6">
                        <img src="/images/person.png" alt="Person" className="w-5 h-5 mr-2" />
                        <span className="font-['Lexend'] font-light text-base leading-6 tracking-normal text-[#16151C]">Today Active Time</span>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <span className="font-['Lexend'] font-semibold text-base leading-6 tracking-normal text-[#16151C]">470 Hours</span>
                        <span className="font-light text-[11px] text-[#feeff0]">5%</span>
                        <div className="flex items-center justify-start w-[54px] h-[26px] rounded-[5px] p-[5px] bg-[#feeff0]">
                          <img src="/images/down-arrow.png" alt="Arrow Up" className="w-[12px] h-[12px] mt-1 mr-3" />
                          <span className="font-light text-[11px] text-[#F45B69]">5%</span>
                        </div>
                      </div>

                      <hr className="w-[312px] border-[#A2A1A833] mt-6 ml-[-16px]" />
                      <div className="mt-auto pb-[2px]">
                        <span className="font-['Lexend'] font-light text-[12px] leading-[18px] tracking-[0%] text-[#A2A1A8]">Update: July 14, 2025</span>
                      </div>
                    </div>
                    <div className="w-[313px] h-[154px] bg-white border border-[#A2A1A833] rounded-lg relative right-24 p-4 flex flex-col">
                      <div className="flex flex-row items-center mb-6">
                        <img src="/images/person.png" alt="Person" className="w-5 h-5 mr-2" />
                        <span className="font-['Lexend'] font-light text-base leading-6 tracking-normal text-[#16151C]">Total Download</span>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <span className="font-['Lexend'] font-semibold text-base leading-6 tracking-normal text-[#16151C]">250</span>
                        <div className="flex items-center justify-start w-[54px] h-[26px] rounded-[5px] p-[5px] bg-[#EAF9F4]">
                          <img src="/images/up.png" alt="Arrow Up" className="w-[12px] mb-0.5 mr-3" />
                          <span className="font-light text-[11px] text-[#30BE82]">12%</span>
                        </div>
                      </div>

                      <hr className="w-[312px] border-[#A2A1A833] mt-6 ml-[-16px]" />
                      <div className="mt-auto pb-[2px]">
                        <span className="font-['Lexend'] font-light text-[12px] leading-[18px] tracking-[0%] text-[#A2A1A8]">Update: July 10, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination BELOW inner div and ABOVE outer div end */}
          <div className="border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage} 
                totalItems={10} 
                itemsPerPage={10}                  
              />
          </div>
          </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Dashboard;
