import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/shared/Layout";
import { AuthProvider, AuthContext } from "./context/AuthProvider";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

function App() {
  const { authToken } = useContext(AuthContext);
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={authToken ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={authToken ? <Layout /> : <Navigate to="/login" />}
          >
            <Route index element={<Products />} />
            <Route path="order" element={<Orders />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
