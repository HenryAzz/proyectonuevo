import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import { FirstFilters } from "./components/firstFilters/FirstFilters";
import { Landing } from "./components/landing/Landing";
import { LogIn } from "./components/logIn/LogIn";
import { About } from "./components/about/About";
import HomeContainer from "./components/homeContainer/HomeContainer";
import { Registro } from "./components/registro/Registro";
import { FormVenta } from "./components/formVenta/formVenta";
import { FormTasar } from "./components/formTasar/formTasar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeContainer />} />
        <Route path="/firstFilters" element={<FirstFilters />} />
        <Route path="/logIN" element={<LogIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/formularioRegistro" element={<Registro />} />

        <Route path="/formVenta" element={<FormVenta />} />
        <Route path="/formTasar" element={<FormTasar />} />

      </Routes>
    </div>
  );
}

export default App;
