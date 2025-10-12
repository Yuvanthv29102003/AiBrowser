import React from 'react';

export interface ActivityItem {
  id: number;
  date: string;
  website: string;
  status: 'Completed' | 'In Progress' | 'Failed';
}

interface ActivityFeedProps {
  title?: string;
  activities: ActivityItem[];
}

const statusStyles = 'bg-[#F45B691A] text-[#F45B69] rounded-[4px]';

const ActivityFeed: React.FC<ActivityFeedProps> = ({ title, activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full h-full">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center w-[518px] h-[44px] gap-2.5 py-2.5 bg-white rounded-md">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <img src="/images/figma.png" alt="" className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="font-medium text-[#16151C]">Untitled</span>
                      <span className="text-gray-500">-</span>
                      <span className="font-medium text-[#16151C]">Figma</span>
                      <span className="pl-2 font-light text-[#16151C]">Figma.com</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold ${statusStyles}`}>
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityFeed;
