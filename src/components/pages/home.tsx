import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Moon,
  Sun,
  User,
  Settings,
  Volume2,
  Copy,
  History,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
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

const dropdownContentVariants = cva("rounded-xl border-none shadow-lg", {
  variants: {
    darkMode: {
      true: "bg-gray-800 text-white",
      false: "bg-white text-black",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const signInButtonVariants = cva("text-sm font-light", {
  variants: {
    darkMode: {
      true: "hover:text-gray-300",
      false: "hover:text-gray-500",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const getStartedButtonVariants = cva("rounded-full text-white text-sm px-4", {
  variants: {
    darkMode: {
      true: "bg-blue-600 hover:bg-blue-700",
      false: "bg-black hover:bg-gray-800",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const sectionVariants = cva("py-20", {
  variants: {
    darkMode: {
      true: "bg-gray-900",
      false: "bg-white",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const subtitleVariants = cva("text-xl md:text-2xl font-medium mb-4", {
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

const featureSectionVariants = cva("py-20 text-center", {
  variants: {
    darkMode: {
      true: "bg-gray-800",
      false: "bg-[#f5f5f7]",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const featureCardVariants = cva("p-8 rounded-2xl shadow-sm text-left", {
  variants: {
    darkMode: {
      true: "bg-gray-700",
      false: "bg-white",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const featureTextVariants = cva("", {
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

const footerVariants = cva("py-12 text-xs", {
  variants: {
    darkMode: {
      true: "bg-gray-800 text-gray-400",
      false: "bg-[#f5f5f7] text-gray-500",
    },
  },
  defaultVariants: {
    darkMode: true,
  },
});

const footerBorderVariants = cva(
  "border-b pb-8 grid grid-cols-1 md:grid-cols-4 gap-8",
  {
    variants: {
      darkMode: {
        true: "border-gray-700",
        false: "border-gray-300",
      },
    },
    defaultVariants: {
      darkMode: true,
    },
  },
);

const footerHeadingVariants = cva("font-medium text-sm mb-4", {
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

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(true);
  // No translation state needed on landing page

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // In a real app, this would update the document class for dark mode
  };

  return (
    <div className={containerVariants({ darkMode })}>
      {/* Navigation */}
      <header className={headerVariants({ darkMode })}>
        <div className="max-w-[980px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl">
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

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-light hover:text-gray-500"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 hover:cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={dropdownContentVariants({ darkMode })}
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <History className="mr-2 h-4 w-4" />
                      History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className={signInButtonVariants({ darkMode })}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className={getStartedButtonVariants({ darkMode })}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-12">
        {/* Translation Interface */}
        <section className={`px-4 ${sectionVariants({ darkMode })}`}>
          <div className="max-w-[980px] mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-1">
                TranslateX
              </h2>
              <h3 className={subtitleVariants({ darkMode })}>
                Instant translations between English, German, and Chinese
              </h3>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className={featureSectionVariants({ darkMode })}>
          <div className="max-w-[980px] mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-1">
              Powerful Features
            </h2>
            <h3 className={subtitleVariants({ darkMode })}>
              Everything you need for seamless translations
            </h3>
            <div className="flex justify-center space-x-6 text-xl text-blue-600">
              <Link to="/" className="flex items-center hover:underline">
                Explore features <ChevronRight className="h-4 w-4" />
              </Link>
              <Link to="/" className="flex items-center hover:underline">
                View documentation <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={featureCardVariants({ darkMode })}>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Volume2 className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-medium mb-2">
                  Audio Pronunciation
                </h4>
                <p className={featureTextVariants({ darkMode })}>
                  Listen to accurate pronunciations of translated text in all
                  supported languages.
                </p>
              </div>
              <div className={featureCardVariants({ darkMode })}>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <History className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-medium mb-2">
                  Translation History
                </h4>
                <p className={featureTextVariants({ darkMode })}>
                  Keep track of your past translations with a comprehensive
                  history timeline.
                </p>
              </div>
              <div className={featureCardVariants({ darkMode })}>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Moon className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-medium mb-2">Dark Mode</h4>
                <p className={featureTextVariants({ darkMode })}>
                  Enjoy a comfortable translation experience day or night with
                  our elegant dark mode.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={footerVariants({ darkMode })}>
        <div className="max-w-[980px] mx-auto px-4">
          <div className={footerBorderVariants({ darkMode })}>
            <div>
              <h4 className={footerHeadingVariants({ darkMode })}>
                TranslateX
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Supported Languages
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    API Access
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={footerHeadingVariants({ darkMode })}>Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={footerHeadingVariants({ darkMode })}>Community</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={footerHeadingVariants({ darkMode })}>Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4">
            <p>Copyright © 2025 TranslateX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
