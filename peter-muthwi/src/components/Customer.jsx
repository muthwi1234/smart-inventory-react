import { useEffect, useState } from "react";
import { getCustomers, createCustomer } from "../Services/api";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      setMessage("❌ Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(form);
      setMessage("✅ Customer added successfully");
      setForm({ name: "", email: "" });
      fetchCustomers();
    } catch (err) {
      setMessage("❌ Failed to add customer");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Customers</h2>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-1/3"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded w-1/3"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      {message && <p className="mb-2 text-sm">{message}</p>}

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
