// src/routes/AdminRoute.jsx
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "qubitx123"; // change as needed

export default function AdminRoute({ children }) {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem("admin-auth") === "true";
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (auth) return children;

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin-auth", "true");
      setAuth(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark">
      <div className="p-6 rounded-xl shadow-md bg-white w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Admin Login</h2>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
}
