// Fee Management System - Data Table Columns

// Users (Admin/Staff)
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 200,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          className="cellImg"
          src={params.row.avatar || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
          alt="avatar"
        />
        {params.row.fullName}
      </div>
    ),
  },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 230 },
  { field: "role", headerName: "Role", width: 120 },
  { field: "phone", headerName: "Phone", width: 140 },
  { field: "createdAt", headerName: "Created At", width: 180 },
];

// Students
export const studentColumns = [
  { field: "admissionNumber", headerName: "Admission No.", width: 130 },
  { field: "fullName", headerName: "Student Name", width: 180 },
  { 
    field: "class", 
    headerName: "Class", 
    width: 100,
    renderCell: (params) => params.row.class?.className || "-"
  },
  { field: "gender", headerName: "Gender", width: 90 },
  {
    field: "totalPaid",
    headerName: "Total Paid",
    width: 110,
    renderCell: (params) => {
      const feePayments = params.row.feePayments || [];
      const totalPaid = feePayments.reduce((sum, payment) => {
        return sum + (payment.amount || 0);
      }, 0);
      return `KES ${totalPaid.toLocaleString()}`;
    },
  },
  {
    field: "balance",
    headerName: "Balance",
    width: 110,
    renderCell: (params) => {
      const feeStatements = params.row.feeStatements || [];
      let totalBalance = 0;
      
      if (feeStatements.length > 0) {
        // Sum all balance amounts from fee statements
        totalBalance = feeStatements.reduce((sum, statement) => {
          return sum + (statement.balanceAmount || 0);
        }, 0);
      }
      
      return `KES ${totalBalance.toLocaleString()}`;
    },
  },
];

// Classes
export const classColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "className", headerName: "Class Name", width: 150 },
  { field: "description", headerName: "Description", width: 250 },
  { field: "createdAt", headerName: "Created At", width: 180 },
];

// Class Fees
export const classFeeColumns = [
  { 
    field: "className", 
    headerName: "Class Name", 
    width: 150,
  },
  { 
    field: "term", 
    headerName: "Term", 
    width: 120,
    renderCell: (params) => {
      const termMap = {
        term1: "Term 1",
        term2: "Term 2",
        term3: "Term 3",
      };
      return termMap[params.value] || params.value;
    },
  },
  { 
    field: "amount", 
    headerName: "Amount (KES)", 
    width: 150,
    renderCell: (params) => `KES ${params.value?.toLocaleString()}` || "-",
  },
  { field: "createdAt", headerName: "Created At", width: 180 },
];

// Fee Payments
export const feePaymentColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "referenceNumber", headerName: "Ref. Number", width: 150 },
  { 
    field: "student", 
    headerName: "Student", 
    width: 180,
    renderCell: (params) => params.row.student?.fullName || "-"
  },
  { 
    field: "studentClassName", 
    headerName: "Class", 
    width: 120,
    renderCell: (params) => params.row.studentClassName || params.row.student?.class?.className || "-"
  },
  { field: "amount", headerName: "Amount", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "paymentMethod", headerName: "Method", width: 130 },
  { field: "paymentDate", headerName: "Payment Date", width: 150 },
  { field: "createdAt", headerName: "Created At", width: 180 },
];

// Receipts
export const receiptColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "receiptNumber", headerName: "Receipt No.", width: 150 },
  { 
    field: "student", 
    headerName: "Student", 
    width: 180,
    renderCell: (params) => params.row.student?.fullName || "-"
  },
  { field: "amount", headerName: "Amount", width: 120 },
  { field: "paymentMethod", headerName: "Payment Method", width: 150 },
  { field: "paymentDate", headerName: "Payment Date", width: 150 },
  { field: "createdAt", headerName: "Created At", width: 180 },
];

// Academic Years/Terms
export const academicYearColumns = [
  { 
    field: "academicYear", 
    headerName: "Academic Year", 
    width: 150,
  },
  { 
    field: "term", 
    headerName: "Term", 
    width: 100,
    renderCell: (params) => {
      const termMap = {
        term1: "Term 1",
        term2: "Term 2",
        term3: "Term 3",
      };
      return termMap[params.value] || params.value;
    },
  },
  { 
    field: "startDate", 
    headerName: "Start Date", 
    width: 140,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  { 
    field: "endDate", 
    headerName: "End Date", 
    width: 140,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    renderCell: (params) => (
      <span style={{
        padding: "4px 8px",
        borderRadius: "4px",
        backgroundColor: params.value === "active" ? "#d4edda" : "#f8d7da",
        color: params.value === "active" ? "#155724" : "#721c24",
        fontWeight: "600",
        fontSize: "12px",
      }}>
        {params.value === "active" ? "✓ Active" : "Inactive"}
      </span>
    ),
  },
  { field: "createdAt", headerName: "Created At", width: 180 },
];
