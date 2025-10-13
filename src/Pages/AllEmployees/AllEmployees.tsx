import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import type { UserStatus, TableColumn, Employee } from '../../types';
import Topbar from "../../Components/layout/Topbar";
import Table from "../../Components/table/Table";
import Button from "../../Components/buttons/Button";
import Pagination from "../../Components/table/Pagination";
import mockEmployees from "../../mock/employees";

const ITEMS_PER_PAGE = 10;

interface AllEmployeesProps {
  onMount?: () => void;
}

const AllEmployees: React.FC<AllEmployeesProps> = ({ onMount }) => {
  React.useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter] = useState<UserStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const columns: TableColumn<Employee>[] = useMemo(() => [
    { 
      header: 'Employee Name', 
      accessor: 'name',
      className: 'text-[#16151C] font-medium',
      render: (name: string, user: Employee) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-500">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            )}
          </div>
          <span>{name}</span>
        </div>
      )
    },
    { 
      header: 'Employee ID', 
      accessor: 'id',
      className: 'text-[#16151C]' 
    },
    { 
      header: 'Department', 
      accessor: 'department',
      className: 'text-[#16151C]' 
    },
    { 
      header: 'Designation', 
      accessor: 'designation',
      className: 'text-[#16151C]' 
    },
    { 
      header: 'Type', 
      accessor: 'type',
      className: 'text-[#16151C]' 
    },
    { 
      header: 'Status', 
      accessor: 'activity',
      className: 'text-[#16151C]',
      render: (value: string) => (
        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-[4px] text-xs font-medium bg-[#7152F31A] text-[#7152F3]">
          {value}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      className: 'pl-2',
      render: (_, user) => (
        <div className="flex items-center space-x-1">
          <button 
            className="text-[#16151C] hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              console.log('View user:', user.id);
            }}
            title="View"
          >
            <img src="/images/view.png" className="w-5 h-5" alt="View" />
          </button>
          <button 
            className="text-[#16151C] hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit user:', user.id);
            }}
            title="Edit"
          >
            <img src="/images/edit.png" className="w-5 h-5" alt="Edit" />
          </button>
          <button 
            className="text-[#16151C] hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                console.log('Delete user:', user.id);
                // Add your delete logic here
              }
            }}
            title="Delete"
          >
            <img src="/images/trash.png" className="w-5 h-5" alt="Delete" />
          </button>
        </div>
      ),
    }
  ], []);

  const employees: Employee[] = useMemo(() => mockEmployees, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.id.includes(searchQuery) ||
        employee.email?.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeFilter === 'all' || !activeFilter) return matchesSearch;
      return matchesSearch && employee.status === activeFilter;
    });
  }, [employees, searchQuery, activeFilter]);

  // Calculate paginated data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);
  // Reset to first page when filters or search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const navigate = useNavigate();

  const handleRowClick = (employee: Employee) => {
    navigate(`/users/${employee.id}`);
  };

  return (
    <div className="w-full flex flex-col bg-white">
      <div className="mb-4">
        <Topbar 
          title={
            <div className="font-['Lexend'] font-light text-[16px] leading-6 text-[#16151C]">
              All Employees
            </div>
          } 
          subtitle="All Employee Information"
          subtitleClassName="text-[14px] leading-5 text-[#A2A1A8] font-light"
        />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Search and Filter Bar */}
        <div className="p-4  flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border border-[#A2A1A81A] rounded-lg">
              <img src="/images/search.png" className="h-[20px] w-[20px]" alt="Search" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-[#A2A1A81A] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-[#16151C33] placeholder:font-light"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-3 w-full md:w-auto">
            <Button 
              label={
                <div className="flex items-center space-x-2">
                  <img src="/images/add.png" className="h-[24px] w-[24px]" alt="Add" />
                  <span className="text-base leading-6 text-white text-[16px] font-medium">Add New Employee</span>
                </div>
              }
              style={{ backgroundColor: '#7251F4', color: 'white' }}
              className="px-4 py-2 rounded-lg text-sm hover:bg-[#5e44d1]"
            />
            <Button 
              label={
                <div className="flex items-center space-x-2">
                  <img src="/images/filter.png" className="h-[24px] w-[24px]" alt="Filter" />
                  <span className="text-base leading-6 text-black text-[16px] font-medium">Filter</span>
                </div>
              }
              className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="px-1 overflow-hidden ">
          <div className="overflow-auto text-sm">
            {paginatedUsers.length > 0 ? (
              <Table 
                columns={columns}
                data={paginatedUsers}
                onRowClick={handleRowClick}
                rowClassName="hover:bg-gray-50"
              />
              // <UserTable/>
            ) : (
              <div className="text-center py-10 text-gray-500">
                No users found matching your search criteria
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-1 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE)}
              onPageChange={setCurrentPage}
              totalItems={filteredEmployees.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployees;
