import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./components/landing/Landing";
import { LogIn2 } from "./components/logIn2/logIn2";
import { About } from "./components/about/About";
import HomeContainer from "./components/homeContainer/HomeContainer";
import { Registro } from "./components/registro/Registro";
import { Form } from "./components/form/form";
import { CardDetail } from "./components/cardDetail/CardDetail";
import { ResetPassword } from "./components/resetPassword/ResetPassword";
import { CreateNewPassword } from "./components/createNewPassword/CreateNewPassword";
import { Signal } from "./components/reserva/Reserva";
import { Review } from "./components/review/Review";
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
        <Route path="/reserva/:id" element={<Signal />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
//
