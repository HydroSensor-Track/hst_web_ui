import React from 'react';
import StyledSelect from '../styled-components/StyledSelect.tsx';

interface FilterSelectProps {
    placeholder?: string;
    options?: string[]; // Array of options as strings
    selectedValues?: string[]; // Array of selected values
    setSelectedValues?: (values: string[]) => void; // Function to set selected values
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ placeholder, options, selectedValues, setSelectedValues }) => {
    // Format options for react-select (label and value)
    const formattedOptions = options?.map(option => ({
        value: option,
        label: option
    })) || [];

    const handleChange = (selectedOption: any) => {
        if (setSelectedValues) {
            const values = selectedOption ? selectedOption.map((option: any) => option.value) : [];
            setSelectedValues(values);
        }
    };

    return (
        <StyledSelect
            isMulti
            options={formattedOptions} // Provide formatted options
            value={formattedOptions.filter(option => selectedValues?.includes(option.value))} // Set selected values
            onChange={handleChange} // Handle change event
            placeholder={placeholder || "Select options"} // Display placeholder text
            classNamePrefix="custom-select" // Use the prefix for custom styles
        />
    );
};
