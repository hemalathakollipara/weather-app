import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import MyCityPage from "./pages/MyCityPage/MyCityPage";
import CityPage from "./pages/CityPage/CityPage";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/my-city" element={<MyCityPage />} />
        <Route path="/city" element={<CityPage />} />
      </Routes>
    </Router>
  );
}
