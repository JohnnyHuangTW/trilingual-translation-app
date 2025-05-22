import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { cva } from "@/lib/utils";

const containerVariants = cva("min-h-screen transition-colors duration-300", {
  variants: {
    darkMode: {
      true: "bg-gray-900 text-white",
      false: "bg-white text-black",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const headerVariants = cva(
  "fixed top-0 z-50 w-full backdrop-blur-md border-b",
  {
    variants: {
      darkMode: {
        true: "bg-gray-800/80 border-gray-700/30",
        false: "bg-white/80 border-gray-200/30",
      },
    },
    defaultVariants: {
      darkMode: true,
    },
  },
);

const themeButtonVariants = cva("p-2 rounded-full", {
  variants: {
    darkMode: {
      true: "bg-gray-700 text-yellow-300",
      false: "bg-gray-200 text-gray-700",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const logoVariants = cva("font-medium text-xl", {
  variants: {
    darkMode: {
      true: "text-white",
      false: "text-gray-900",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const titleVariants = cva("text-4xl font-semibold tracking-tight", {
  variants: {
    darkMode: {
      true: "text-white",
      false: "text-gray-900",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const subtitleVariants = cva("text-xl font-medium mt-2", {
  variants: {
    darkMode: {
      true: "text-gray-300",
      false: "text-gray-500",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

export default function AuthLayout({
  children,
  title = "Sign in to your account",
}: {
  children: ReactNode;
  title?: string;
}) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={containerVariants({ darkMode })}>
      {/* Navigation */}
      <header className={headerVariants({ darkMode })}>
        <div className="max-w-[980px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className={logoVariants({ darkMode })}>
              TranslateX
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={themeButtonVariants({ darkMode })}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center pt-12">
        <div className="max-w-md w-full px-4">
          <div className="text-center mb-8">
            <h2 className={titleVariants({ darkMode })}>TranslateX</h2>
            <p className={subtitleVariants({ darkMode })}>{title}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
