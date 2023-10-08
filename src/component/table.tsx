import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Search from "./search"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  columns?: any;
  data?: any;
  id?: any;
}

function Table({ columns, data, id }: Props) {
  const navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  useEffect(() => { console.log(rows) })

  return (
    <>
      <Search onSubmit={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                <button onClick={() => navigate(`/detail/${id[row.id]}`)}>상세 보기</button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
