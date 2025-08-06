import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Customer from "./components/Customer";
import Product from "./components/Product";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 text-white">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/signup" className="hover:underline">Signup</Link></li>
          <li><Link to="/login" className="hover:underline">Login</Link></li>
          <li><Link to="/customers" className="hover:underline">Customers</Link></li>
          <li><Link to="/products" className="hover:underline">Products</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<h1 className="text-2xl font-bold">Welcome to Inventory System</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/products" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}
