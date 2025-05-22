import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import { Button } from "@/components/ui/button";
import { Volume2, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cva } from "@/lib/utils";

const containerVariants = cva("min-h-screen", {
  variants: {
    darkMode: {
      true: "bg-gray-900 text-white",
      false: "bg-gray-50 text-black",
    },
  },
  defaultVariants: {
    darkMode: false,
  },
});

const inputContainerVariants = cva("p-4 sm:p-6 rounded-xl shadow-lg mb-6", {
  variants: {
    darkMode: {
      true: "bg-gray-800 border border-gray-700",
      false: "bg-white border border-gray-200",
    },
  },
  defaultVariants: {
    darkMode: false,
  },
});

const textareaVariants = cva("min-h-[120px] mb-4 text-base", {
  variants: {
    darkMode: {
      true: "bg-gray-700 border-gray-600 text-white",
      false: "bg-white",
    },
  },
  defaultVariants: {
    darkMode: false,
  },
});

const buttonVariants = cva("w-full text-white", {
  variants: {
    darkMode: {
      true: "bg-blue-600 hover:bg-blue-700",
      false: "bg-blue-600 hover:bg-blue-700",
    },
  },
  defaultVariants: {
    darkMode: false,
  },
});

const cardVariants = cva("overflow-hidden", {
  variants: {
    darkMode: {
      true: "bg-gray-800 border-gray-700",
      false: "bg-white",
    },
  },
  defaultVariants: {
    darkMode: false,
  },
});

const iconButtonVariants = cva("p-2 rounded-full", {
  variants: {
    darkMode: {
      true: "hover:bg-gray-700",
      false: "hover:bg-gray-100",
    },
  },
  defaultVariants: {
    darkMode: false,
  },
});

const textVariants = cva("", {
  variants: {
    darkMode: {
      true: "text-gray-300",
      false: "text-gray-700",
    },
  },
  defaultVariants: {
    darkMode: false,
  },
});

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  // In a real app, these would come from API calls with automatic language detection
  const translations = {
    en: inputText || "Hello, welcome to our translation app",
    de: inputText
      ? `${inputText} (German translation)`
      : "Hallo, willkommen bei unserer Übersetzungs-App",
    zh: inputText
      ? `${inputText} (Chinese translation)`
      : "您好，歡迎使用我們的翻譯應用程序",
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Text copied",
      description: "Translation copied to clipboard",
      duration: 2000,
    });
  };

  const playAudio = (text: string, lang: string) => {
    // In a real app, this would use a text-to-speech API
    toast({
      title: "Audio feature",
      description: `Playing ${lang} pronunciation (would use TTS API in production)`,
      duration: 2000,
    });
  };

  const handleTranslate = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDarkModeToggle = (isDark: boolean) => {
    setDarkMode(isDark);
  };

  return (
    <div className={containerVariants({ darkMode })}>
      <TopNavigation
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
      />

      <div className="pt-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Mobile-first translation interface based on wireframe */}
        <div className="max-w-xl mx-auto mt-4">
          {/* Translation Input */}
          <div className={inputContainerVariants({ darkMode })}>
            <Textarea
              placeholder="Type here to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={textareaVariants({ darkMode })}
            />
            <Button
              className={buttonVariants({ darkMode })}
              disabled={!inputText.trim()}
              onClick={handleTranslate}
            >
              {loading ? "Translating..." : "Translate"}
            </Button>
          </div>

          {/* Translation Cards - Stacked for mobile, side by side for larger screens */}
          <div className="space-y-4">
            {/* English Card */}
            <Card className={cardVariants({ darkMode })}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">English</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => playAudio(translations.en, "English")}
                      className={iconButtonVariants({ darkMode })}
                    >
                      <Volume2
                        size={18}
                        className={darkMode ? "text-gray-300" : ""}
                      />
                    </button>
                    <button
                      onClick={() => handleCopyText(translations.en)}
                      className={iconButtonVariants({ darkMode })}
                    >
                      <Copy
                        size={18}
                        className={darkMode ? "text-gray-300" : ""}
                      />
                    </button>
                  </div>
                </div>
                <p className={textVariants({ darkMode })}>{translations.en}</p>
              </CardContent>
            </Card>

            {/* German Card */}
            <Card className={cardVariants({ darkMode })}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">German</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => playAudio(translations.de, "German")}
                      className={iconButtonVariants({ darkMode })}
                    >
                      <Volume2
                        size={18}
                        className={darkMode ? "text-gray-300" : ""}
                      />
                    </button>
                    <button
                      onClick={() => handleCopyText(translations.de)}
                      className={iconButtonVariants({ darkMode })}
                    >
                      <Copy
                        size={18}
                        className={darkMode ? "text-gray-300" : ""}
                      />
                    </button>
                  </div>
                </div>
                <p className={textVariants({ darkMode })}>{translations.de}</p>
              </CardContent>
            </Card>

            {/* Chinese Card */}
            <Card className={cardVariants({ darkMode })}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Chinese</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => playAudio(translations.zh, "Chinese")}
                      className={iconButtonVariants({ darkMode })}
                    >
                      <Volume2
                        size={18}
                        className={darkMode ? "text-gray-300" : ""}
                      />
                    </button>
                    <button
                      onClick={() => handleCopyText(translations.zh)}
                      className={iconButtonVariants({ darkMode })}
                    >
                      <Copy
                        size={18}
                        className={darkMode ? "text-gray-300" : ""}
                      />
                    </button>
                  </div>
                </div>
                <p className={textVariants({ darkMode })}>{translations.zh}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
