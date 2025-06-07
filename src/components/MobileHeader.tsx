"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Sun, Moon } from "lucide-react";

interface MobileHeaderProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export default function MobileHeader({ theme, setTheme }: MobileHeaderProps) {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold">JEE Main</h1>
      </div>
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
        <Moon className="h-4 w-4" />
      </div>
    </div>
  );
}
