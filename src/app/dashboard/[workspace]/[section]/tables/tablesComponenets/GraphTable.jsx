import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import InputLogin from "../../../../../components/InputLogin";
import TableCell from "./tablecomponents/TableCell";
import UpdateTask from "./tablecomponents/UpdateTask";

const GraphTable = ({ table, reFetchTables }) => {
  const [headers, setHeaders] = useState(table.data[0]);
  const [newColumnName, setNewColumnName] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([...table.data]);

  useEffect(() => {
    setRows([...table.data])
  }, [table])
  

  class GenerateRow {
    constructor(field) {
      this.field = field;
      this.headerName = field.toLocaleUpperCase();
    }
    renderCell = ({ row }) => (
      <TableCell row={row} setRows={setRows}>
        {this.field}
      </TableCell>
    );
  }

  useEffect(() => {
    if (headers) {
      for (const header in headers) {
        // const nuevoObjeto = {
        //   field: header,
        //   headerName: header.toLocaleUpperCase(),
        //   renderCell: ({ row }) => {
        //     return (
        //       <TableCell row={row} setRows={setRows}>
        //         {header}
        //       </TableCell>
        //     );
        //   },
        // };
        const newTableHeader = new GenerateRow(header);
        setColumns((prev) => [...prev, newTableHeader]);
      }
    }
  }, []);

  const addRow = () => {
    const newRow = {};
    for (const columName in headers) {
      newRow[columName] = columName == "id" ? rows.length + 1 : "";
    }
    const newListOfRows = [...rows, newRow];
    setRows(newListOfRows);
  };

  const addColumn = (e) => {
    e.preventDefault();
    const columnName = e.target.columnName.value;
    const newColumn = new GenerateRow(columnName);
    setNewColumnName("");
    setColumns((prev) => [...prev, newColumn]);
  };

  const ColumnNameChange = (e) => {
    setNewColumnName(e.target.value);
  };

  return (
    <>
      <h3>{table.title}</h3>
      <p>{table.description}</p>
      <Box>
        <button onClick={addRow}>click to add a row</button>
        <form onSubmit={addColumn}>
          <InputLogin
            name={"columnName"}
            value={newColumnName}
            handleChangeInput={ColumnNameChange}
          />
          <button>click to add a column</button>
        </form>
      </Box>
      <Box key={table.id}>
        <DataGrid columns={columns} rows={rows} getRowId={(row) => row.id} />
      </Box>
      <Box>
        <UpdateTask
          tableData={rows}
          table={table}
          reFetchTables={reFetchTables}
        />
      </Box>
    </>
  );
};
export default GraphTable;
