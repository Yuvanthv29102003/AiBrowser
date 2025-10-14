import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./Components/layout/Topbar";
import UserProfile from "./Pages/user/UserProfile";
import Sidebar from "./Components/sidebar/Sidebar";
import Profile from './Pages/user/Profile';
import AllUsers from "./Pages/allusers/AllUsers";
import Downloads from "./Pages/user/Downloads";
import Bookmarks from "./Pages/user/Bookmarks";
import Dashboard from "./Pages/user/Dashboard";

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState("All Users");
  const location = useLocation();

  // Update active page based on route
  useEffect(() => {
    if (location.pathname === '/') {
      setActivePage('All Users');
    } else if (location.pathname.startsWith('/users/') && location.pathname.endsWith('/downloads')) {
      setActivePage('Downloads');
    } else if (location.pathname.startsWith('/users/') && location.pathname.endsWith('/bookmarks')) {
      setActivePage('Bookmarks');
    } else if (location.pathname.startsWith('/users/')) {
      setActivePage('User Profile');
    } else {
      setActivePage('Dashboard');
    }
  }, [location]);
  
  return (
    <div className="flex h-full w-full bg-[#FFFFFF] overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-[320px] h-full flex-shrink-0">
        <Sidebar setActivePage={setActivePage} activePage={activePage} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<AllUsers />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/users/:userId/profile" element={<Profile />} />
          <Route path="/users/:userId/downloads" element={<Downloads />} />
          <Route path="/users/:userId/bookmarks" element={<Bookmarks />} />
          <Route path="/users/:userId/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
