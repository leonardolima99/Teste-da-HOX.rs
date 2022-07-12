import "./App.css";

import { Routes, Route } from "react-router-dom";

import { SignIn } from "@/pages/SignIn";
import { Home } from "@/pages/Home";
import { NewEditProduct } from "@/pages/NewEditProduct";
import { PrivateRoute } from "@/components/PrivateRoute";

function App() {
  return (
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
      <Route
        path="/products/new"
        element={
          <PrivateRoute>
            <NewEditProduct action="new" />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/edit/:productId"
        element={
          <PrivateRoute>
            <NewEditProduct action="edit" />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>Error 404</h1>} />
    </Routes>
  );
}

export default App;
