import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const New = ({ inputs, title, api }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectOptions, setSelectOptions] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredStatements, setFilteredStatements] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Fetch data for select dropdowns
  const { data: classes } = useFetch("/classes");
  const { data: students } = useFetch("/students");
  const { data: feePayments } = useFetch("/fee-payments");
  const { data: feeStatements } = useFetch("/student-fee-statements");
  const { data: academicTerms } = useFetch("/academic-terms");

  // Debug: Log academic terms
  useEffect(() => {
    console.log("Academic Terms fetched:", academicTerms);
  }, [academicTerms]);

  useEffect(() => {
    // Build select options for form
    const options = {};
    
    // If form needs classes
    if (inputs.some(input => input.field === "classId")) {
      options.classId = classes && Array.isArray(classes) ? classes.map(cls => ({
        id: cls.id,
        label: cls.className
      })) : [];
    }

    // If form needs students
    if (inputs.some(input => input.field === "studentId")) {
      options.studentId = students && Array.isArray(students) ? students.map(student => ({
        id: student.id,
        label: `${student.fullName} (${student.admissionNumber})`,
        fullName: student.fullName,
        admissionNumber: student.admissionNumber,
      })) : [];
    }

    // If form needs fee payments
    if (inputs.some(input => input.field === "feePaymentId")) {
      options.feePaymentId = feePayments && Array.isArray(feePayments) ? feePayments.map(payment => ({
        id: payment.id,
        label: `${payment.referenceNumber} - ${payment.amount}`
      })) : [];
    }

    // If form needs academic year and term combined (from database)
    // For fee payments, filter to only show ACTIVE academic year and term
    if (inputs.some(input => input.field === "academicYearTerm" && input.fetchFrom === "academicTerms")) {
      console.log("Building academicYearTerm options from:", academicTerms);
      
      let termsToShow = academicTerms && Array.isArray(academicTerms) ? academicTerms : [];
      
      // For fee payments, filter to only active terms
      if (api === "fee-payments") {
        console.log("Fee payment form detected - filtering to active terms only");
        termsToShow = termsToShow.filter(t => t.status === "active");
        console.log("Active terms after filtering:", termsToShow);
      }
      
      options.academicYearTerm = termsToShow.map(t => ({
        id: `${t.academicYear}-${t.term}`,
        label: `${t.academicYear} - ${t.term.replace('term', 'Term ')}`,
        value: `${t.academicYear}-${t.term}`,
        academicYear: t.academicYear,
        term: t.term,
        status: t.status,
      }));
      
      console.log("Built academicYearTerm options:", options.academicYearTerm);
    }

    // If form needs separate academic year (from database, for other forms like classFeeInputs)
    if (inputs.some(input => input.field === "academicYear" && input.fetchFrom === "academicTerms")) {
      console.log("Building academicYear options from:", academicTerms);
      // Extract unique academic years from academicTerms
      const uniqueYears = academicTerms && Array.isArray(academicTerms) 
        ? [...new Set(academicTerms.map(t => t.academicYear))]
        : [];
      options.academicYear = uniqueYears.map(year => ({
        id: year,
        label: year,
        value: year,
      }));
      console.log("Built academicYear options:", options.academicYear);
    }

    // If form needs separate term (from database, for other forms like classFeeInputs)
    if (inputs.some(input => input.field === "term" && input.fetchFrom === "academicTerms")) {
      console.log("Building term options from:", academicTerms);
      // Extract unique terms from academicTerms
      const uniqueTerms = academicTerms && Array.isArray(academicTerms) 
        ? [...new Set(academicTerms.map(t => t.term))]
        : [];
      options.term = uniqueTerms.map(termName => ({
        id: termName,
        label: termName.replace('term', 'Term '),
        value: termName,
      }));
      console.log("Built term options:", options.term);
    }

    // If form needs fee statements (for fee payments)
    if (inputs.some(input => input.field === "studentFeeStatementId")) {
      // Build options for all statements, will be filtered by selected student
      options.studentFeeStatementId = feeStatements && Array.isArray(feeStatements) ? feeStatements.map(statement => ({
        id: statement.id,
        label: `${statement.academicYear} - ${statement.term} (Balance: KES ${statement.balanceAmount?.toLocaleString() || 0})`,
        studentId: statement.studentId,
        academicYear: statement.academicYear,
        term: statement.term,
        balanceAmount: statement.balanceAmount,
      })) : [];
    }

    setSelectOptions(options);
  }, [classes, students, feePayments, feeStatements, academicTerms, inputs]);

  // Filter fee statements and academic year/term options when student is selected
  useEffect(() => {
    if (formData.studentId && selectOptions.studentFeeStatementId) {
      const filtered = selectOptions.studentFeeStatementId.filter(
        statement => statement.studentId === formData.studentId
      );
      setFilteredStatements(filtered);
      
      // Also filter academicYearTerm options to only show those available for this student
      if (selectOptions.academicYearTerm) {
        const filteredTerms = selectOptions.academicYearTerm.filter(
          term => filtered.some(stmt => 
            stmt.academicYear === term.academicYear && stmt.term === term.term
          )
        );
        // Update the filtered academic year/term options
        console.log("Filtered academicYearTerm options for student:", filteredTerms);
        setSelectOptions(prev => ({
          ...prev,
          academicYearTermFiltered: filteredTerms
        }));
      }
      
      // Also update selected student info
      const student = selectOptions.studentId?.find(s => s.id === formData.studentId);
      setSelectedStudent(student || null);
    } else {
      setFilteredStatements([]);
      setSelectedStudent(null);
      setSelectOptions(prev => ({
        ...prev,
        academicYearTermFiltered: selectOptions.academicYearTerm || []
      }));
    }
  }, [formData.studentId, selectOptions.studentId, selectOptions.studentFeeStatementId, selectOptions.academicYearTerm]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      
      // For fee payments, add the createdById
      const submitData = { ...formData };
      if (api === "fee-payments" && user && user.id) {
        submitData.createdById = user.id;
      }

      const response = await apiRequest.post(`/${api}`, submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Item created successfully:", response.data);
      navigate(`/${api}`);
    } catch (err) {
      console.error("Failed to create item:", err);
      setError(err.response?.data?.message || "Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <button className="backButton" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              {file && (
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {/* Show selected student details for fee payment forms */}
              {api === "fee-payments" && selectedStudent && (
                <div className="studentInfo" style={{
                  backgroundColor: "#f0f9ff",
                  border: "1px solid #0ea5e9",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "16px",
                  fontSize: "14px",
                }}>
                  <div style={{ fontWeight: "600", marginBottom: "8px" }}>Student Details:</div>
                  <div>Name: <span style={{ fontWeight: "500" }}>{selectedStudent.fullName}</span></div>
                  <div>Admission #: <span style={{ fontWeight: "500" }}>{selectedStudent.admissionNumber}</span></div>
                </div>
              )}

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.description && (
                    <small style={{ display: "block", color: "#666", marginBottom: "4px", fontSize: "12px" }}>
                      {input.description}
                    </small>
                  )}
                  {input.type === "textarea" ? (
                    <textarea
                      name={input.field}
                      placeholder={input.placeholder}
                      onChange={handleInputChange}
                      value={formData[input.field] || ""}
                    />
                  ) : input.type === "select" ? (
                    <select
                      name={input.field}
                      onChange={handleInputChange}
                      value={formData[input.field] || ""}
                      required={input.required}
                    >
                      <option value="">{input.placeholder}</option>
                      
                      {/* Show filtered statements only for studentFeeStatementId in fee payments */}
                      {input.field === "studentFeeStatementId" && api === "fee-payments" ? (
                        filteredStatements && filteredStatements.length > 0 ? (
                          filteredStatements.map((statement) => (
                            <option key={statement.id} value={statement.id}>
                              {statement.label}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {formData.studentId ? "No fee statements found for this student" : "Select a student first"}
                          </option>
                        )
                      ) : input.field === "academicYearTerm" && input.fetchFrom === "academicTerms" ? (
                        // Handle combined academic year and term dropdown - show only options for selected student
                        selectOptions.academicYearTermFiltered && selectOptions.academicYearTermFiltered.length > 0 ? (
                          selectOptions.academicYearTermFiltered.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {formData.studentId ? "No fee statements found for this student" : "Select a student first"}
                          </option>
                        )
                      ) : input.field === "academicYear" && input.fetchFrom === "academicTerms" ? (
                        // Handle academic year dropdown - for other forms like classFeeInputs
                        selectOptions.academicYear && selectOptions.academicYear.length > 0 ? (
                          selectOptions.academicYear.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {academicTerms && academicTerms.length > 0 ? "No years available" : "Loading years..."}
                          </option>
                        )
                      ) : input.field === "term" && input.fetchFrom === "academicTerms" ? (
                        // Handle term dropdown - for other forms like classFeeInputs
                        selectOptions.term && selectOptions.term.length > 0 ? (
                          selectOptions.term.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            {academicTerms && academicTerms.length > 0 ? "No terms available" : "Loading terms..."}
                          </option>
                        )
                      ) : selectOptions[input.field] && selectOptions[input.field].length > 0 ? (
                        selectOptions[input.field].map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))
                      ) : input.options ? (
                        input.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))
                      ) : null}
                    </select>
                  ) : input.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      name={input.field}
                      onChange={handleInputChange}
                      checked={formData[input.field] || false}
                    />
                  ) : (
                    <input
                      type={input.type}
                      name={input.field}
                      placeholder={input.placeholder}
                      onChange={handleInputChange}
                      value={formData[input.field] || ""}
                      required={input.required}
                    />
                  )}
                </div>
              ))}
              {error && <div className="error">{error}</div>}
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
