import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../Components/layout/Topbar';
import Sidebar from '../../Components/sidebar/Sidebar';
import ProfileSidebar from '../../Components/sidebar/ProfileSidebar';
import ProfileCard from '../../Components/cards/ProfileCard';
import type { ActivityItem } from '../../Components/cards/ActivityFeed';
import ActivityFeed from '../../Components/cards/ActivityFeed';
import Pagination from '../../Components/table/Pagination';

interface BookmarksProps {
  onMount?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  gender: string;
  avatar: string;
}

const Bookmarks: React.FC<BookmarksProps> = () => {
  const { userId = '1' } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  // Initialize activePage from URL or default to 'All Users'
  const [activePage, setActivePage] = useState('All Users');
  const [activeTab, setActiveTab] = useState('bookmarks');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Update URL when activePage changes
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', activeTab);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [activeTab]);
  const itemsPerPage = 8;

  const user: UserData = {
    id: userId,
    name: 'Robert Allen',
    email: 'robert.allen@example.com',
    gender: 'Male',
    avatar: '/images/profile.png'
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' 
    });
  };

  const allActivities: ActivityItem[] = [
    { id: 1, date: '2025-07-01', website: 'figma.com', status: 'Completed', name: 'Video Name', image: '/images/video.png' },
    { id: 2, date: '2025-07-01', website: 'figma.com', status: 'In Progress', name: 'Video Name', image: '/images/video.png' },
    { id: 3, date: '2025-07-02', website: 'figma.com', status: 'Failed', name: 'Video Name', image: '/images/video.png' },
    { id: 4, date: '2025-07-02', website: 'figma.com', status: 'Completed', name: 'Video Name', image: '/images/video.png' },
    { id: 5, date: '2025-07-03', website: 'figma.com', status: 'Completed', name: 'Image Name', image: '/images/image.png' },
    { id: 6, date: '2025-07-03', website: 'figma.com', status: 'In Progress', name: 'Video Name', image: '/images/video.png' },
    { id: 7, date: '2025-07-04', website: 'figma.com', status: 'Completed', name: 'Video Name', image: '/images/video.png' },
    { id: 8, date: '2025-07-04', website: 'figma.com', status: 'In Progress', name: 'Video Name', image: '/images/video.png' },
    { id: 9, date: '2025-07-05', website: 'figma.com', status: 'Failed', name: 'Video Name', image: '/images/video.png' },
    { id: 10, date: '2025-07-05', website: 'figma.com', status: 'Completed', name: 'Video Name', image: '/images/video.png' },
  ];

    const totalPages = 4; // static 4 pages for now

  const totalItems = allActivities.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = allActivities.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Topbar 
        title={
          <div className="font-['Lexend'] font-light text-[16px] leading-6 text-[#16151C]">
            User Detail
          </div>
        }
        subtitle="User All Information"
        subtitleClassName="text-[14px] leading-5 text-[#A2A1A8] font-light"
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-20 pt-0 pb-2 pl-1 pr-6">
        {/* Outer square container */}
        {/* <div className="w-full h-full border-2 border-[#A2A1A833] rounded-lg p-4 px-0"> */}

          {/* Inner square container */}
          <div className="relative left-1 w-full  border-2 border-[#A2A1A833] rounded-[10px]">
            {/* Profile Card */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <img src="/images/gender.png" alt="Gender" className="w-[24px] h-[24px] opacity-60" />
                      <span>{user.gender}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <img src="/images/gmail.png" alt="Email" className="w-[24px] h-[24px] opacity-60" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => console.log('Edit Profile Clicked')}
                  className="flex items-center gap-2 bg-[#7152F3] hover:bg-[#6944F5] text-white text-sm font-medium px-5 py-2.5 rounded-[10px] transition"
                >
                  <img src="/images/edit.png" alt="Edit" className="w-[24px] h-[24px] invert" />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Sidebar + Activity List */}
              <div className="flex flex-row p-6">
                {/* Profile Sidebar */}
                <div className="w-[242px] h-[280px] pr-6 border-[#A2A1A833]">
                  <div className="flex flex-col bg-[#FFFFFF] rounded-[10px] border border-[#A2A1A833] overflow-hidden">
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
                          if (item.id === 'activity') {
                            navigate(`/users/${userId}`);
                          } else if (item.id === 'download') {
                            navigate(`/users/${userId}/downloads`);
                          } else if (item.id === 'bookmarks') {
                            navigate(`/users/${userId}/bookmarks`);
                          } else if (item.id === 'profile') {
                            navigate(`/users/${userId}/profile`);
                          } else if (item.id === 'dashboard') {
                            navigate(`/users/${userId}/dashboard`);
                          } else {
                            setActiveTab(item.id);
                          }
                        }}
                        className={`flex items-center gap-3 px-4 py-3 transition
                          ${activeTab === item.id 
                            ? 'bg-[#7152F3] text-white rounded-[10px]' 
                            : 'text-[#16151C] hover:bg-gray-50'} 
                          font-['Lexend'] font-light text-base leading-6`}
                      >
                        <img 
                          src={item.icon} 
                          alt={item.label} 
                          className={`w-6 h-6 ${activeTab === item.id ? 'brightness-0 invert' : 'brightness-0'}`}  
                        />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scrollable Content */}
              <div className="flex-1 rounded-lg max-h-[420px] overflow-y-auto 
                [&::-webkit-scrollbar]:w-2 relative left-2
                [&::-webkit-scrollbar-thumb]:bg-[#7152F3] 
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-track]:rounded-full pr-10">
                {activeTab === 'activity' ? (
                  <ActivityFeed activities={paginatedActivities} />
                ) : (
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="sticky top-0 z-10 bg-white">
                      <tr className="font-['Lexend'] font-light text-base leading-6 text-[#A2A1A8] tracking-normal">
                        <th className="pr-1 pl-2 py-3 w-[150px] text-left">Date</th>
                        <th className="px-0 py-3 text-left">Website</th>
                        <th className="px-16 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedActivities.map((item) => (
                        <tr key={item.id} className="border-b border-t hover:bg-gray-50">
                          <td className="px-2 py-3 font-['Lexend'] font-light text-base leading-6 text-[#16151C] tracking-normal">{formatDate(item.date)}</td>
                          <td className="px-2 py-3 flex gap-[20px]">
                            <img src={item.image} alt="" className="w-5 h-5" />
                            <span className="font-medium text-[#7A5AF8] cursor-pointer">
                              {item.name}
                            </span>{' '}
                            - {item.website}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-0">
                              <button
                                onClick={() => console.log('View', item.id)}
                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
                              >
                                <img src="/images/view.png" alt="View" className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => console.log('Edit', item.id)}
                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
                              >
                                <img src="/images/star.png" alt="Edit" className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => console.log('Delete', item.id)}
                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
                              >
                                <img src="/images/trash.png" alt="Delete" className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              </div>
              {/* Pagination BELOW inner div and ABOVE outer div end */}
          <div className="border-gray-200">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
          </div>
          </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Bookmarks;