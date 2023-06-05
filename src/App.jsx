import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import Error404 from "./Components/ErrorPage/Error404";
import AdminPage from "./Components/AdminPage/AdminPage";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import { Routes, Route } from "react-router-dom";
import TermsAndConditions from "./Components/TermsAndConditions/Terms";
import CancelBooking from "./Components/CancelBooking/CancelBooking";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/resetPassword/:id" element={<ResetPassword />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cancelBooking/:id" element={<CancelBooking />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
