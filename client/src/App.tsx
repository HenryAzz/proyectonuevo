import "./App.css";
import { Routes, Route } from "react-router-dom";
import { FirstFilters } from "./components/firstFilters/FirstFilters";
import { Landing } from "./components/landing/Landing";
import { LogIn } from "./components/logIn/LogIn";
import { SecondFilters } from "./components/secondFilters/SecondFilters";
import { About } from "./components/about/About";
import HomeContainer from "./components/homeContainer/HomeContainer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeContainer />} />
        <Route path="/firstFilters" element={<FirstFilters />} />
        <Route path="/secondFilters" element={<SecondFilters />} />
        <Route path="/logIN" element={<LogIn />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
