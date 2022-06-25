import { useTable } from "react-table";

import global from "@/styles/global.module.scss";
import { sagaActions } from "@/redux/sagas/sagaActions";
import { useDispatch } from "react-redux";

type Props = {
  columns: any;
  data: {
    id: number;
    name: string;
    manufactureDate: string;
    perishable: boolean;
    expirationDate: string;
    price: string;
  }[];
};

const { VITE_API_URL: api_url } = import.meta.env; // Variable Environment

export function ExampleTable({ columns, data }: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const dispatch = useDispatch();
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <td {...column.getHeaderProps()}>{column.render("Header")}</td>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.original.id}>
              {row.cells.map((cell) => {
                if (
                  !cell.row.original.perishable &&
                  cell.column.id === "expirationDate"
                ) {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={`${cell.column.Header}_${cell.row.original.id}`}
                    >
                      <span
                        className={global.span}
                        data-title={cell.column.Header}
                      ></span>

                      <span className={global.cellValue}>Não perecível</span>
                    </td>
                  );
                }

                if (cell.column.id === "actions") {
                  return (
                    <td
                      data-title={cell.column.Header}
                      {...cell.getCellProps()}
                      key={`${cell.column.Header}_${cell.row.original.id}`}
                    >
                      <span
                        className={global.span}
                        data-title={cell.column.Header}
                      ></span>

                      <span className={global.cellValue}>
                        <button className={global.btnIcon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4285F4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          className={global.btnIcon}
                          onClick={() => {
                            dispatch({
                              type: sagaActions.DELETE_PRODUCTS_SAGA,
                              payload: {
                                url: `${api_url}/products`,
                                params: { id: cell.row.original.id },
                              },
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#DB4437"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </span>
                    </td>
                  );
                }

                /* if (
                  cell.column.id === "manufactureDate" ||
                  cell.column.id === "expirationDate"
                ) {
                  return (
                    <td
                      data-title={cell.column.Header}
                      {...cell.getCellProps()}

                      key={`${cell.column.Header}_${cell.row.original.id}`}
                    >
                      <span
                        className={global.span}
                        data-title={cell.column.Header}
                      ></span>

                      <span className={global.cellValue}>
                        {new Date(
                          cell.row.original.manufactureDate
                        ).toLocaleDateString()}
                      </span>
                    </td>
                  );
                } */
                return (
                  <td data-title={cell.column.Header} {...cell.getCellProps()}>
                    <span
                      className={global.span}
                      data-title={cell.column.Header}
                    ></span>

                    <span className={global.cellValue}>
                      {cell.render("Cell")}
                    </span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
