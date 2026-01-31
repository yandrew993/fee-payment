import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./pdfActions.scss";
import { downloadPDFFromURL } from "../../lib/pdfService";

const PDFActions = ({ itemId, itemType, studentId, apiEndpoint }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownloadPDF = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '';
      let filename = '';

      if (itemType === 'payment') {
        url = `/api/fee-payments/export/payment/${itemId}`;
        filename = `payment-${itemId}.pdf`;
      } else if (itemType === 'statement') {
        url = `/api/student-fee-statements/export/${itemId}`;
        filename = `statement-${itemId}.pdf`;
      } else if (itemType === 'studentPayments') {
        url = `/api/fee-payments/export/student/${studentId}/payments`;
        filename = `student-payments-${studentId}.pdf`;
      } else if (itemType === 'studentStatements') {
        url = `/api/student-fee-statements/export/${studentId}/statements`;
        filename = `student-statements-${studentId}.pdf`;
      }

      if (url) {
        await downloadPDFFromURL(url, filename);
      }
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError(err.message || "Failed to download PDF");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pdfActions">
      <button
        className="actionButton download"
        onClick={handleDownloadPDF}
        disabled={loading}
        title="Download as PDF"
      >
        <DownloadIcon fontSize="small" />
        {loading ? "..." : "PDF"}
      </button>
      <button
        className="actionButton print"
        onClick={handlePrint}
        title="Print"
      >
        <PrintIcon fontSize="small" />
      </button>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default PDFActions;
