import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./components/landing/Landing";
import { LogIn } from "./components/logIn/LogIn";
import { About } from "./components/about/About";
import HomeContainer from "./components/homeContainer/HomeContainer";
import { Registro } from "./components/registro/Registro";
//import { FormVenta } from "./components/formVenta/formVenta";
//import { FormTasar } from "./components/formTasar/formTasar";
import { Form } from "./components/form/form";
import { CardDetail } from "./components/cardDetail/CardDetail";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeContainer />} />
        <Route path="/logIN" element={<LogIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/formularioRegistro" element={<Registro />} />
        <Route path="/property/:id" element={<CardDetail />} />
        {/* <Route path="/formVenta" element={<FormVenta />} /> */}
        {/* <Route path="/formTasar" element={<FormTasar />} /> */}
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
//
