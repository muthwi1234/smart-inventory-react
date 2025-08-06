import { useState } from "react";
import { loginUser } from "../Services/api";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login successful");
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={handleChange} />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Login</button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
