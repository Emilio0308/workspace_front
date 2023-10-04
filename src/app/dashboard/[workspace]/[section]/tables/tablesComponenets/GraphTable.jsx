import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const GraphTable = ({ table }) => {
  const [headers, setHeaders] = useState(table.data[0]);

  const columns = [];

  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      const nuevoObjeto = {
        field: key,
        headerName: key.toLocaleUpperCase(),
      };
      columns.push(nuevoObjeto);
    }
  }

  return (
    <>
      <h3>{table.title}</h3>
      <p>{table.description}</p>
      <Box key={table.id}>
        <DataGrid
          columns={columns}
          rows={table.data}
          getRowId={(row) => uuidv4()}
        />
      </Box>
    </>
  );
};
export default GraphTable;
