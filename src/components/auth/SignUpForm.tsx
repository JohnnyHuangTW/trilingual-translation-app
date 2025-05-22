import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useToast } from "@/components/ui/use-toast";
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

const passwordHintVariants = cva("text-xs text-gray-400 mt-1", {
  variants: {},
  defaultVariants: {},
});

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

const termsTextVariants = cva("text-xs text-center text-gray-400 mt-6", {
  variants: {},
  defaultVariants: {},
});

const termsLinkVariants = cva("text-blue-400 hover:underline", {
  variants: {},
  defaultVariants: {},
});

const loginLinkVariants = cva("text-sm text-center text-gray-400 mt-6", {
  variants: {},
  defaultVariants: {},
});

const loginTextVariants = cva("text-blue-400 hover:underline font-medium", {
  variants: {},
  defaultVariants: {},
});

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, fullName);
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
        duration: 5000,
      });
      navigate("/login");
    } catch (error) {
      setError("Error creating account");
    }
  };

  return (
    <AuthLayout title="Create your TranslateX account">
      <div className={formContainerVariants()}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className={labelVariants()}>
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputVariants()}
            />
          </div>
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
            <Label htmlFor="password" className={labelVariants()}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputVariants()}
            />
            <p className={passwordHintVariants()}>
              Password must be at least 8 characters
            </p>
          </div>
          {error && <p className={errorVariants()}>{error}</p>}

          <Button type="submit" className={submitButtonVariants()}>
            Create account
          </Button>

          <div className={termsTextVariants()}>
            By creating an account, you agree to our{" "}
            <Link to="/" className={termsLinkVariants()}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/" className={termsLinkVariants()}>
              Privacy Policy
            </Link>
          </div>

          <div className={loginLinkVariants()}>
            Already have an account?{" "}
            <Link to="/login" className={loginTextVariants()}>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
