import React, { useEffect, useState } from 'react';

import theme from '../config/Theme';

interface FilterHeaderProps {
    title: string;
    columnKey: string;
    filterable: boolean;
    options?: string[];
    activeFilter: string | null;
    setActiveFilter: (key: string | null) => void;
    filters: Record<string, string[]>;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
    handleReset: () => void;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
    title,
    columnKey,
    filterable,
    options = [],
    activeFilter,
    setActiveFilter,
    filters,
    setFilters,
    handleReset
}) => {
    const isActive = activeFilter === columnKey;
    const [filtered, setFiltered] = useState(false)

    const handleClear = () => {
        setFiltered(false)
        handleReset();
        setActiveFilter(null)
    };

    useEffect(() => {
        if (filters[columnKey]) {   
            setFiltered(filters[columnKey].length > 0 ? true : false)
        }
    }, [filters, columnKey])

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <span>{title}</span>
            {filterable && (
                <>
                    <button
                        onClick={() => setActiveFilter(isActive ? null : columnKey)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '2vh',
                            margin: '0',
                            color: filtered ? theme.colors.primary : 'white'
                        }}
                    >
                        ▼
                    </button>
                    {isActive && (
                        <ul
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                background: 'white',
                                listStyle: 'none',
                                padding: '2vh',
                                zIndex: 1000,
                                maxHeight: '25vh',
                                overflowY: 'auto',
                                width: "20vh",
                                borderRadius: "12px"
                            }}
                        >
                             <li key={"clear"} style={{ margin: '0 0 1rem 0', color: theme.colors.darkGray}}>
                                <label style={{display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <button 
                                        onClick={handleClear}
                                        style={{
                                            textAlign: "center", 
                                            width: "100%", 
                                            border: "none", 
                                            borderRadius: "12px", 
                                            fontWeight: "bold", 
                                            backgroundColor: "pink", 
                                            color: "red", 
                                            cursor: "pointer"}}>
                                            Clear filters
                                    </button>
                                </label>
                            </li>
                            {options.map((option) => (
                                <li key={option} style={{ margin: '0.5rem 0', color: theme.colors.darkGray}}>
                                    <label style={{display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <input
                                            type="checkbox"
                                            checked={filters[columnKey]?.includes(option) || false}
                                            onChange={(e) => {
                                                const selected = filters[columnKey] || [];
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    [columnKey]: e.target.checked
                                                        ? [...selected, option]
                                                        : selected.filter((v) => v !== option),
                                                }));
                                            }}
                                            style={{width: "20%"}}
                                        />
                                        <div style={{textAlign: "left", width: "80%"}}>{option}</div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default FilterHeader;
