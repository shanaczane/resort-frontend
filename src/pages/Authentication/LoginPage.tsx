import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
  const [isGuestMode, setIsGuestMode] = useState(false); // Toggle between modes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const { login, guestLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isGuestMode) {
        await guestLogin(roomNumber, fullName);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-red-600">Guest Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={() => setIsGuestMode(!isGuestMode)}
          className="mb-4 text-blue-600 underline"
        >
          {isGuestMode
            ? "Switch to Email Login"
            : "Switch to Room Login (Post-Check-In)"}
        </button>
        <form onSubmit={handleSubmit}>
          {!isGuestMode ? (
            <>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block mb-2">Room Number</label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          New here?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
