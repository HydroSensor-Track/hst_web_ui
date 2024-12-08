import {
    StyledTable,
    PaginationContainer,
    ButtonContainer,
    TableContainer,
    MainContainer,
    StyledButton,
} from "../styled-components/Table";
import { ReactElement, useState, useEffect, useRef} from 'react';
import {Ticket, TicketCategoryDict, TicketStatusDict} from "../interfaces/tickets.ts";
import FilterHeader from "./FilterHeader.tsx";
import {StyledViewDetails} from "../styled-components/Tickets.tsx";
import {useTranslation} from "react-i18next";
import DateHeader from "./DateHeader.tsx";

export interface ColumnProps<T> {
    key: string;
    title: string;
    filterable: boolean;
    date?: boolean;
    values?: string[];
    render?: (column: ColumnProps<T>, item: T) => ReactElement;
}

type Props<T> = {
    data?: T[];
    elementsPerPage: number;
    errorMessage: string | null;
    handleViewDetails: (ticketId: string) => void;
};

const Table = <T,>({ data = [], elementsPerPage, errorMessage, handleViewDetails }: Props<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [dateFilters, setDateFilters] = useState<Record<string, [Date | null, Date | null]>>({});
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const { t } = useTranslation();

    const dateHeaderRef = useRef<HTMLDivElement | null>(null);

    const totalPages = Math.ceil(data.length / elementsPerPage);

    const columns: Array<ColumnProps<Ticket>> = [
        {
            title: "ID",
            key: 'idTicket',
            filterable: true,
        },
        {
            title: "Fecha",
            key: 'createdDate',
            filterable: true,
            date: true,
            render: (_, row) => {
                const date = new Date(row.createdDate);
                return <span>{date.toLocaleDateString()}</span>;
            }
        },
        {
            title: "Última actualización",
            key: 'updatedDate',
            filterable: true,
            date: true,
            render: (_, row) => {
                const date = new Date(row.updatedDate);
                return <span>{date.toLocaleDateString()}</span>;
            }
        },
        {
            title: "Locación",
            key: 'location',
            filterable: true,
        },
        {
            title: "Sensor",
            key: 'sensor',
            filterable: true,
        },
        {
            title: "Estado",
            key: 'status',
            filterable: true,
            values: Object.values(TicketStatusDict),
            render: (_, row) => {
                return <p>{TicketStatusDict[row.status]}</p>;
            }
        },
        {
            title: "Asignado",
            key: 'assignee',
            filterable: true,
            render: (_, row) => {
                return row.assignee ? <p>{row.assignee}</p> : <p>{t('noAssignee')}</p>;
            }
        },
        {
            title: "Categoría",
            key: 'category',
            filterable: true,
            values: Object.values(TicketCategoryDict),
            render: (_, row) => {
                return <p>{TicketCategoryDict[row.category]}</p>;
            }
        },
        {
            title: "Creado por",
            key: 'createdBy',
            filterable: true,
        },
        {
            title: "Detalles",
            key: 'viewDetails',
            filterable: false,
            render: (_, row) => {
                return (
                    <StyledViewDetails onClick={() => handleViewDetails(row.idTicket)}>
                        {t('viewDetails')}
                    </StyledViewDetails>
                );
            }
        },
    ];

    const generateFilterOptions = <T,>(data: T[], columnKey: string): string[] => {
        const uniqueValues = new Set<string>();
        data.forEach((row) => {
            const value = row[columnKey as keyof T];
            if (typeof value === 'string' || typeof value === 'number') {
                uniqueValues.add(String(value));
            }
        });
        return Array.from(uniqueValues);
    };

    const filterOptions = columns.reduce<Record<string, string[]>>((options, column) => {
        if (column.filterable) {
            options[column.key] = generateFilterOptions(data, column.key);
        }
        return options;
    }, {});

    const normalizeDate = (date: Date): Date => {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0); // Configura la hora a 00:00:00
        return normalized;
    };

    const filteredData = data.filter((row) =>
        columns.every((column) => {
            const selectedValues = filters[column.key];
            const dateRange = dateFilters[column.key];
    
            if (column.date && dateRange) {
                const [startDate, endDate] = dateRange;
                const rowDate = normalizeDate(new Date(row[column.key as keyof T] as string));
                return (
                    (!startDate || rowDate >= normalizeDate(startDate)) &&
                    (!endDate || rowDate <= normalizeDate(endDate))
                );
            }
    
            if (selectedValues && selectedValues.length > 0) {
                const rowValue = row[column.key as keyof T];
                const rowValueString = rowValue?.toString() !== undefined ? rowValue?.toString() : "";
                return selectedValues.includes(rowValueString);
            }
    
            return true;
        })
    );

    const calculateDateRange = (data: T[], columnKey: string): [Date, Date] => {
        const dates = data
            .map((row) => normalizeDate(new Date(row[columnKey as keyof T] as string)))
            .filter((date) => !isNaN(date.getTime())); // Excluir fechas inválidas
    
        const minDate = new Date(Math.min(...dates.map((date) => date.getTime())));
        const maxDate = new Date(Math.max(...dates.map((date) => date.getTime())));
    
        return [minDate, maxDate];
    };
    
    const resetDateFilters = (columnKey: string) => {
        setDateFilters((current) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[columnKey]:_, ...rest} = current;
            return rest;
        })
    }

    const resetFilters = (columnKey: string) => {
        setFilters((current) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[columnKey]:_, ...rest} = current;
            return rest;
        })
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(Math.min(Math.max(newPage, 1), totalPages));
    };

    const handleFilterByDate = (columnKey: string, range: [Date | null, Date | null]) => {
        setDateFilters((prevFilters) => ({
            ...prevFilters,
            [columnKey]: range.map((date) => (date ? normalizeDate(date) : null)) as [Date | null, Date | null],
        }));
    };

    const paginatedData = filteredData.slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage);

    const headers = columns.map((column, index) => {
        const isIdColumn = column.key === "idTicket";

        if (column.date) {
            const [minDate, maxDate] = calculateDateRange(data, column.key);
    
            return (
                <th 
                    key={index}
                    style={isIdColumn ? { width: "10px" } : undefined}>
                    <DateHeader
                        ref={dateHeaderRef}
                        title={column.title}
                        columnKey={column.key}
                        filterable={column.filterable}
                        startDate={minDate} // Fecha mínima inicial
                        endDate={maxDate}   // Fecha máxima inicial
                        activeFilter={activeFilter}
                        filters={dateFilters}
                        setActiveFilter={setActiveFilter}
                        handleFilterDates={handleFilterByDate}
                        handleReset={() => resetDateFilters(column.key)} // Función para resetear
                    />
                </th>
            );
        }

        return (
            <th key={index}>
                <FilterHeader
                        title={column.title}
                        columnKey={column.key}
                        filterable={column.filterable && filterOptions[column.key]?.length > 0}
                        options={filterOptions[column.key]}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        filters={filters}
                        setFilters={setFilters}
                        handleReset={() => resetFilters(column.key)}
                        />
            </th>
        )

    });

    const rows = paginatedData.length ? (
        paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                    const isIdColumn = column.key === "idTicket";
                    const value = column.render
                        ? column.render(column, row as Ticket)
                        : (row[column.key as keyof T] as string);
                    return <td 
                            key={colIndex}
                            style={isIdColumn ? { width: "100px", textAlign: "center" } : undefined}>
                                {value}
                            </td>;
                })}
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={columns.length} className="text-center">
                <p>No hay datos disponibles</p>
                {errorMessage && <a href="#error">Ver error</a>}
            </td>
        </tr>
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                !event.target?.closest('th') && (!dateHeaderRef.current || !dateHeaderRef.current.contains(target))
            ) {
                setActiveFilter(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
                        Anterior
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
                        Siguiente
                    </StyledButton>
                </ButtonContainer>
            </PaginationContainer>
        </MainContainer>
    );
};

export default Table;
