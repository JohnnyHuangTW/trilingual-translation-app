import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto border border-gray-700/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-lg bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
          >
            Sign in
          </Button>

          <div className="text-sm text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
