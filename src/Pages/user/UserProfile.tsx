// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import Topbar from '../../Components/layout/Topbar';
// import Sidebar from '../../Components/sidebar/Sidebar';
// import ProfileSidebar from '../../Components/sidebar/ProfileSidebar';
// import { ActivityItem } from '../../Components/cards/ActivityFeed';
// import ActivityFeed from '../../Components/cards/ActivityFeed';
// import Pagination from '../../Components/table/Pagination';

// interface UserProfileProps {
//   onMount?: () => void;
// }

// interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   gender: string;
//   avatar: string;
// }

// const UserProfile: React.FC<UserProfileProps> = () => {
//   const { userId = '1' } = useParams<{ userId: string }>();
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState('user-profile');
//   const [activeTab, setActiveTab] = useState('profile');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Number of activities per page

//   // Mock user data - in a real app, this would come from an API
//   const user: UserData = {
//     id: userId,
//     name: 'Robert Allen',
//     email: 'robert.allen@example.com',
//     gender: 'Male',
//     avatar: '/images/profile.png'
//   };

//   const handleEditProfile = () => {
//     // Handle edit profile action
//     console.log('Edit profile clicked');
//   };

//   // Sample activities data
//   const allActivities: ActivityItem[] = [
//     {
//       id: 1,
//       date: '2025-10-08',
//       website: 'example.com',
//       status: 'Completed'
//     },
//     {
//       id: 2,
//       date: '2025-10-08',
//       website: 'api.example.org',
//       status: 'In Progress'
//     },
//     {
//       id: 3,
//       date: '2025-10-07',
//       website: 'test-site.com',
//       status: 'Failed'
//     },
//     {
//       id: 4,
//       date: '2025-10-07',
//       website: 'data-warehouse.net',
//       status: 'Completed'
//     },
//     {
//       id: 5,
//       date: '2025-10-06',
//       website: 'monitor.example.io',
//       status: 'Completed'
//     },
//     {
//       id: 6,
//       date: '2025-10-06',
//       website: 'backup.cloud',
//       status: 'In Progress'
//     }
//   ];

//   // Calculate pagination
//   const totalItems = allActivities.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedActivities = allActivities.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Topbar */}
//         <Topbar 
//           title={
//             <div className="font-['Lexend'] font-light text-[16px] leading-6 text-[#16151C]">
//               {user.name}'s Profile
//             </div>
//           }
//           subtitle="View and manage user details"
//           subtitleClassName="text-[14px] leading-5 text-[#A2A1A8] font-light"
//         />

//         {/* Main Content */}
//         <main className="flex-1 border border-[#A2A1A833] w-full h-full overflow-y-auto p-4">
//           <div className="w-full max-w-[1980px] mx-auto relative">
//             {/* Outer border container */}
//             <div className="border border-gray-300 absolute left-32 rounded-md bg-white ">
//               {/* Inner content container */}
//               <div className="ml-8">
//               {/* Profile Card with border */}
//               <div className="p-8 border-b border-gray-200">
//                 <ProfileCard 
//                   name={user.name}
//                   email={user.email}
//                   gender={user.gender}
//                   avatar={user.avatar}
//                   onEditProfile={handleEditProfile}
//                 />
//               </div>
              
//               {/* Combined Sidebar and Activity Feed with border */}
//               <div className="flex flex-row p-6 gap-6 border-b border-gray-200">
//                 {/* Profile Sidebar with border */}
//                 <div className="w-64 flex-shrink-0 pr-6 border-r border-gray-200">
//                   <ProfileSidebar 
//                     activeTab={activeTab} 
//                     onTabChange={setActiveTab} 
//                   />
//                 </div>
                
//                 {/* Activity Feed with border */}
//                 <div className="flex-1">
//                   <div className="w-full">
//                     <ActivityFeed 
//                       activities={paginatedActivities}
//                     />
//                   </div>
//                 </div>
//               </div>
//               </div>

