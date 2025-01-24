import "./App.css";
import EmployeeComponent from "./Component/EmployeeComponent";
import FooterComponents from "./Component/FooterComponents";
import HeaderComponent from "./Component/HeaderComponent";
import ListEmployeeComponents from "./Component/ListEmployeeComponents";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />

      <Routes>
        {/* //http:localhost:3000 */}
       <Route path= '/' element= {<ListEmployeeComponents />}></Route>

       {/* //http:localhost:3000/employees */}
       <Route path= '/employees' element ={<ListEmployeeComponents />}></Route>

       {/* //http:localhost:3000/add-employee */}
       <Route path='/add-employee' element={<EmployeeComponent />}></Route>

       {/* //http:localhost:3000/update-employee/1 */}
       <Route path='/update-employee/:id'element={<EmployeeComponent />}></Route>
       
       </Routes>

        <FooterComponents />  
      </BrowserRouter>
    </>
  );
}

export default App;
