import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TableCell from "./tablecomponents/TableCell";

const GraphTable = ({ table }) => {
  const [headers, setHeaders] = useState(table.data[0]);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([...table.data]);

  useEffect(() => {
    if (headers) {
      for (const key in headers) {
        const nuevoObjeto = {
          field: key,
          headerName: key.toLocaleUpperCase(),
          renderCell: ({ row }) => {
            return (
              <TableCell row={row} setRows={setRows}>
                {key}
              </TableCell>
            );
          },
        };
        setColumns((prev) => [...prev, nuevoObjeto]);
      }
    }
  }, []);

  const createRow = () => {
    const newRow = {};
    for (const columName in headers) {
      newRow[columName] = columName == "id" ? rows.length + 1 : "";
    }
    const addRows = [...rows, newRow];
    setRows(addRows);
  };

  return (
    <>
      <h3>{table.title}</h3>
      <p>{table.description}</p>
      <Box>
        <button onClick={createRow}>click to add a row</button>
      </Box>
      <Box key={table.id}>
        <DataGrid columns={columns} rows={rows} getRowId={(row) => uuidv4()} />
      </Box>
    </>
  );
};
export default GraphTable;
