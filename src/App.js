import logo from "./logo.svg";
import "./App.css";
import { useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import { autos, columnDefs, sortType } from "./autos";

const App = () => {
  const [mp, setMP] = useState(autos);
  const columns = useMemo(() => columnDefs, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: mp }, useSortBy);

  const memoSortType = useMemo(sortType, [mp]);
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 32, marginBottom: 0 }}>
        Get a new Electric Vehicle for less than $300 a month with Tenet!
      </h1>
      <div style={{ padding: 36 }}>
        <table
          {...getTableProps()}
          style={{
            width: "100%",
            padding: 36,
            borderRadius: 16,
            background: "rgb(240, 248, 251)",
            height: "80vh",
            overflowY: "scroll",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  column.sortType = memoSortType;

                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        borderBottom: "solid 3px #c4c4c4",
                        color: "black",
                        fontWeight: "bold",
                        minWidth: 200,
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            style={{ maxHeight: "70vh", overflow: "scroll" }}
          >
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #C4c4c4",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
