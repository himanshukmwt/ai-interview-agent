import { useState } from "react";
import { forgotPassword } from "../services/api";

function ForgotPassword({ isModel=false,onBack, onSuccess }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setmessage("");
    setLoading(true);
    try {
      await forgotPassword({email});

      onSuccess(email);
    } catch (err) {
      setmessage(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`w-full ${isModel ? "py-4" : "min-h-screen bg-gray-100 flex items-center justify-center px-4"}`}
    >
      <form onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h2>

        <label className="block text-sm text-gray-600 mb-1">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
         
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="yourname123@gmail.com"
        />

        {message && (
          <p className="text-red-600 text-md mb-3 text-center bg-red-100">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>


        <button
          type="button"
          onClick={onBack}
          className="w-full mt-3 text-md text-indigo-500 hover:underline cursor-pointer"
        >

          Back to Login
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;