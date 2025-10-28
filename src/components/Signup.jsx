// src/components/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${VITE_API_URL}/api/signup`, {
      // const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.userId) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("signedUp", "true");
        alert("Signup successful");
        console.log("Signup successful");
        navigate("/", { replace: true });
      } else {
        alert(data.error || "Signup failed");
        console.log(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFD700] font-sans p-6">

      <div className="my-5">
        <img src="/icons/Logo1.svg" alt="Logo" className="w-50" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-amber-50 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold  text-[#0028FF] mb-4">Create account</h2>

        <label className="block mb-2">
          <span className="text-md font-semibold">Name</span>
          <input required name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </label>

        <label className="block mb-2">
          <span className="text-md font-semibold">Email</span>
          <input required name="email" type="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </label>

        <label className="block mb-2">
          <span className="text-md font-semibold">Phone</span>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </label>

        <label className="block mb-4">
          <span className="text-md font-semibold">Password</span>
          <input required name="password" type="password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
        </label>

        <button disabled={loading} type="submit" className="w-full border-2 border-[#0028FF] shadow-md shadow-orange-400 bg-[#0028FF] text-white py-4 rounded-xl font-bold">
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
