import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function Login({ isModel = false, onSwitchToRegister }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setMessage({ text: "Both fields are required", type: "error" });
    }
    try {
      setLoading(true);
      const res = await login(formData);
      dispatch(setUserData(res.data));
      setMessage({ text: res.data.message, type: "success" });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Something went wrong...",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className={`w-full ${isModel ? "py-4" : "min-h-screen bg-gray-100 flex items-center justify-center px-4"}`}
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>

          {message.text && (
            <div
              className={`text-sm text-center px-4 py-2 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Loging..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500 space-y-2">
          <div>
            <Link
              to="/forgotPassword"
              className="text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div>
            Don't have an account?{" "}
            <span
              onClick={onSwitchToRegister}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
