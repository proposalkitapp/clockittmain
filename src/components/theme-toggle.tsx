import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-accent/60 text-ink transition-all hover:scale-105 hover:bg-accent active:scale-95 ${className}`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-ink" />
      ) : (
        <Sun className="h-4 w-4 text-amber" />
      )}
    </button>
  );
}
