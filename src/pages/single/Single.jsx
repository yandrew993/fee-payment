import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import apiRequest from "../../lib/apiRequest";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { downloadPDFFromURL } from "../../lib/pdfService";
import { canEdit, canDelete } from "../../lib/rbac";
import DownloadIcon from "@mui/icons-material/Download";

const Single = () => {
  const { Id } = useParams();
  const location = useLocation();
  const path = location.pathname.split("/")[1]; // Get entity type (users, students, etc.)
  const { user } = useContext(AuthContext);
  
  // Check user permissions
  const userCanEdit = canEdit(user);
  const userCanDelete = canDelete(user);
  
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
  const fullUrl = `${apiEndpoint}/${Id}`;
  
  // Log the URL being called for debugging
  useEffect(() => {
    console.log("Route params:", { Id, path });
    console.log("API Endpoint:", apiEndpoint);
    console.log("Full URL:", fullUrl);
  }, [Id, path, apiEndpoint, fullUrl]);

  const { data, loading, error } = useFetch(fullUrl, true);
  const { data: classes } = useFetch("/classes");
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (data) {
      // Data should be an object when isSingleItem is true
      setItem(data);
      console.log("Item Data:", data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Fetch Error:", error);
    }
  }, [error]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = Cookies.get("token");
      const response = await apiRequest.put(`${apiEndpoint}/${Id}`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Item updated:", response.data);
      setItem(response.data);
      setIsEditing(false);
      setNotification({ type: "success", message: "Item updated successfully" });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Failed to update item:", error);
      const errorMsg = error.response?.data?.message || "Failed to update item";
      setNotification({ type: "error", message: errorMsg });
      setTimeout(() => setNotification(null), 5000);
    }
    setSaving(false);
  };

  const isStudent = path === "students";

  // Get default avatar based on student gender
  const getAvatarUrl = (itemData) => {
    if (itemData?.avatar) {
      return itemData.avatar;
    }
    
    // For students, use gender-specific avatars with fallback
    if (isStudent && itemData?.gender) {
      const genderLower = itemData.gender.toLowerCase();
      if (genderLower === "f" || genderLower === "female") {
        // Try to load female avatar, fall back to noavatar if not available
        return "/female-avatar.jpg";
      } else if (genderLower === "m" || genderLower === "male") {
        // Try to load male avatar, fall back to noavatar if not available
        return "/male-avatar.jpg";
      }
    }
    
    // Fallback for all other cases
    return "/noavatar.jpg";
  };

  const handleDownloadPaymentPDF = async (paymentId) => {
    try {
      if (!paymentId) {
        alert("Unable to download PDF: Invalid payment ID");
        return;
      }
      const url = `/api/fee-payments/export/payment/${paymentId}`;
      const filename = `payment-receipt-${paymentId}.pdf`;
      await downloadPDFFromURL(url, filename);
      setNotification({ type: "success", message: "PDF downloaded successfully" });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setNotification({ type: "error", message: `Failed to download PDF: ${error.message}` });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleDownloadStatementPDF = async (statementId) => {
    try {
      if (!statementId) {
        alert("Unable to download PDF: Invalid statement ID");
        return;
      }
      const url = `/api/student-fee-statements/export/${statementId}`;
      const filename = `fee-statement-${statementId}.pdf`;
      await downloadPDFFromURL(url, filename);
      setNotification({ type: "success", message: "PDF downloaded successfully" });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setNotification({ type: "error", message: `Failed to download PDF: ${error.message}` });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.type === "success" ? "✓" : "⚠️"} {notification.message}
          </div>
        )}

        {loading ? (
          <div className={`loadingContainer ${darkMode ? "dark" : "light"}`}>
            <CircularProgress />
            <p className="loading">Loading details...</p>
          </div>
        ) : error && error !== "Request failed with status code 404" ? (
          <div className={`errorContainer ${darkMode ? "dark" : "light"}`}>
            <p className="error">⚠️ Error: {error}</p>
            <p className="errorSubtext">Please try refreshing the page or go back to the list.</p>
          </div>
        ) : item ? (
          <div className="singleContent">
            <div className="top">
              <div className="left">
                {userCanEdit && (
                  <div 
                    className="editButton" 
                    onClick={isEditing ? handleSave : handleEditToggle}
                  >
                    {saving ? "Saving..." : isEditing ? "Save" : "Edit"}
                  </div>
                )}
                <h1 className="title">Information</h1>
                <div className="item">
                  {isStudent && (
                    <img
                      src={getAvatarUrl(item)}
                      alt={item.name || item.fullName || "Item"}
                      className="itemImg"
                      onError={(e) => {
                        // If gender-specific avatar fails to load, fall back to noavatar.jpg
                        if (e.target.src !== "/noavatar.jpg") {
                          e.target.src = "/noavatar.jpg";
                        }
                      }}
                    />
                  )}
                  <div className="details">
                    {isEditing ? (
                      <input 
                        type="text" 
                        name="fullName" 
                        value={item.fullName || item.name || ""} 
                        onChange={handleChange} 
                      />
                    ) : (
                      <h2 className="itemTitle">{item.fullName || item.name || "N/A"}</h2>  
                    )}
                    {Object.entries(item).map(([key, value]) => {
                      // Skip certain fields
                      if (["id", "_id", "createdAt", "updatedAt", "avatar", "fullName", "name", "feePayments", "feeStatements", "class", "receipts", "classId"].includes(key)) {
                        return null;
                      }
                      if (typeof value === "object" || Array.isArray(value)) {
                        return null;
                      }
                      return (
                        <div className="detailItem" key={key}>
                          <span className="itemKey">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                          {isEditing ? (
                            <input type="text" name={key} value={value || ""} onChange={handleChange} />
                          ) : (
                            <span className="itemValue">{String(value) || "N/A"}</span>
                          )}
                        </div>
                      );
                    })}
                    {/* Class field - always show and make editable for students */}
                    {isStudent && (
                      <div className="detailItem">
                        <span className="itemKey">Class:</span>
                        {isEditing ? (
                          <select 
                            name="classId" 
                            value={item.classId || ""} 
                            onChange={handleChange}
                            className="classSelector"
                          >
                            <option value="">Select Class</option>
                            {classes && classes.map((cls) => (
                              <option key={cls.id} value={cls.id}>
                                {cls.className}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="itemValue">{item.class?.className || "N/A"}</span>
                        )}
                      </div>
                    )}
                    {/* Non-student class field - read-only */}
                    {!isStudent && item.class && (
                      <div className="detailItem">
                        <span className="itemKey">Class:</span>
                        <span className="itemValue">{item.class.className || "N/A"}</span>
                      </div>
                    )}
                    <div className="detailItem">
                      <span className="itemKey">Registered at:</span>
                      <span className="itemValue">{new Date(item.createdAt).toLocaleDateString() || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
              {isStudent && (
                <div className="right">
                  <Chart aspect={3 / 1} title="Analytics" studentId={Id} />
                </div>
              )}
            </div>

            {isStudent && (
              <>
                {/* Fee Payments Section */}
                {item.feePayments && item.feePayments.length > 0 && (
                  <div className="bottom">
                    <h2 className="title">Fee Payments</h2>
                    <table className="dataTable">
                      <thead>
                        <tr>
                          <th>Reference</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Payment Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.feePayments.map((payment) => (
                          <tr key={payment.id}>
                            <td>{payment.referenceNumber}</td>
                            <td>KES {payment.amount?.toLocaleString()}</td>
                            <td><span className={`status ${payment.status}`}>{payment.status}</span></td>
                            <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                            <td>
                              <button 
                                className="actionBtn downloadBtn"
                                onClick={() => handleDownloadPaymentPDF(payment.id)}
                                title="Download PDF Receipt"
                              >
                                <DownloadIcon style={{ fontSize: '16px', marginRight: '4px' }} />
                                PDF
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Fee Statements Section */}
                {item.feeStatements && item.feeStatements.length > 0 && (
                  <div className="bottom">
                    <h2 className="title">Fee Statements</h2>
                    <table className="dataTable">
                      <thead>
                        <tr>
                          <th>Academic Year</th>
                          <th>Class</th>
                          <th>Term</th>
                          <th>Total Payable</th>
                          <th>Amount Paid</th>
                          <th>Balance</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.feeStatements.map((statement) => (
                          <tr key={statement.id}>
                            <td>{statement.academicYear}</td>
                            <td>{statement.studentClassName || item.class?.className || "N/A"}</td>
                            <td>{statement.term}</td>
                            <td>KES {statement.totalPayable?.toLocaleString()}</td>
                            <td>KES {statement.amountPaid?.toLocaleString()}</td>
                            <td>KES {statement.balanceAmount?.toLocaleString()}</td>
                            <td><span className={`status ${statement.status}`}>{statement.status}</span></td>
                            <td>
                              <button 
                                className="actionBtn downloadBtn"
                                onClick={() => handleDownloadStatementPDF(statement.id)}
                                title="Download PDF Statement"
                              >
                                <DownloadIcon style={{ fontSize: '16px', marginRight: '4px' }} />
                                PDF
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <p className="error">Item not found!</p>
        )}
      </div>
    </div>
  );
};

export default Single;
