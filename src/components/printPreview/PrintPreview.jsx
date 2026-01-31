import React, { useState } from "react";
import "./printPreview.scss";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import { downloadPDFFromElement, downloadPDFFromURL } from "../../lib/pdfService";

const PrintPreview = ({ data, type = "payment" }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      let url = '';
      let filename = '';

      if (type === 'payment' && data.id) {
        url = `/api/fee-payments/export/payment/${data.id}`;
        filename = `payment-${data.referenceNumber || data.id}.pdf`;
      } else if (type === 'statement' && data.id) {
        url = `/api/student-fee-statements/export/${data.id}`;
        filename = `statement-${data.student?.admissionNumber}-${data.academicYear}-${data.term}.pdf`;
      }

      if (url) {
        await downloadPDFFromURL(url, filename);
      }
    } catch (err) {
      console.error("Error downloading PDF:", err);
      alert("Failed to download PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="printPreview">
      <div className="printActions">
        <button
          className="actionBtn download"
          onClick={handleDownload}
          disabled={isGenerating}
          title="Download as PDF"
        >
          <DownloadIcon />
          {isGenerating ? "Generating..." : "Download PDF"}
        </button>
        <button
          className="actionBtn print"
          onClick={handlePrint}
          title="Print this page"
        >
          <PrintIcon />
          Print
        </button>
        <button
          className="actionBtn preview"
          onClick={() => setShowPreview(!showPreview)}
          title="Toggle preview"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      {showPreview && (
        <div className="previewModal">
          <div className="previewContent">
            <div className="previewHeader">
              <h3>Print Preview - {type === 'payment' ? 'Payment Receipt' : 'Fee Statement'}</h3>
              <button
                className="closeBtn"
                onClick={() => setShowPreview(false)}
                title="Close preview"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="previewBody">
              {type === 'payment' && (
                <PaymentPreview data={data} />
              )}
              {type === 'statement' && (
                <StatementPreview data={data} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentPreview = ({ data }) => {
  const statement = data.studentFeeStatement;

  return (
    <div className="documentPreview payment">
      <header className="docHeader">
        <h1>FEE PAYMENT RECEIPT</h1>
        <p className="subtitle">School Fee Management System</p>
      </header>

      <section className="section">
        <h3>RECEIPT DETAILS</h3>
        <div className="grid2Col">
          <div className="field">
            <label>Receipt #:</label>
            <value>{data.referenceNumber}</value>
          </div>
          <div className="field">
            <label>Payment Method:</label>
            <value>{data.paymentMethod}</value>
          </div>
          <div className="field">
            <label>Date:</label>
            <value>{new Date(data.paymentDate).toLocaleDateString()}</value>
          </div>
          <div className="field">
            <label>Amount:</label>
            <value className="amount">KES {data.amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</value>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>STUDENT INFORMATION</h3>
        <div className="grid2Col">
          <div className="field">
            <label>Name:</label>
            <value>{data.student.fullName}</value>
          </div>
          <div className="field">
            <label>Admission #:</label>
            <value>{data.student.admissionNumber}</value>
          </div>
          <div className="field">
            <label>Class:</label>
            <value>{data.student.class.className}</value>
          </div>
          <div className="field">
            <label>Status:</label>
            <value>{data.status}</value>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>ACADEMIC TERM & FEE DETAILS</h3>
        <div className="grid2Col">
          <div className="field">
            <label>Academic Year:</label>
            <value>{statement.academicYear}</value>
          </div>
          <div className="field">
            <label>Term:</label>
            <value>{statement.term}</value>
          </div>
          <div className="field">
            <label>Due Date:</label>
            <value>{new Date(statement.dueDate).toLocaleDateString()}</value>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>PAYMENT SUMMARY</h3>
        <div className="summaryTable">
          <div className="tableRow header">
            <div className="col">Description</div>
            <div className="col amount">Amount (KES)</div>
          </div>
          <div className="tableRow">
            <div className="col">Total Payable</div>
            <div className="col amount">{statement.totalPayable.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="tableRow">
            <div className="col">Amount Paid</div>
            <div className="col amount">{statement.amountPaid.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="tableRow highlight">
            <div className="col">Outstanding Balance</div>
            <div className="col amount">{statement.balanceAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </section>

      {data.notes && (
        <section className="section">
          <h3>NOTES</h3>
          <p>{data.notes}</p>
        </section>
      )}

      <footer className="docFooter">
        <p>This is a system-generated receipt. Please keep it for your records.</p>
        <p>Generated on {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

const StatementPreview = ({ data }) => {
  return (
    <div className="documentPreview statement">
      <header className="docHeader">
        <h1>FEE STATEMENT</h1>
        <p className="subtitle">School Fee Management System</p>
      </header>

      <section className="section">
        <h3>STUDENT INFORMATION</h3>
        <div className="grid2Col">
          <div className="field">
            <label>Name:</label>
            <value>{data.student.fullName}</value>
          </div>
          <div className="field">
            <label>Admission #:</label>
            <value>{data.student.admissionNumber}</value>
          </div>
          <div className="field">
            <label>Class:</label>
            <value>{data.studentClassName}</value>
          </div>
          <div className="field">
            <label>Status:</label>
            <value>{data.student.status}</value>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>ACADEMIC TERM & PERIOD</h3>
        <div className="grid2Col">
          <div className="field">
            <label>Academic Year:</label>
            <value>{data.academicYear}</value>
          </div>
          <div className="field">
            <label>Term:</label>
            <value>{data.term}</value>
          </div>
          <div className="field">
            <label>Period:</label>
            <value>
              {new Date(data.termStartDate).toLocaleDateString()} - {new Date(data.termEndDate).toLocaleDateString()}
            </value>
          </div>
          <div className="field">
            <label>Due Date:</label>
            <value>{new Date(data.dueDate).toLocaleDateString()}</value>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>FEE BREAKDOWN</h3>
        <div className="summaryTable">
          <div className="tableRow header">
            <div className="col">Description</div>
            <div className="col amount">Amount (KES)</div>
          </div>
          <div className="tableRow">
            <div className="col">Previous Balance</div>
            <div className="col amount">{data.previousBalance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="tableRow">
            <div className="col">Current Term Fee</div>
            <div className="col amount">{data.currentTermFee.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="tableRow highlight">
            <div className="col">Total Payable</div>
            <div className="col amount">{data.totalPayable.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="tableRow">
            <div className="col">Amount Paid</div>
            <div className="col amount">{data.amountPaid.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="tableRow highlight bold">
            <div className="col">Outstanding Balance</div>
            <div className="col amount">{data.balanceAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>STATUS</h3>
        <div className={`statusBadge ${data.status}`}>
          {data.status.toUpperCase()}
        </div>
      </section>

      {data.feePayments && data.feePayments.length > 0 && (
        <section className="section">
          <h3>PAYMENT HISTORY</h3>
          <div className="paymentHistory">
            {data.feePayments.map((payment, index) => (
              <div key={payment.id} className="paymentItem">
                <span className="index">{index + 1}.</span>
                <span className="details">
                  Ref: {payment.referenceNumber} - KES {payment.amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </span>
                <span className="date">{new Date(payment.paymentDate).toLocaleDateString()}</span>
                <span className={`status ${payment.status}`}>{payment.status}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="docFooter">
        <p>This is a system-generated statement. Please contact the school office for any discrepancies.</p>
        <p>Generated on {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default PrintPreview;
