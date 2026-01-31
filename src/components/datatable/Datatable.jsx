import React, { useContext, useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import apiRequest from "../../lib/apiRequest";
import Cookies from "js-cookie";
import { DarkModeContext } from "../../context/darkModeContext";
import PDFActions from "../pdfActions/PDFActions";
import DownloadIcon from "@mui/icons-material/Download";

import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { downloadPDFFromURL } from "../../lib/pdfService";
import { AuthContext } from "../../context/AuthContext";
import { canDelete, canCreate } from "../../lib/rbac";


const Datatable = ({ columns, api, searchQueryProp }) => {
  const location = useLocation();
  const path = api || location.pathname.split("/")[1]; // Use api prop if provided, otherwise get from URL
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  
  // Check user permissions
  const userCanDelete = canDelete(user);
  const userCanCreate = canCreate(user);

  // Map route paths to API endpoints
  const apiEndpointMap = {
    users: "/users",
    students: "/students",
    classes: "/classes",
    "class-fees": "/class-fees",
    "fee-payments": "/fee-payments",
    receipts: "/receipts",
    "academic-years": "/academic-terms",
  };

  const apiEndpoint = apiEndpointMap[path] || `/${path}`;
  const { data, loading, error } = useFetch(apiEndpoint);
  const [list, setList] = useState([]);

  console.log(path);
  console.log("Data:", data);

  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      console.warn("Warning: Data is not an array or is null:", data);
      setList([]);
      return;
    }

    // Ensure `id` field exists for `DataGrid`
    const formattedData = data.map((item, index) => ({
      ...item,
      id: item.id || item._id || `temp-id-${index}`,
    }));

    setList(formattedData);
  }, [data]);

  useEffect(() => {
    if (searchQueryProp) {
      const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQueryProp.toLowerCase())
        )
      );
      setList(filteredData);
    } else {
      setList(data);
    }
  }, [searchQueryProp, data]);

  const handleView = (id) => {
    navigate(`/${path}/search/${id}`);
  };

  const handleDelete = async (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "⚠️ Are you sure you want to delete this record?\n\nThis action cannot be undone!"
    );
    
    if (!isConfirmed) {
      return;
    }

    try {
      const token = Cookies.get("token");
      await apiRequest.delete(`${apiEndpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Item deleted successfully");
      setList((prevList) => prevList.filter((item) => item.id !== id));
      // Show success message
      alert("✅ Record deleted successfully!");
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert(`❌ Failed to delete record: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDownloadPDF = async (id, itemType) => {
    try {
      if (!id) {
        console.error("Invalid ID for PDF download");
        alert("Unable to download PDF: Invalid record ID");
        return;
      }

      let url = '';
      let filename = '';

      if (itemType === 'payment') {
        url = `/api/fee-payments/export/payment/${id}`;
        filename = `payment-${id}.pdf`;
      } else if (itemType === 'statement') {
        url = `/api/student-fee-statements/export/${id}`;
        filename = `statement-${id}.pdf`;
      }

      if (url) {
        await downloadPDFFromURL(url, filename);
      }
    } catch (err) {
      console.error("Error downloading PDF:", err);
      alert(`Failed to download PDF: ${err.message}`);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: (path === 'fee-payments' || path === 'student-fee-statements') ? 200 : 150,
    renderCell: (params) => (
      <div className="cellAction">
        <button
          className={`viewButton ${darkMode ? "dark" : "light"}`}
          onClick={() => handleView(params.row.id)}
        >
          View
        </button>
        {(path === 'fee-payments' || path === 'student-fee-statements') && (
          <button
            className={`pdfButton ${darkMode ? "dark" : "light"}`}
            onClick={() => handleDownloadPDF(params.row.id, path === 'fee-payments' ? 'payment' : 'statement')}
            title="Download PDF"
          >
            <DownloadIcon style={{ fontSize: '16px', marginRight: '4px' }} />
            PDF
          </button>
        )}
        {userCanDelete && (
          <button
            className={`deleteButton ${darkMode ? "dark" : "light"}`}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        )}
      </div>
    ),
  };

  const gridColumns = [...columns, actionColumn];

  // Create a dark theme
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: "#121212",
            color: "#ffffff",
          },
        },
      },
    },
  });

  // Create a light theme
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        },
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <div className={`datatable ${darkMode ? "dark" : "light"}`}>
          <div className="datatableTitle">
            {path === "users"
              ? "Users"
              : path === "students"
              ? "Students"
              : path === "classes"
              ? "Classes"
              : path === "class-fees"
              ? "Class Fees"
              : path === "fee-payments"
              ? "Fee Payments"
              : path === "receipts"
              ? "Receipts"
              : "Data"}
            {userCanCreate && (
              <button className="link" onClick={() => navigate(`/${path}/new`)}>
                Add New
              </button>
            )}
          </div>

          {loading ? (
            <div className="loadingContainer">
            <CircularProgress />
            <p>Loading data...</p>
          </div>
        ) : error ? (
          <div className="errorContainer">
            <p>Error fetching data: {error.message}</p>
          </div>
          ) : (
            <div className="tableWrapper">
              <DataGrid
                className="datagrid"
                rows={list}
                columns={gridColumns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                autoHeight
                getRowId={(row) => row.id}
              />
            </div>
          )}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Datatable;
