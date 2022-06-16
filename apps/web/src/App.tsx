import "./App.css";

import { Routes, Route } from "react-router-dom";

import { SignIn } from "@/pages/SignIn";
import { Example } from "@/components/Example";

function App() {
  return (
    <div className="App App-header">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/1" element={<Example />} />
      </Routes>
    </div>
  );
}

export default App;
