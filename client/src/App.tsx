import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./components/landing/Landing";
//import { LogIn } from "./components/logIn/LogIn";
import { LogIn2 } from "./components/logIn2/logIn2";
import { About } from "./components/about/About";
import HomeContainer from "./components/homeContainer/HomeContainer";
import { Registro } from "./components/registro/Registro";
//import { FormVenta } from "./components/formVenta/formVenta";
//import { FormTasar } from "./components/formTasar/formTasar";
import { Form } from "./components/form/form";
import { CardDetail } from "./components/cardDetail/CardDetail";
import { ResetPassword } from "./components/resetPassword/ResetPassword";
import { CreateNewPassword } from "./components/createNewPassword/CreateNewPassword";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeContainer />} />
        <Route path="/login" element={<LogIn2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/property/:id" element={<CardDetail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/newPass" element={<CreateNewPassword />} />
      </Routes>
    </div>
  );
}

export default App;
//
