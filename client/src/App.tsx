import "./App.css";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import { BrokerHome } from "./components/Admin/BrokerHome";

function App() {
  const location = useLocation();

  return (
    <div>
      <Routes>
        <Route path="*" element={<BrokerHome />} />
      </Routes>
    </div>
  );
}

export default App;
//
