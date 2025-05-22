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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { History, Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../supabase/auth";
import { useState } from "react";
import { cva } from "@/lib/utils";

interface TopNavigationProps {
  onDarkModeToggle?: (isDark: boolean) => void;
  darkMode?: boolean;
}

const navVariants = cva(
  "w-full h-16 border-b backdrop-blur-md flex items-center justify-between px-4 sm:px-6 fixed top-0 z-50 shadow-sm",
  {
    variants: {
      isDark: {
        true: "border-gray-700 bg-gray-900/90",
        false: "border-gray-200 bg-white/90",
      },
    },
    defaultVariants: {
      isDark: false,
    },
  },
);

const logoVariants = cva("font-medium text-xl", {
  variants: {
    isDark: {
      true: "text-white",
      false: "text-gray-900",
    },
  },
  defaultVariants: {
    isDark: false,
  },
});

const buttonVariants = cva("rounded-full h-9 w-9 transition-colors", {
  variants: {
    isDark: {
      true: "bg-gray-800 hover:bg-gray-700",
      false: "bg-gray-100 hover:bg-gray-200",
    },
  },
  defaultVariants: {
    isDark: false,
  },
});

const iconVariants = cva("h-4 w-4", {
  variants: {
    isDark: {
      true: "text-gray-300",
      false: "text-gray-700",
    },
  },
  defaultVariants: {
    isDark: false,
  },
});

const dropdownLabelVariants = cva("text-xs", {
  variants: {
    isDark: {
      true: "text-gray-300",
      false: "text-gray-500",
    },
  },
  defaultVariants: {
    isDark: false,
  },
});

const dropdownContentVariants = cva("rounded-xl border-none shadow-lg", {
  variants: {
    isDark: {
      true: "bg-gray-800 text-white",
      false: "",
    },
  },
  defaultVariants: {
    isDark: false,
  },
});

const separatorVariants = cva("", {
  variants: {
    isDark: {
      true: "bg-gray-700",
      false: "",
    },
  },
  defaultVariants: {
    isDark: false,
  },
});

const TopNavigation = ({
  onDarkModeToggle = () => {},
  darkMode = false,
}: TopNavigationProps) => {
  const { user, signOut } = useAuth();
  const [isDark, setIsDark] = useState(darkMode);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    onDarkModeToggle(newMode);
  };

  return (
    <div className={navVariants({ isDark })}>
      <div className="flex items-center">
        <Link to="/" className={logoVariants({ isDark })}>
          TranslateX
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Dark/Light Mode Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className={buttonVariants({ isDark })}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-yellow-300" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-700" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>{isDark ? "Light mode" : "Dark mode"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* History Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={buttonVariants({ isDark })}
              >
                <History className={iconVariants({ isDark })} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Translation History</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 hover:cursor-pointer">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt={user?.email || ""}
              />
              <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={dropdownContentVariants({ isDark })}
          >
            <DropdownMenuLabel className={dropdownLabelVariants({ isDark })}>
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={separatorVariants({ isDark })} />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className={separatorVariants({ isDark })} />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => signOut()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigation;
