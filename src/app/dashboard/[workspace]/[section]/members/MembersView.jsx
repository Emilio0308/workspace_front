import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "@/utils/useFetch";
import { useSelector } from "react-redux";
import { DateFormatYMD, formatDate } from "../../../../../utils/formatDate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useState } from "react";

const MembersView = () => {
  const { value } = useSelector((store) => store.user);
  const { currentWorkspace } = value;
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    {
      field: "",
      headerName: "Type",
      minWidth: 40,
      renderCell: ({ row }) => {
        const result =
          row.username == currentWorkspace.owner ? "Owner" : "Member";
        return result;
      },
    },
    { field: "first_name", headerName: " Name", witdh: 120, editable: true },
    { field: "last_name", headerName: "lastName", witdh: 120 },
    { field: "username", headerName: "Username", witdh: 150 },
    { field: "email", headerName: "Email", minWidth: 150 },
    {
      field: "is_active",
      headerName: "Active",
      minWidth: 60,
      renderCell: ({ value }) => (value ? <CheckCircleIcon /> : <CancelIcon />),
    },
    {
      field: "date_joined",
      headerName: "Joined",
      minWidth: 200,
      renderCell: ({ value }) => formatDate(value),
    },
    {
      field: "id",
      headerName: "Remove",
      minWidth: 60,
      renderCell: ({ value }) => {
        return <PersonRemoveIcon />;
      },
    },
  ];
  return (
    <section className="overflow-hidden">
      <h5 className="m-5">Members of your Workpace:</h5>
      {currentWorkspace.menbers && (
        <Box>
          <DataGrid
            columns={columns}
            rows={currentWorkspace.menbers}
            getRowId={(row) => row.id}
            // pageSizeOptions={ [5,10,15]}
            // pageSize={pageSize}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: pageSize },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowSpacing={params => ({
              top: params.isFirstVisible ? 0: 5,
              bottom: params.isLastVisible? 0:5
            })}
          />
        </Box>
      )}
    </section>
  );
};
export default MembersView;
