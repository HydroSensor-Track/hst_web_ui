
import { Select } from "../styled-components/Filter";


interface FilterSelectProps {
    placeholder: string;
    options: string[];
  }


 export const FilterSelect: React.FC<FilterSelectProps> = ({ placeholder, options }) => {
    return (
      <Select>
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  };

