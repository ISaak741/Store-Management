import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import { AuthProvider } from "./context/AuthProvider";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="order" element={<Orders />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
