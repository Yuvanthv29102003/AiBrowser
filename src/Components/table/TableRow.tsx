import React from "react";

interface TableRowProps {
  user: {
    name: string;
    id: string;
    mobile: string;
    gender: string;
    country: string;
    activity: string;
  };
}

const TableRow: React.FC<TableRowProps> = ({ user }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2 text-sm">{user.name}</td>
      <td className="py-2 text-sm">{user.id}</td>
      <td className="py-2 text-sm">{user.mobile}</td>
      <td className="py-2 text-sm">{user.gender}</td>
      <td className="py-2 text-sm">{user.country}</td>
      <td className="py-2 text-sm">{user.activity}</td>
      <td className="py-2 text-sm text-blue-500 cursor-pointer">
        View
      </td>
    </tr>
  );
};

export default TableRow;
