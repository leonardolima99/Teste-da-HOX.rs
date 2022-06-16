import "./App.css";

import { Routes, Route } from "react-router-dom";

import { SignIn } from "@/pages/SignIn";
import { Home } from "@/pages/Home";

function App() {
  return (
    <div className="App App-header">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
