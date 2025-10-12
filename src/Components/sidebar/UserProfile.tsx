import React from "react";

const UserProfile = ({ dark }: { dark: boolean }) => {
  return (
    <div
      className={`flex items-center p-3 rounded-lg ${
        dark ? "hover:bg-[#2B2C2F]" : "hover:bg-gray-100"
      } transition-colors cursor-pointer`}
    >
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
        U
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">User Name</p>
        <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
          user@example.com
        </p>
      </div>
      <span className={`text-lg ${dark ? "text-gray-400" : "text-gray-500"}`}>
        ⋮
      </span>
    </div>
  );
};

export default UserProfile;
