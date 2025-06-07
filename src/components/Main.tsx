"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "next-themes";
import type { RootState } from "@/lib/store";
import { loadChapters } from "@/lib/features/chaptersSlice";
import chaptersData from "@/lib/data.json";
import { getAvailableYears } from "@/lib/utility";
import MobileHeader from "@/components/MobileHeader"
import DesktopSidebar from "@/components/DesktopSidebar"
import MobileSubjectTabs from "@/components/MobileSubjectTabs";
import DesktopHeader from "@/components/DesktopHeader";
import FiltersBar from "@/components/FilterBar"
import ChaptersHeader from "@/components/ChaptersHeader";
import ChaptersList from "@/components/ChatperList"

const availableYears = getAvailableYears();
const currentYear = availableYears[0] || "2025";
const previousYear = availableYears[1] || "2024";
const oldestYear = availableYears[availableYears.length - 1] || "2009";

export default function JEEMainApp() {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const { activeSubject, filteredChapters } = useSelector(
    (state: RootState) => state.chapters
  );

  useEffect(() => {
    setMounted(true);
    dispatch(loadChapters(chaptersData));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader theme={theme} setTheme={setTheme} />

      <div className="flex min-h-screen md:h-screen">
        {/* Desktop Sidebar - Hidden on Mobile */}
        <DesktopSidebar
          currentYear={currentYear}
          oldestYear={oldestYear}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:h-screen">
          {/* Mobile Subject Tabs - Hidden on Desktop */}
          <MobileSubjectTabs />

          {/* Desktop Header - Hidden on Mobile */}
          <DesktopHeader activeSubject={activeSubject} />

          {/* Filters bar */}
          <FiltersBar windowWidth={windowWidth} />

          {/* Chapter Count and Sort */}
          <ChaptersHeader filteredChapters={filteredChapters} />

          {/* Chapter List */}
          <ChaptersList
            filteredChapters={filteredChapters}
            currentYear={currentYear}
            previousYear={previousYear}
          />
        </div>
      </div>
    </div>
  );
}
