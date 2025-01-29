import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPage from "../page/Auth";
import PokerPage from "../page/Poker";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/poker" element={<PokerPage />} />
      </Routes>
    </Router>
  );
}
