import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api.js";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const[message,setMessage]=useState({text:"", type:""});
  const [loading, setLoading] = useState(false);

  const handleChange=(e)=> {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit=async (e)=> {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      return setMessage({ text: "All fields are required", type: "error" });
    }

    if (formData.password.length < 6) {
      return setMessage({ text: "Password must hava more than 6 characters", type: "error" });
    }

    try {
      setLoading(true);
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
       setMessage({ text: res.data.message, type: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setMessage({
          text: err.response?.data?.message || "Something went wrong..",
          type: "error",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div >
            <label className="block text-sm text-gray-600 mb-1" >Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div >
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          
            />
          </div>

          <div >
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>

          {message.text && (
            <div className={`text-sm text-center px-4 py-2 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {message.text}
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>



        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{""}
          <Link to="/login"  className="text-indigo-600 hover:underline">sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
