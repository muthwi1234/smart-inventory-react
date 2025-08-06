import { useEffect, useState } from "react";
import { getProducts, createProduct } from "../Services/api";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    barcode: "",
  });
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products); // Matches your controller
    } catch (err) {
      setMessage("❌ Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      setMessage("✅ Product added successfully");
      setForm({ name: "", price: "", quantity: "", description: "", barcode: "" });
      fetchProducts();
    } catch (err) {
      setMessage("❌ Failed to add product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2 mb-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 rounded" required />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="border p-2 rounded" required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded" />
        <input name="barcode" placeholder="Barcode" value={form.barcode} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 rounded col-span-5">
          Add Product
        </button>
      </form>

      {message && <p className="mb-2 text-sm">{message}</p>}

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Barcode</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">{p.quantity}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2">{p.barcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
