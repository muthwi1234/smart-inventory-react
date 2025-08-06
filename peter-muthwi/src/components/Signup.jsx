import { useState } from "react";
import { registerUser } from "../Services/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setMessage("✅ Registered successfully");
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Name" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={handleChange} />
        <select name="role" className="w-full border p-2 rounded" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
