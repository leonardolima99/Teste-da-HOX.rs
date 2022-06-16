import "./App.css";

import { Routes, Route } from "react-router-dom";

import { Example1 } from "@/components/Example1";
import { Example } from "@/components/Example";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Example1 />} />
        <Route path="/1" element={<Example />} />
      </Routes>
    </>
  );
}

export default App;
