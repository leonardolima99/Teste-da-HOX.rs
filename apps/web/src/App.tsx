import "./App.css";

import { Routes, Route } from "react-router-dom";

import { SignIn } from "@/pages/SignIn";
import { Home } from "@/pages/Home";
import { PrivateRoute } from "@/components/PrivateRoute";

function App() {
  return (
    <div className="App App-header">
      <Routes>
        <Route
          path="/signin"
          element={
            <PrivateRoute mustNotBeAuthenticated>
              <SignIn />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
