import { BrokerHome } from "./Admin/BrokerHome";
import "./App.css";
import { Routes, Route } from "react-router-dom";

//import { BrokerHome } from "./components/Admin/BrokerHome";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BrokerHome />} />
        <Route path="/broker" element={<BrokerHome />} />
      </Routes>
    </div>
  );
}

export default App;
//
