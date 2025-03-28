import React from 'react';

interface FilterProps {
  options: string[];
  onFilterChange: (selectedOptions: string[]) => void;
}

export default function Filter({ options, onFilterChange }: FilterProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOptions = options.filter((option, index) => {
      const checkbox = document.getElementById(`filter-${index}`) as HTMLInputElement;
      return checkbox?.checked;
    });
    onFilterChange(selectedOptions);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Filters</h3>
      {options.map((option, index) => (
        <div key={index} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              id={`filter-${index}`}
              className="form-checkbox h-5 w-5 text-blue-500"
              onChange={handleCheckboxChange}
            />
            <span className="ml-2 text-gray-700">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
