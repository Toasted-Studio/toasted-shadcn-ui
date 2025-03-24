"use client";

import React, { useEffect, useState } from "react";
import { Moon as MoonIcon, Sun as SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until after mounting to ensure the client and server match
  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="z-[9999] size-8 bg-transparent hover:bg-transparent hover:cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <SunIcon className="size-5 rotate-0 scale-100 transition-all hover:text-neutral-700 dark:-rotate-90 dark:scale-0" />
      ) : (
        <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all hover:text-neutral-100 dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
