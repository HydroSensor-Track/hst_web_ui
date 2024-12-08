import { forwardRef, useEffect, useState } from 'react';
import DateRangePicker, { DateRange } from 'rsuite/DateRangePicker';
import theme from '../config/Theme';

interface DateHeaderProps {
    title: string;
    columnKey: string;
    filterable: boolean;
    startDate: Date;
    endDate: Date;
    activeFilter: string | null;
    filters: Record<string, [Date | null, Date | null]>;
    setActiveFilter: (key: string | null) => void;
    handleFilterDates: ((columnKey: string, date: DateRange) => void);
    handleReset: () => void;
}


const DateHeader = forwardRef<HTMLDivElement, DateHeaderProps>(({
    title,
    columnKey,
    filterable,
    startDate,
    endDate,
    activeFilter,
    filters,
    setActiveFilter,
    handleFilterDates,
    handleReset
}, ref) => {
    const isActive = activeFilter === columnKey;

    const [filtered, setFiltered] = useState(false)

    const [dateRange, setDateRange] = useState<[Date, Date]>([
        startDate,
        endDate,
    ]);

    const handleSelect = (range: [Date, Date]) => {
        setDateRange(range);
        handleFilterDates(columnKey, range);
        setActiveFilter(null)
    };

    const handleClear = () => {
        setDateRange([startDate, endDate]);
        setFiltered(false)
        handleReset();
        setActiveFilter(null)
    };

    useEffect(() => {
        if (filters[columnKey]) {  
            setFiltered(true)
        } else {
            setFiltered(false)
        }
    }, [filters, columnKey])


    return (
        <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
            <span>{title}</span>
            {filterable && (
                <>
                    <button
                        onClick={() => setActiveFilter(isActive ? null : columnKey)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            marginLeft: '5px',
                            color:  filtered ? theme.colors.primary : 'white'
                        }}
                    >
                        ▼
                    </button>
                    {isActive && (
                        <div onClick={(e) => e.stopPropagation()} style={{position: "absolute", width: "400px"}}>
                            <DateRangePicker
                                value={dateRange}
                                onOk={(e) => handleSelect(e)}
                                format="MM/dd/yyyy HH:mm"
                                style={{width: "100%"}}
                                open={true}
                                onClean={handleClear} // Limpia los filtros
                                showHeader={false}
                                />
                        </div>
                    )}
                </>
            )}
        </div>
    );
});

export default DateHeader;
