import {
    StyledTable,
    PaginationContainer,
    ButtonContainer,
    TableContainer,
    MainContainer,
    StyledFilterButton,
    StyledButton,
    Dots
} from "../styled-components/Table";
import { ReactElement, useState, useEffect, useRef } from 'react';
import Button from "./Button.tsx";
import StyledSelect from "../styled-components/StyledSelect.tsx";

export interface ColumnProps<T> {
    key: string;
    title: string;
    filterable: boolean;
    values?: string[];
    render?: (column: ColumnProps<T>, item: T) => ReactElement;
}

type Props<T> = {
    columns: Array<ColumnProps<T>>;
    data?: T[];
    elementsPerPage: number;
    errorMessage: string | null;
};

const FilterPanel = ({
                         columnKey,
                         options,
                         selectedOptions,
                         setSelectedOptions,
                     }: {
    columnKey: string;
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: (columnKey: string, values: string[]) => void;
}) => {
    const handleChange = (selected: any) => {
        const values = selected ? selected.map((opt: any) => opt.value) : [];
        setSelectedOptions(columnKey, values);
    };

    const formattedOptions = options.map((option) => ({
        value: option,
        label: option,
    }));

    return (
        <div style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', padding: '10px' }}>
            <StyledSelect
                isMulti
                value={formattedOptions.filter(opt => selectedOptions.includes(opt.value))}
                onChange={handleChange}
                options={formattedOptions}
                placeholder="Select options"
                classNamePrefix="custom-select"
            />
        </div>
    );
};

const Table = <T,>({ data = [], columns, elementsPerPage, errorMessage }: Props<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const totalPages = Math.ceil(data.length / elementsPerPage);

    const filteredData = data.filter(row =>
        columns.every(column => {
            const selectedValues = filters[column.key] || [];
            if (selectedValues.length === 0) return true;
            const rowValue = row[column.key as keyof T] as string;
            return selectedValues.includes(rowValue);
        })
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(Math.min(Math.max(newPage, 1), totalPages));
    };

    // Add ref for the filter panel
    const filterPanelRef = useRef<HTMLDivElement | null>(null);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterPanelRef.current && !filterPanelRef.current.contains(event.target as Node)) {
                setActiveFilter(null); // Only close when click is outside the panel
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const paginatedData = filteredData.slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage);

    const getUniqueValues = (key: string) => Array.from(new Set(data.map(item => item[key as keyof T])));

    const headers = columns.map((column, index) => {
        const isActive = filters[column.key] && filters[column.key].length > 0;
        return(
        <th key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {column.title}
                <StyledFilterButton onClick={() => setActiveFilter(column.key)} isActive={isActive}/>
                {activeFilter === column.key && (
                    <div ref={filterPanelRef}>
                        <FilterPanel
                            columnKey={column.key}
                            options={getUniqueValues(column.key) as string[]}
                            selectedOptions={filters[column.key] || []}
                            setSelectedOptions={(key, values) => setFilters(prev => ({ ...prev, [key]: values }))}
                        />
                    </div>
                )}
            </div>
        </th>
        );
    });

    const rows = paginatedData.length ? (
        paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                    const value = column.render
                        ? column.render(column, row)
                        : (row[column.key as keyof T] as string);
                    return <td key={colIndex}>{value}</td>;
                })}
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={columns.length} className="text-center">
                <p>No data available</p>
                {errorMessage && <a href="#error">View error</a>}
            </td>
        </tr>
    );

    return (
        <MainContainer>
            <TableContainer>
                <StyledTable columnWidth={100 / columns.length}>
                    <thead>
                    <tr>{headers}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </StyledTable>
            </TableContainer>
            <PaginationContainer>
                <ButtonContainer>
                    <StyledButton
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </StyledButton>

                    {[...Array(totalPages)]
                        .map((_, i) => i + 1)
                        .filter((page) => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
                        .map((page) => (
                            <StyledButton
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={currentPage === page}
                            >
                                {page}
                            </StyledButton>
                        ))}

                    <StyledButton
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </StyledButton>
                </ButtonContainer>
            </PaginationContainer>
        </MainContainer>
    );
};

export default Table;
