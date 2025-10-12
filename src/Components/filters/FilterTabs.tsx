import React from 'react';
import Button from '../buttons/Button';

type UserStatus = 'active' | 'inactive' | 'suspended' | 'banned' | 'all';

interface FilterTabsProps {
  activeFilter: UserStatus;
  onFilterChange: (filter: UserStatus) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all' as const, label: 'All Users' }
  ];

  return (
    <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          label={filter.label}
          active={activeFilter === filter.id}
          onClick={() => onFilterChange(filter.id)}
          className="whitespace-nowrap px-4"
        />
      ))}
    </div>
  );
};

export default FilterTabs;
