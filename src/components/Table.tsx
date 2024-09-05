import { StyledTable, PaginationContainer, ButtonContainer, TableContainer, MainContainer } from "../styled-components/Table";
import { ReactElement, useState, useEffect } from 'react';
import Button from "./Button.tsx";

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
    elementsPerPage: number | 0;
    errorMessage: string | null;
};
  
const Table = <T,>({ data, columns, elementsPerPage, errorMessage }: Props<T>) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [dataToDisplay, setDataToDisplay] = useState<T[]>([]);
    const currentData = data ? data : []
    const columnWidth = columns ? 100 / columns.length : 100


    const totalPages = Math.ceil(currentData.length / elementsPerPage);
  
    // Funciones para cambiar de página
    const goToNextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };
  
    const goToPreviousPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
  
    const goToPage = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const start = (currentPage - 1) * elementsPerPage;
        const end = currentPage * elementsPerPage;
        setDataToDisplay(currentData.slice(start, end));
      }, [currentPage]);
    

    const headers = columns.map((column, index) => {
        return (
        <th key={`headCell-${index}`} className="!z-0">
            {column.title}
        </th>
        );
    });

    const rows = !data?.length ? (
        <tr>
            <td colSpan={columns.length} className="text-center">
                <p>No hay datos para mostrar</p>
                {errorMessage && <a >Ver error</a>}
            </td>
        </tr>
    ) : (
        dataToDisplay.map((row, index) => {
        return (
            <tr key={`row-${index}`}>
                {columns.map((column, index2) => {

                    const value = column.render
                    ? column.render(column, row as T)
                    : (row[column.key as keyof typeof row] as string);

                    return <td key={`cell-${index2}`}>{value}</td>;
                })}
            </tr>
        );
        })
    );

    return (
        <MainContainer>
            <TableContainer>
                    <StyledTable columnWidth={columnWidth}>
                        <thead>
                            <tr>{headers}</tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </StyledTable>
            </TableContainer>
            <PaginationContainer>
                <ButtonContainer>
                    <Button label="Anterior" onClick={goToPreviousPage} disabled={currentPage === 1} />

                    {[...Array(totalPages)].map((_, index) => (
                        <Button
                        key={index}
                        onClick={() => goToPage(index + 1)}
                        disabled={currentPage === index + 1}
                        label={(index + 1).toString()}
                        />
                    ))}
                    <Button label="Siguiente" onClick={goToNextPage} disabled={currentPage === totalPages}/>
                </ButtonContainer>
            </PaginationContainer>
        </MainContainer>
    );
};

export default Table;