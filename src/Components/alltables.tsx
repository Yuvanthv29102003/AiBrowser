import React from "react";

type User = {
  id: number;
  name: string;
  mobile: string;
  gender: string;
  country: string;
  activityTime: string;
  avatar: string;
};

const users: User[] = [
  {
    id: 3434,
    name: "Darlene Robertson",
    mobile: "345321231",
    gender: "Male",
    country: "India",
    activityTime: "30 Min.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 3434,
    name: "Floyd Miles",
    mobile: "987890345",
    gender: "Female",
    country: "India",
    activityTime: "30 Min.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
];

const UserTable: React.FC = () => {
  return (
    <div className="overflow-x-auto pr-0"> {/* 👈 remove right padding */}
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-[13px] font-medium text-gray-600">
            <th className="py-2 px-2 w-[15%]">User Name</th>
            <th className="py-2 px-2 w-[15%]">User ID</th>
            <th className="py-2 px-2 w-[8%]">Mobile No.</th>
            <th className="py-2 px-2 w-[8%]">Gender</th>
            <th className="py-2 px-2 w-[3%]">Country</th>
            <th className="py-2 px-2 w-[4%] whitespace-nowrap">Activity Time</th>
            <th className="py-2 px-2 text-left w-[50%]">Action</th>
          </tr>
        </thead>

        <tbody className="text-[13px] text-gray-700">
          {users.map((user, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="py-2 px-2 flex items-center gap-2 truncate">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full"
                />
                <span className="truncate">{user.name}</span>
              </td>
              <td className="py-2 px-2 truncate">{user.id}</td>
              <td className="py-2 px-2 truncate">{user.mobile}</td>
              <td className="py-2 px-2 truncate">{user.gender}</td>
              <td className="py-2 px-2 truncate">{user.country}</td>
              <td className="py-2 px-2 truncate">
                <span className="bg-purple-100 text-purple-600 px-2 py-[2px] rounded-md text-[11px] font-medium">
                  {user.activityTime}
                </span>
              </td>
              <td className="py-2 px-1 flex items-center gap-1 text-gray-500">
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
