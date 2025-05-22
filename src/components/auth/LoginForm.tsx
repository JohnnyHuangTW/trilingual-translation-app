import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { cva } from "@/lib/utils";

const formContainerVariants = cva(
  "bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto border border-gray-700/50",
  {
    variants: {},
    defaultVariants: {},
  },
);

const labelVariants = cva("text-sm font-medium text-gray-300", {
  variants: {},
  defaultVariants: {},
});

const inputVariants = cva(
  "h-12 rounded-lg bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500",
  {
    variants: {},
    defaultVariants: {},
  },
);

const forgotPasswordVariants = cva(
  "text-sm font-medium text-blue-400 hover:text-blue-300",
  {
    variants: {},
    defaultVariants: {},
  },
);

const errorVariants = cva("text-sm text-red-400", {
  variants: {},
  defaultVariants: {},
});

const submitButtonVariants = cva(
  "w-full h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium",
  {
    variants: {},
    defaultVariants: {},
  },
);

const signupLinkVariants = cva("text-blue-400 hover:underline font-medium", {
  variants: {},
  defaultVariants: {},
});

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
      <div className={formContainerVariants()}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className={labelVariants()}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputVariants()}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className={labelVariants()}>
                Password
              </Label>
              <Link to="/forgot-password" className={forgotPasswordVariants()}>
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
              className={inputVariants()}
            />
          </div>
          {error && <p className={errorVariants()}>{error}</p>}

          <Button type="submit" className={submitButtonVariants()}>
            Sign in
          </Button>

          <div className="text-sm text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className={signupLinkVariants()}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
