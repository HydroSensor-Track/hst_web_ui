
// import { Select } from "../styled-components/Filter";
import { MultiSelect } from 'primereact/multiselect';
import { useState } from 'react';

interface FilterSelectProps {
    placeholder?: string;
    options?: string[];
    selectedValues?: string[];
    setSelectedValues?: any;
  }


 export const FilterSelect: React.FC<FilterSelectProps> = ({ placeholder, options, selectedValues, setSelectedValues }) => {
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
      <div className="card flex justify-content-center">
          <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" 
              placeholder="Select Cities" maxSelectedLabels={1} className="w-full md:w-20rem" />
      </div>
  );
    // return (
    //   // <Select multiple onChange={onChangeMethod}>
    //   //   <option value="all" selected>
    //   //     {placeholder}
    //   //   </option>
    //   //   {options.map((option) => (
    //   //     <option key={option} value={option}>
    //   //       {option}
    //   //     </option>
    //   //   ))}
    //   // </Select>
    // );
  };
