"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  ArrowUpDown,
  Sun,
  Moon,
  ChevronRight,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { RootState } from "@/lib/store";
import {
  setActiveSubject,
  setFilters,
  loadChapters,
  sortChapters,
} from "@/lib/features/chaptersSlice";
import { CaretRightIcon } from "@phosphor-icons/react";
import chaptersData from "@/lib/data.json";
import {
  getSubjectIcon,
  getChapterIcon,
  getTrendIcon,
} from "@/components/icons";
import Image from "next/image";

// Extract unique subjects from data
const getSubjectsFromData = () => {
  const uniqueSubjects = [
    ...new Set(
      chaptersData
        .filter((chapter) => chapter.subject)
        .map((chapter) => chapter.subject)
    ),
  ];

  return uniqueSubjects.map((subject) => ({
    id: subject,
    name: `${subject} PYQs`,
    shortName: subject.substring(0, 3),
    color:
      subject.toLowerCase() === "physics"
        ? "orange"
        : subject.toLowerCase() === "chemistry"
        ? "green"
        : "blue",
    bgColor:
      subject.toLowerCase() === "physics"
        ? "bg-orange-500/20"
        : subject.toLowerCase() === "chemistry"
        ? "bg-green-500/20"
        : "bg-blue-500/20",
  }));
};

// Get available years from the data
const getAvailableYears = () => {
  const years: string[] = [];

  chaptersData.forEach((chapter) => {
    if (chapter.yearWiseQuestionCount) {
      Object.keys(chapter.yearWiseQuestionCount).forEach((year) => {
        if (!years.includes(year)) {
          years.push(year);
        }
      });
    }
  });

  // Sort years in descending order (newest first)
  return years.sort((a, b) => parseInt(b) - parseInt(a));
};

const availableYears = getAvailableYears();
const currentYear = availableYears[0] || "2025";
const previousYear = availableYears[1] || "2024";
const oldestYear = availableYears[availableYears.length - 1] || "2009";

