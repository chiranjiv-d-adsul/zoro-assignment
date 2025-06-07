"use client";

import { useDispatch, useSelector } from "react-redux";
import { setActiveSubject } from "@/lib/features/chaptersSlice";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CaretRightIcon } from "@phosphor-icons/react";
import { getSubjectIcon } from "@/components/icons";
import { getSubjectsFromData } from "@/lib/utility";
import type { RootState } from "@/lib/store";

interface DesktopSidebarProps {
  currentYear: string;
  oldestYear: string;
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export default function DesktopSidebar({
  currentYear,
  oldestYear,
  theme,
  setTheme,
}: DesktopSidebarProps) {
  const dispatch = useDispatch();
  const { activeSubject } = useSelector((state: RootState) => state.chapters);
  const subjects = getSubjectsFromData();

  return (
    <div className="hidden md:flex w-80 border-r border-border bg-background flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 justify-center mx-auto mb-2">
          <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center">
            <Image
              src="/jee-logo.png"
              alt="JEE Main Logo"
              width={26}
              height={26}
              className="rounded-full"
            />
          </div>
          <h1 className="text-xl font-semibold">JEE Main</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {currentYear} - {oldestYear} | 173 Papers | 15825 Qs
        </p>
      </div>

      <div className="px-4 flex-1 overflow-y-auto">
        {subjects.map((subject) => {
          const IconComponent = getSubjectIcon(subject.id);
          return (
            <button
              key={subject.id}
              onClick={() => dispatch(setActiveSubject(subject.id))}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 hover:cursor-pointer text-left transition-colors ${
                activeSubject === subject.id
                  ? "bg-secondary text-white"
                  : "hover:bg-secondary/10"
              }`}
            >
              <div className={`p-2 rounded-full ${subject.bgColor}`}>
                <IconComponent
                  size={20}
                  className={`text-${subject.color}-500`}
                />
              </div>
              <span className="font-medium">{subject.name}</span>
              <CaretRightIcon size={16} className="ml-auto opacity-50" />
            </button>
          );
        })}
      </div>

      {/* Desktop Theme Toggle */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Theme</span>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
