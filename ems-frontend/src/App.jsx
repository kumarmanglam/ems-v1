import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import FooterComp from "./components/FooterComp";
import HeaderComp from "./components/HeaderComp";
import ListEmployee from "./components/ListEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComp />
        <Routes>
          {/* //htttp://localhost:3000 */}
          <Route path="/" element={<ListEmployee />} />
          {/* //htttp://localhost:3000/employees */}
          <Route path="/employees" element={<ListEmployee />} />
          {/* //htttp://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<EmployeeForm />} />
          {/* //htttp://localhost:3000/edit-employee/4 */}
          <Route path="/edit-employee/:id" element={<EmployeeForm />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  );
}

export default App;