export default function JEEMainApp() {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const subjects = getSubjectsFromData();
  const [windowWidth, setWindowWidth] = useState(0);

  const { activeSubject, filteredChapters, filters, sortDirection } =
    useSelector((state: RootState) => state.chapters);

  useEffect(() => {
    setMounted(true);
    dispatch(loadChapters(chaptersData));

    // Handle window resize for responsive adjustments
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const getUniqueClasses = () => {
    const classes = [
      ...new Set(
        chaptersData
          .filter((ch) => ch.subject === activeSubject)
          .map((ch) => ch.class)
      ),
    ];
    return classes.sort();
  };

  const getUniqueUnits = () => {
    const units = [
      ...new Set(
        chaptersData
          .filter((ch) => ch.subject === activeSubject)
          .map((ch) => ch.unit)
      ),
    ];
    return units.sort();
  };

  type FilterKey = keyof typeof filters;

  const handleFilterChange = (filterType: FilterKey, value: string) => {
    dispatch(setFilters({ ...filters, [filterType]: value }));
  };

  const toggleFilter = (filterType: FilterKey) => {
    dispatch(setFilters({ ...filters, [filterType]: !filters[filterType] }));
  };

  const handleSort = (direction: "asc" | "desc") => {
    dispatch(sortChapters(direction));
  };

  useEffect(() => {
    // Resetting filters when active subject changes
    dispatch(
      setFilters({
        class: "",
        unit: "",
        notStarted: false,
        weakChapters: false,
      })
    );
  }, [activeSubject, dispatch]);

  const getQuestionCount = (chapter: any, year: string) => {
    return chapter.yearWiseQuestionCount &&
      chapter.yearWiseQuestionCount[year] !== undefined
      ? chapter.yearWiseQuestionCount[year]
      : 0;
  };

  // Function to truncate text based on screen size
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
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

      <div className="flex min-h-screen md:h-screen">
        {/* Desktop Sidebar - Hidden on Mobile */}
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
                  className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 text-left transition-colors ${
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:h-screen">
          {/* Mobile Subject Tabs - Hidden on Desktop */}
          <div className="md:hidden flex border-b border-border">
            {subjects.map((subject) => {
              const IconComponent = getSubjectIcon(subject.id);
              return (
                <button
                  key={subject.id}
                  onClick={() => dispatch(setActiveSubject(subject.id))}
                  className={`flex-1 flex flex-col cursor-pointer
 items-center py-3 px-2 relative ${
   activeSubject === subject.id ? "text-blue-500" : "text-muted-foreground"
 }`}
                >
                  <div className={`p-1 rounded-full ${subject.bgColor} mb-1`}>
                    <IconComponent
                      size={18}
                      className={`text-${subject.color}-500`}
                    />
                  </div>
                  <span className="text-xs font-medium">
                    {subject.shortName}
                  </span>
                  {activeSubject === subject.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-[60%] bg-[#6FBBFC]"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Header - Hidden on Mobile */}
          <div className="hidden md:block p-6 border-b border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-full ${
                    subjects.find((s) => s.id === activeSubject)?.bgColor
                  }`}
                >
                  {(() => {
                    const IconComponent = getSubjectIcon(activeSubject);
                    return (
                      <IconComponent
                        size={24}
                        className={`text-${
                          subjects.find((s) => s.id === activeSubject)?.color
                        }-500`}
                      />
                    );
                  })()}
                </div>
                <h2 className="text-2xl font-semibold">
                  {subjects.find((s) => s.id === activeSubject)?.name}
                </h2>
              </div>
              <p className="text-muted-foreground">
                Chapter-wise Collection of {activeSubject} PYQs
              </p>
            </div>
          </div>

          <div className="border-b bg-background">
            <div className="relative max-w-full">
              <div className="py-3 px-3 md:py-4 md:px-6">
                <div
                  className="flex gap-2 md:gap-3  overflow-x-auto scrollbar-hide pb-1"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <Select
                    value={filters.class}
                    onValueChange={(value) =>
                      handleFilterChange("class", value)
                    }
                  >
                    <SelectTrigger className="w-auto min-w-[70px] md:min-w-[80px] h-8 md:h-9 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-medium flex-shrink-0">
                      <SelectValue
                        placeholder="Class"
                        className="text-muted-foreground"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="" value="all">
                        All
                      </SelectItem>
                      {getUniqueClasses().map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.unit}
                    onValueChange={(value) => handleFilterChange("unit", value)}
                  >
                    <SelectTrigger className="w-auto min-w-[70px] md:min-w-[80px] h-8 md:h-9 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-medium flex-shrink-0">
                      <SelectValue
                        className="text-muted-foreground"
                        placeholder="Units"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-white " value="all">
                        All
                      </SelectItem>
                      {getUniqueUnits().map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant={filters.notStarted ? "default" : "outline"}
                    size="sm"
                    className="h-8 md:h-9 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0"
                    onClick={() => toggleFilter("notStarted")}
                  >
                    Not Started
                  </Button>

                  <Button
                    variant={filters.weakChapters ? "default" : "outline"}
                    size="sm"
                    className="h-8 md:h-9 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 mr-6"
                    onClick={() => toggleFilter("weakChapters")}
                  >
                    <span>{windowWidth < 340 ? "Weak" : "Weak Chapters"}</span>
                  </Button>
                </div>
              </div>

              <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-l from-background via-background to-transparent pl-4 pointer-events-none">
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Chapter Count and Sort */}
          <div className="flex items-center justify-between p-3 md:p-6 bg-background">
            <span className="text-xs md:text-sm text-black dark:text-white">
              Showing all chapters ({filteredChapters.length})
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-500 hover:text-blue-600 h-8 text-xs md:text-sm"
                >
                  <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  Sort {sortDirection === "asc" ? "A-Z" : "Z-A"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={() => handleSort("asc")}
                >
                  <SortAsc className="h-4 w-4" />
                  <span>A to Z</span>
                  {sortDirection === "asc" && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={() => handleSort("desc")}
                >
                  <SortDesc className="h-4 w-4" />
                  <span>Z to A</span>
                  {sortDirection === "desc" && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Chapter List */}
          <div className="flex-1 overflow-y-auto bg-background pb-20 md:pb-6">
            <div className="space-y-1 md:space-y-3">
              {filteredChapters.map((chapter) => {
                const IconComponent = getChapterIcon(chapter.chapter);
                const curYearCount = getQuestionCount(chapter, currentYear);
                const prevYearCount = getQuestionCount(chapter, previousYear);
                const TrendIcon = getTrendIcon(curYearCount, prevYearCount);
                const totalQs = Object.values(
                  chapter.yearWiseQuestionCount
                ).reduce((a: number, b: number) => a + b, 0);

                const maxLength =
                  windowWidth < 340
                    ? 18
                    : windowWidth < 375
                    ? 22
                    : windowWidth < 425
                    ? 28
                    : 35;

                return (
                  <div
                    key={`${chapter.subject}-${chapter.chapter}`}
                    className="mx-0 md:mx-6 border-b md:border-0 border-border"
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden flex items-start p-3">
                      <div
                        className={`p-2 rounded-full ${
                          chapter.subject.toLowerCase() === "physics"
                            ? "bg-orange-500/20"
                            : chapter.subject.toLowerCase() === "chemistry"
                            ? "bg-green-500/20"
                            : "bg-blue-500/20"
                        } mr-3 mt-0.5 flex-shrink-0`}
                      >
                        <IconComponent
                          size={16}
                          className={
                            chapter.subject.toLowerCase() === "physics"
                              ? "text-orange-500"
                              : chapter.subject.toLowerCase() === "chemistry"
                              ? "text-green-500"
                              : "text-blue-500"
                          }
                        />
                      </div>

                      <div className="flex-1 min-w-0 mr-2">
                        <h3
                          className="font-medium text-sm leading-tight mb-1 line-clamp-2"
                          title={chapter.chapter}
                        >
                          {truncateText(chapter.chapter, maxLength)}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
                          <span className="whitespace-nowrap">
                            {currentYear}: {curYearCount}Qs
                          </span>
                          {TrendIcon && (
                            <TrendIcon
                              size={12}
                              className={
                                curYearCount > prevYearCount
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            />
                          )}
                          <span className="whitespace-nowrap">
                            | {previousYear}: {prevYearCount}Qs
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-medium whitespace-nowrap">
                          {chapter.questionSolved}/{totalQs} Qs
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full ${
                            chapter.subject.toLowerCase() === "physics"
                              ? "bg-orange-500/20"
                              : chapter.subject.toLowerCase() === "chemistry"
                              ? "bg-green-500/20"
                              : "bg-blue-500/20"
                          }`}
                        >
                          <IconComponent
                            size={24}
                            className={
                              chapter.subject.toLowerCase() === "physics"
                                ? "text-orange-500"
                                : chapter.subject.toLowerCase() === "chemistry"
                                ? "text-green-500"
                                : "text-blue-500"
                            }
                          />
                        </div>
                        <h3 className="font-medium">{chapter.chapter}</h3>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <span className="text-sm">
                              {currentYear}: {curYearCount}Qs
                            </span>
                            {TrendIcon && (
                              <TrendIcon
                                size={16}
                                className={
                                  curYearCount > prevYearCount
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {previousYear}: {prevYearCount}Qs
                          </div>
                        </div>

                        <div className="text-right min-w-20">
                          <div className="text-sm font-medium">
                            {chapter.questionSolved}/{totalQs} Qs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
