// Fee Management System - Form Input Configurations

export const userInputs = [
  {
    id: 1,
    label: "Username",
    type: "text",
    placeholder: "john_doe",
    field: "username",
  },
  {
    id: 2,
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    field: "fullName",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    placeholder: "john_doe@gmail.com",
    field: "email",
  },
  {
    id: 4,
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
    field: "phone",
  },
  {
    id: 5,
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    field: "password",
  },
  {
    id: 6,
    label: "Role",
    type: "select",
    placeholder: "Select Role",
    field: "role",
    options: ["admin", "accountant", "teacher", "parent"],
  },
];

export const studentInputs = [
  {
    id: 1,
    label: "Admission Number",
    type: "text",
    placeholder: "ADM-2024-001",
    field: "admissionNumber",
  },
  {
    id: 2,
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    field: "fullName",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    placeholder: "student@example.com",
    field: "email",
  },
  {
    id: 4,
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
    field: "phone",
  },
  {
    id: 5,
    label: "Class",
    type: "select",
    placeholder: "Select Class",
    field: "classId",
  },
  {
    id: 6,
    label: "Gender",
    type: "select",
    placeholder: "Select Gender",
    field: "gender",
    options: ["Male", "Female", "Other"],
  },
  {
    id: 7,
    label: "Parent Name",
    type: "text",
    placeholder: "Jane Doe",
    field: "parentName",
  },
  {
    id: 8,
    label: "Parent Phone",
    type: "text",
    placeholder: "+1 234 567 89",
    field: "parentPhone",
  },
  {
    id: 9,
    label: "Status",
    type: "select",
    placeholder: "Select Status",
    field: "status",
    options: ["active", "inactive", "graduated", "suspended"],
  },
];

export const classInputs = [
  {
    id: 1,
    label: "Class Name",
    type: "text",
    placeholder: "Form 1A",
    field: "className",
  },
  {
    id: 2,
    label: "Description",
    type: "textarea",
    placeholder: "Class description",
    field: "description",
  },
];

export const classFeeInputs = [
  {
    id: 1,
    label: "Class Name",
    type: "text",
    placeholder: "Grade 1 / Form 1",
    field: "className",
  },
  {
    id: 2,
    label: "Term",
    type: "select",
    placeholder: "Select Term",
    field: "term",
    fetchFrom: "academicTerms", // Fetch from database instead of hardcoded options
    description: "Term from academic calendar",
  },
  {
    id: 3,
    label: "Amount (KES)",
    type: "number",
    placeholder: "50000",
    field: "amount",
  },
  {
    id: 4,
    label: "Class",
    type: "select",
    placeholder: "Select Class",
    field: "classId",
  },
];

export const academicYearInputs = [
  {
    id: 1,
    label: "Academic Year",
    type: "text",
    placeholder: "2024-2025",
    field: "academicYear",
  },
  {
    id: 2,
    label: "Term",
    type: "select",
    placeholder: "Select Term",
    field: "term",
    fetchFrom: "academicTerms", // Fetch from database instead of hardcoded options
    description: "Term from academic calendar",
  },
  {
    id: 3,
    label: "Start Date",
    type: "date",
    field: "startDate",
  },
  {
    id: 4,
    label: "End Date",
    type: "date",
    field: "endDate",
  },
];

export const feePaymentInputs = [
  {
    id: 1,
    label: "Student",
    type: "select",
    placeholder: "Select Student",
    field: "studentId",
    required: true,
    description: "Select the student to make payment for",
  },
  {
    id: 2,
    label: "Academic Year & Term",
    type: "select",
    placeholder: "Select (2026-2027 - Term 1)",
    field: "academicYearTerm",
    fetchFrom: "academicTerms",
    required: true,
    description: "Only the currently active academic year and term are available",
  },
  {
    id: 3,
    label: "Amount",
    type: "number",
    placeholder: "50000",
    field: "amount",
    required: false,
    description: "Leave empty to use the balance amount",
  },
  {
    id: 4,
    label: "Payment Method",
    type: "select",
    placeholder: "Select Method",
    field: "paymentMethod",
    options: ["cash", "cheque", "bank_transfer", "mobile_money", "online"],
    required: true,
  },
  {
    id: 5,
    label: "Notes",
    type: "textarea",
    placeholder: "Additional notes",
    field: "notes",
    required: false,
  },
];

export const receiptInputs = [
  {
    id: 1,
    label: "Student",
    type: "select",
    placeholder: "Select Student",
    field: "studentId",
  },
  {
    id: 2,
    label: "Fee Payment",
    type: "select",
    placeholder: "Select Fee Payment",
    field: "feePaymentId",
  },
  {
    id: 3,
    label: "Amount",
    type: "number",
    placeholder: "50000",
    field: "amount",
  },
  {
    id: 4,
    label: "Payment Method",
    type: "select",
    placeholder: "Select Method",
    field: "paymentMethod",
    options: ["cash", "cheque", "bank_transfer", "mobile_money", "online"],
  },
  {
    id: 5,
    label: "Payment Date",
    type: "date",
    field: "paymentDate",
  },
  {
    id: 6,
    label: "Description",
    type: "textarea",
    placeholder: "Receipt description",
    field: "description",
  },
];

// Deprecated - Kept for reference
export const productInputs = [
  {
    id: 1,
    label: "Title",
    type: "text",
    placeholder: "Apple Macbook Pro",
  },
  {
    id: 2,
    label: "Description",
    type: "text",
    placeholder: "Description",
  },
  {
    id: 3,
    label: "Category",
    type: "text",
    placeholder: "Computers",
  },
  {
    id: 4,
    label: "Price",
    type: "text",
    placeholder: "100",
  },
  {
    id: 5,
    label: "Stock",
    type: "text",
    placeholder: "in stock",
  },
];

export const hotelInputs = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "My Hotel",
  },
  {
    id: "type",
    label: "Type",
    type: "text",
    placeholder: "hotel",
  },
  {
    id: "city",
    label: "City",
    type: "text",
    placeholder: "New York",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "elton st, 216",
  },
  {
    id: "distance",
    label: "Distance from City Center",
    type: "text",
    placeholder: "500",
  },
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "The best Hotel",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "description",
  },
  {
    id: "cheapestPrice",
    label: "Price",
    type: "text",
    placeholder: "100",
  },
];

export const roomInputs = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "2 bed room",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "King size bed, 1 bathroom",
  },
  {
    id: "price",
    label: "Price",
    type: "number",
    placeholder: "100",
  },
  {
    id: "maxPeople",
    label: "Max People",
    type: "number",
    placeholder: "2",
  },
];
