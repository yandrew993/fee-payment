import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { 
  userInputs, 
  studentInputs, 
  classInputs, 
  classFeeInputs, 
  feePaymentInputs,
  receiptInputs,
  academicYearInputs
} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { 
  userColumns, 
  studentColumns, 
  classColumns, 
  classFeeColumns, 
  feePaymentColumns,
  receiptColumns,
  academicYearColumns
} from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route index element={<Home />} />
                  
                  {/* Users Management */}
                  <Route path="users">
                    <Route index element={<List columns={userColumns} api="users" title="Users" />} />
                    <Route path="search/:Id" element={<Single />} />
                    <Route
                      path="new"
                      element={<New inputs={userInputs} title="Add New User" api="users" />}
                    />
                  </Route>

                  {/* Students Management */}
                  <Route path="students">
                    <Route index element={<List columns={studentColumns} api="students" title="Students" />} />
                    <Route path="search/:Id" element={<Single />} />
                    <Route
                      path="new"
                      element={<New inputs={studentInputs} title="Add New Student" api="students" />}
                    />
                  </Route>

                  {/* Classes Management */}
                  <Route path="classes">
                    <Route index element={<List columns={classColumns} api="classes" title="Classes" />} />
                    <Route path="search/:Id" element={<Single />} />
                    <Route
                      path="new"
                      element={<New inputs={classInputs} title="Add New Class" api="classes" />}
                    />
                  </Route>

                  {/* Class Fees Management */}
                  <Route path="class-fees">
                    <Route index element={<List columns={classFeeColumns} api="class-fees" title="Class Fees" />} />
                    <Route path="search/:Id" element={<Single />} />
                    <Route
                      path="new"
                      element={<New inputs={classFeeInputs} title="Add New Class Fee" api="class-fees" />}
                    />
                  </Route>

                  {/* Fee Payments Management */}
                  <Route path="fee-payments">
                    <Route index element={<List columns={feePaymentColumns} api="fee-payments" title="Fee Payments" />} />
                    <Route path="search/:Id" element={<Single />} />
                    <Route
                      path="new"
                      element={<New inputs={feePaymentInputs} title="Add New Fee Payment" api="fee-payments" />}
                    />
                  </Route>

                  {/* Receipts Management */}
                  <Route path="receipts">
                    <Route index element={<List columns={receiptColumns} api="receipts" title="Receipts" />} />
                    <Route path="search/:Id" element={<Single />} />
                    <Route
                      path="new"
                      element={<New inputs={receiptInputs} title="Add New Receipt" api="receipts" />}
                    />
                  </Route>

                  {/* Academic Years Management */}
                  <Route path="academic-years">
                    <Route index element={<List columns={academicYearColumns} api="academic-years" title="Academic Years" />} />
                    <Route path="search/:Id" element={<Single />} />
                    <Route
                      path="new"
                      element={<New inputs={academicYearInputs} title="Add New Academic Year" api="academic-years" />}
                    />
                  </Route>

                  {/* Profile */}
                  <Route path="profile">
                    <Route index element={<Home />} />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;