import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./Components/layout/Topbar";
import UserProfile from "./Pages/user/UserProfile";
import Sidebar from "./Components/sidebar/Sidebar";
import AllUsers from "./Pages/allusers/AllUsers";

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState("All Users");
  const location = useLocation();

  // Update active page based on route
  useEffect(() => {
    if (location.pathname === '/') {
      setActivePage('All Users');
    } else if (location.pathname.startsWith('/users/')) {
      setActivePage('User Profile');
    } else {
      setActivePage('Dashboard');
    }
  }, [location]);
  
  return (
    <div className="flex h-screen bg-[#FFFFFF] overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-[280px] h-full flex-shrink-0">
        <Sidebar setActivePage={setActivePage} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<AllUsers />} />
          <Route path="/users/:userId" element={<UserProfile />} />
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