//               {/* Full width pagination */}
//               <div className="px-4 pb-6 ml-8">
//                 <div className="bg-white rounded-md p-2">
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={setCurrentPage}
//                     totalItems={totalItems}
//                     itemsPerPage={itemsPerPage}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../Components/layout/Topbar';
import Sidebar from '../../Components/sidebar/Sidebar';
import ProfileSidebar from '../../Components/sidebar/ProfileSidebar';
import ProfileCard from '../../Components/cards/ProfileCard';
import type { ActivityItem } from '../../Components/cards/ActivityFeed';
import ActivityFeed from '../../Components/cards/ActivityFeed';
import Pagination from '../../Components/table/Pagination';

interface UserProfileProps {
  onMount?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  gender: string;
  avatar: string;
}

const UserProfile: React.FC<UserProfileProps> = () => {
  const { userId = '1' } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  // Initialize activePage from URL or default to 'All Users'
  const [activePage, setActivePage] = useState('All Users');
  const [activeTab, setActiveTab] = useState('activity');
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
    { id: 1, date: '2025-07-01', website: 'figma.com', status: 'Completed' },
    { id: 2, date: '2025-07-01', website: 'figma.com', status: 'In Progress' },
    { id: 3, date: '2025-07-02', website: 'figma.com', status: 'Failed' },
    { id: 4, date: '2025-07-02', website: 'figma.com', status: 'Completed' },
    { id: 5, date: '2025-07-03', website: 'figma.com', status: 'Completed' },
    { id: 6, date: '2025-07-03', website: 'figma.com', status: 'In Progress' },
    { id: 7, date: '2025-07-04', website: 'figma.com', status: 'Completed' },
    { id: 8, date: '2025-07-04', website: 'figma.com', status: 'In Progress' },
    { id: 9, date: '2025-07-05', website: 'figma.com', status: 'Failed' },
    { id: 10, date: '2025-07-05', website: 'figma.com', status: 'Completed' },
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
      <div className="flex-1 overflow-auto p-20 pt-0 pb-2 pl-12 pr-8">
        {/* Outer square container */}
        <div className="w-full h-full border-2 border-[#A2A1A833] rounded-lg p-4 px-0">

          {/* Inner square container */}
          <div className="relative left-5 w-full  border-2 border-[#A2A1A833] rounded">
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
              <div className="flex flex-row p-6 border border-[#A2A1A833]">
                {/* Profile Sidebar */}
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
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-3 px-4 py-3 transition
                          ${activeTab === item.id 
                            ? 'bg-[#7152F3] text-white rounded-[10px]' 
                            : 'text-[#16151C] hover:bg-gray-50'} 
                          font-['Lexend'] font-light text-base leading-6`}
                      >
                        <img 
                          src={item.icon} 
                          alt={item.label} 
                          className={`w-6 h-6 ${activeTab === item.id ? 'invert' : 'opacity-60'}`} 
                        />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scrollable Activity Feed */}
              <div className="flex-1 rounded-lg max-h-[420px] overflow-y-auto 
                [&::-webkit-scrollbar]:w-2 relative left-2
                [&::-webkit-scrollbar-thumb]:bg-[#7152F3] 
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-track]:rounded-full pr-10">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr className="font-['Lexend'] font-light text-base leading-6 text-[#A2A1A8] tracking-normal">
                      <th className="pr-1 pl-2 py-3 w-[150px] text-left">Date</th>
                      <th className="px-0 py-3 text-left">Website</th>
                      <th className="px-36 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedActivities.map((item) => (
                      <tr key={item.id} className="border-b border-t hover:bg-gray-50">
                        <td className="px-2 py-3 font-['Lexend'] font-light text-base leading-6 text-[#16151C] tracking-normal">{formatDate(item.date)}</td>
                        <td className="px-2 py-3 flex gap-[20px]">
                          <img src="/images/figma.png" alt="" className="w-5 h-5" />
                          <span className="font-medium text-[#7A5AF8] cursor-pointer">
                            Figma
                          </span>{' '}
                          - {item.website}
                        </td>
                        <td className="px-32 py-3 text-right">
                          <button className="font-[Lexend] font-light text-xs leading-[18px] tracking-normal text-[#F45B69] bg-[#F45B691A] px-3 py-1 rounded-md hover:bg-[#ffcccc] align-middle">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
      </div>
    </>
  );
};

export default UserProfile;