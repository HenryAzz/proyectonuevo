import "./App.css";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
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
import { UserProfile } from "./components/userProfile/UserProfile";
import { Success } from "./components/success/Success";
import { Fail } from "./components/fail/Fail";
import { NavBar } from "./components/navbar/Navbar";
import { Favorite } from "./components/favorite/Favorite";
import { BrokerHome } from "./components/Admin/BrokerHome";

function App() {
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/" && location.pathname !== "/broker";
  return (
    <div>
      {shouldShowNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Outlet />} />
        <Route path="/broker" element={<BrokerHome />} />
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
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
//
