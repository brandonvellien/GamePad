import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

//composant
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:gameId" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
