import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-2 py-2 bg-white w-full h-full">
      {/* Left: Number of users with square border */}
      <div className="flex items-center pl-4">
        <span className="text-sm text-[#A2A1A8] mr-2">Showing</span>
        <div className="w-[76px] h-[46px] border border-[#A2A1A833] bg-white rounded-[10px] flex items-center justify-between px-3 text-sm font-medium">
          <span>{itemsPerPage}</span>
          <ChevronDown className="h-4 w-4 text-[#A2A1A8]" />
        </div>
      </div>
      
      {/* Center: Showing text */}
      <div className="text-sm text-[#A2A1A8]">
        Showing {startItem} to {endItem} of {totalItems} records
      </div>
      
      {/* Right: Page navigation */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-1.5 rounded-md ${currentPage === 1 ? 'text-[#A2A1A8] cursor-not-allowed' : 'text-[#A2A1A8] hover:bg-[#A2A1A833]'}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium border ${
              currentPage === page
                ? 'bg-white text-[rgba(113,82,243,1)] border-[rgba(113,82,243,1)]'
                : 'text-gray-600 hover:bg-gray-50 border-transparent'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-1.5 rounded-md ${
            currentPage === totalPages 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
