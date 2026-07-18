import { useState } from "react";
import { resetPassword } from "../services/api";

function ResetPassword({isModel = false, resetToken, onBack, onSuccess}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage("");

    if (newPassword !== confirmPassword) {
      setmessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        resetToken,
        newPassword,
      });
      onSuccess();

    } catch (err) {
      setmessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full ${
        isModel
          ? "py-4"
          : "min-h-screen bg-gray-100 flex items-center justify-center px-4"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h2>

        <label className="block text-sm text-gray-600 mb-1">
          New Password
        </label>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="block text-sm text-gray-600 mb-1">
          Confirm Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {message && (
          <p className="text-red-500 text-sm mb-3">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full mt-3 text-sm text-blue-600 hover:underline"
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;