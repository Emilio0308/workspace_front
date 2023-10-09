import { useState } from "react";
import InputLogin from "../../../../../../components/InputLogin";

const TableCell = ({ children, row, setRows }) => {
  const [cellValue, setCellValue] = useState(row[children]);

  const hanldeEditCell = (e) => {
    setCellValue(e.target.value);
  };

  const hanldeSaveCellValue = (e) => {
    // const newRow = { ...row, [children]: e.target.value };
    // const listOfNewRows = allrows.reduce((acc, oldRow) => {
    //   if (oldRow.id == row.id) {
    //     acc.push(newRow);
    //     return acc;
    //   }
    //   acc.push(oldRow);
    //   return acc;
    // }, []);
    // setRows(listOfNewRows);

    const updateRows = (allrows) => {
      const newRow = { ...row, [children]: e.target.value };
      const listOfNewRows = allrows.reduce((acc, oldRow) => {
        if (oldRow.id == row.id) {
          acc.push(newRow);
          return acc;
        }
        acc.push(oldRow);
        return acc;
      }, []);
      return listOfNewRows;
    };
    setRows((prev) => updateRows(prev));
  };

  return (
    <InputLogin
      handleChangeInput={hanldeEditCell}
      value={cellValue}
      type={"text"}
      onBlur={hanldeSaveCellValue}
      variant={"filled"}
      // style={{backgroundColor:'transparent'}}
    />

    // <input
    //   onChange={hanldeEditCell}
    //   onBlur={updateRows}
    //   className="outline-none text-white bg-black"
    //   type="text"
    //   value={cellValue}
    // />
  );
};
export default TableCell;
