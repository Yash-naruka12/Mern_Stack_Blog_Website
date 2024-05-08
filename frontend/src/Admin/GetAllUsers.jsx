import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AuthProvider } from "../Context/Store";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Footer from "../Pages/Footer/Footer";

export default function GetAllUsers() {
  const { users, deletUser } = AuthProvider();

  if (!users) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    // Handle case where users array is empty
    return <div>No users found.</div>;
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "userName", headerName: "Name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "isAdmin", headerName: "Admin", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (item) => (
        <IconButton color="error" onClick={() => deletUser(item.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <div className="heading">
        <h5 className="text-2xl font-bold pb-10 text-center">
          Admin Users Page
        </h5>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      <Footer />
    </>
  );
}
