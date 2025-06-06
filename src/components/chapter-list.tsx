"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ArrowUpDown } from "lucide-react";
import { CaretRightIcon } from "@phosphor-icons/react";
import chaptersData from "@/lib/data.json";
import {
  getSubjectIconJSX,
  getChapterIconJSX,
  getTrendIconJSX,
} from "@/components/icons";

// Extract unique subjects from the data
const getSubjectsFromData = () => {
  const uniqueSubjects = [
    ...new Set(
      chaptersData
        .filter((chapter) => chapter.subject) // Filter out items without subject
        .map((chapter) => chapter.subject)
    ),
  ];

  return uniqueSubjects.map((subject) => ({
    id: subject.toLowerCase(),
    name: subject,
    shortName: subject.substring(0, 3).toUpperCase(),
  }));
};

const subjects = getSubjectsFromData();

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

// Define types based on JSON structure
type Chapter = {
  subject: string;
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: {
    [year: string]: number;
  };
  questionSolved: number;
  status: string;
  isWeakChapter: boolean;
};

export default function ChapterList() {
  const [activeSubject, setActiveSubject] = useState(
    subjects.length > 0 ? subjects[0].id : "physics"
  );
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [filters, setFilters] = useState<{
    classes: string[];
    units: string[];
    notStarted: boolean;
    weakChapter: boolean;
  }>({
    classes: [],
    units: [],
    notStarted: false,
    weakChapter: false,
  });
  const [sortAscending, setSortAscending] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Filter chapters based on active subject and filters
    let result = chaptersData.filter(
      (chapter) =>
        chapter.subject && chapter.subject.toLowerCase() === activeSubject
    );

    if (filters.classes.length > 0) {
      result = result.filter((chapter) =>
        filters.classes.includes(chapter.class)
      );
    }

    if (filters.units.length > 0) {
      result = result.filter((chapter) => filters.units.includes(chapter.unit));
    }

    if (filters.notStarted) {
      result = result.filter((chapter) => chapter.status === "Not Started");
    }

    if (filters.weakChapter) {
      result = result.filter((chapter) => chapter.isWeakChapter);
    }

    // Sort chapters
    result = result.sort((a, b) => {
      if (sortAscending) {
        return a.chapter.localeCompare(b.chapter);
      } else {
        return b.chapter.localeCompare(a.chapter);
      }
    });

    setFilteredChapters(result);
  }, [activeSubject, filters, sortAscending]);

  const getTrendIcon = (
    currentYearCount: number,
    previousYearCount: number
  ) => {
    return getTrendIconJSX(currentYearCount, previousYearCount);
  };

  const getUniqueClasses = () => {
    const classes = [
      ...new Set(
        chaptersData
          .filter(
            (chapter) =>
              chapter.subject && chapter.subject.toLowerCase() === activeSubject
          )
          .map((chapter) => chapter.class)
      ),
    ];
    return classes;
  };

  const getUniqueUnits = () => {
    const units = [
      ...new Set(
        chaptersData
          .filter(
            (chapter) =>
              chapter.subject && chapter.subject.toLowerCase() === activeSubject
          )
          .map((chapter) => chapter.unit)
      ),
    ];
    return units;
  };

  const handleClassFilter = (value: string) => {
    if (value === "all") {
      setFilters({
        ...filters,
        classes: [],
      });
    } else {
      if (filters.classes.includes(value)) {
        setFilters({
          ...filters,
          classes: filters.classes.filter((c) => c !== value),
        });
      } else {
        setFilters({
          ...filters,
          classes: [...filters.classes, value],
        });
      }
    }
  };
  useEffect(() => {
    // Reset filters when active subject changes
    setFilters({
      classes: [],
      units: [],
      notStarted: false,
      weakChapter: false,
    });
  }, [activeSubject]);

  // Update the handleUnitFilter function similarly
  const handleUnitFilter = (value: string) => {
    // Handle "all" selection specially
    if (value === "all") {
      setFilters({
        ...filters,
        units: [], // Empty array means no unit filter
      });
    } else {
      if (filters.units.includes(value)) {
        setFilters({
          ...filters,
          units: filters.units.filter((u) => u !== value),
        });
      } else {
        setFilters({
          ...filters,
          units: [...filters.units, value],
        });
      }
    }
  };

  const toggleNotStarted = () => {
    setFilters({
      ...filters,
      notStarted: !filters.notStarted,
    });
  };

  const toggleWeakChapter = () => {
    setFilters({
      ...filters,
      weakChapter: !filters.weakChapter,
    });
  };

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  const getQuestionCount = (chapter: Chapter, year: string) => {
    return chapter.yearWiseQuestionCount &&
      chapter.yearWiseQuestionCount[year] !== undefined
      ? chapter.yearWiseQuestionCount[year]
      : 0;
  };

  const renderMobileView = () => (
    <div className="w-full flex flex-col h-screen">
      <div className="flex items-center p-4 border-b border-slate-800">
        <Button variant="ghost" size="icon" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">JEE Main</h1>
      </div>

      <Tabs
        defaultValue={subjects.length > 0 ? subjects[0].id : "physics"}
        className="w-full"
        onValueChange={setActiveSubject}
      >
        <div className="flex justify-center border-b border-slate-800">
          <TabsList className="grid grid-cols-3 w-full bg-transparent">
            {subjects.map((subject) => (
              <TabsTrigger
                key={subject.id}
                value={subject.id}
                className="flex flex-col items-center py-2 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 rounded-none"
              >
                <div
                  className={cn(
                    "rounded-full p-2 mb-1",
                    subject.id === "physics" &&
                      "bg-orange-500/20 text-orange-500",
                    subject.id === "chemistry" &&
                      "bg-green-500/20 text-green-500",
                    subject.id === "mathematics" &&
                      "bg-blue-500/20 text-blue-500"
                  )}
                >
                  {getSubjectIconJSX(subject.id)}
                </div>
                <span className="text-xs">{subject.shortName}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {subjects.map((subject) => (
          <TabsContent key={subject.id} value={subject.id} className="mt-0">
            <div className="flex overflow-x-auto space-x-2 p-2 border-b border-slate-800">
              <Select onValueChange={handleClassFilter}>
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  {getUniqueClasses().map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={handleUnitFilter}>
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue placeholder="Units" />
                </SelectTrigger>
                <SelectContent>
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
                className="h-8 text-xs whitespace-nowrap"
                onClick={toggleNotStarted}
              >
                Not Started
              </Button>

              <Button
                variant={filters.weakChapter ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs whitespace-nowrap"
                onClick={toggleWeakChapter}
              >
                Weak Chapter
              </Button>
            </div>

            <div className="flex justify-between items-center p-4">
              <p className="text-sm text-slate-400">
                Showing all chapters ({filteredChapters.length})
              </p>
              <Button variant="ghost" size="sm" onClick={toggleSort}>
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Sort
              </Button>
            </div>

            <div className="overflow-y-auto pb-16">
              {filteredChapters.map((chapter, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-slate-800"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={cn(
                        "rounded-full p-2",
                        chapter.subject.toLowerCase() === "physics" &&
                          "bg-orange-500/20 text-orange-500",
                        chapter.subject.toLowerCase() === "chemistry" &&
                          "bg-green-500/20 text-green-500",
                        chapter.subject.toLowerCase() === "mathematics" &&
                          "bg-blue-500/20 text-blue-500"
                      )}
                    >
                      {getChapterIconJSX(chapter.chapter)}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{chapter.chapter}</h3>
                      <div className="flex text-xs text-slate-400">
                        <span>
                          {currentYear}:{" "}
                          {getQuestionCount(chapter, currentYear)}Qs
                        </span>
                        <span className="mx-1">
                          {getTrendIcon(
                            getQuestionCount(chapter, currentYear),
                            getQuestionCount(chapter, previousYear)
                          )}
                        </span>
                        <span className="ml-1">
                          | {previousYear}:{" "}
                          {getQuestionCount(chapter, previousYear)}Qs
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{chapter.questionSolved} Qs</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );

  const renderDesktopView = () => (
    <>
      <div className="w-72 border-r border-slate-800 h-screen overflow-y-auto">
        <div className="p-4 flex items-center space-x-2">
          <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-full p-1">
            <div className="bg-slate-950 rounded-full p-1">
              <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-full h-4 w-4"></div>
            </div>
          </div>
          <h1 className="text-lg font-medium">JEE Main</h1>
        </div>

        <div className="px-4 py-2">
          <p className="text-xs text-slate-400">
            {availableYears.length > 0
              ? `${availableYears[0]} - ${
                  availableYears[availableYears.length - 1]
                }`
              : ""}{" "}
            | 173 Papers | 15825 Qs
          </p>
        </div>

        {subjects.map((subject) => (
          <Button
            key={subject.id}
            variant={activeSubject === subject.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start mb-1 pl-4",
              activeSubject === subject.id && "bg-slate-800"
            )}
            onClick={() => setActiveSubject(subject.id)}
          >
            <div
              className={cn(
                "rounded-full p-1 mr-2",
                subject.id === "physics" && "bg-orange-500/20 text-orange-500",
                subject.id === "chemistry" && "bg-green-500/20 text-green-500",
                subject.id === "mathematics" && "bg-blue-500/20 text-blue-500"
              )}
            >
              {getSubjectIconJSX(subject.id)}
            </div>
            <span>{subject.name}</span>
            <CaretRightIcon className="ml-auto h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center">
            <div
              className={cn(
                "rounded-full p-2 mr-2",
                activeSubject === "physics" &&
                  "bg-orange-500/20 text-orange-500",
                activeSubject === "chemistry" &&
                  "bg-green-500/20 text-green-500",
                activeSubject === "mathematics" &&
                  "bg-blue-500/20 text-blue-500"
              )}
            >
              {getSubjectIconJSX(activeSubject)}
            </div>
            <h2 className="text-xl font-medium">
              {subjects.find((s) => s.id === activeSubject)?.name}
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Chapter-wise Collection of{" "}
            {subjects.find((s) => s.id === activeSubject)?.name}
          </p>
        </div>

        <div className="p-4 flex space-x-2">
          <Select onValueChange={handleClassFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {getUniqueClasses().map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={handleUnitFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Units" />
            </SelectTrigger>
            <SelectContent>
              {getUniqueUnits().map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={filters.notStarted ? "default" : "outline"}
            onClick={toggleNotStarted}
          >
            Not Started
          </Button>

          <Button
            variant={filters.weakChapter ? "default" : "outline"}
            className="border-orange-500 text-orange-500 hover:text-orange-500"
            onClick={toggleWeakChapter}
          >
            Weak Chapter
          </Button>
        </div>

        <div className="flex justify-between items-center px-4 py-2">
          <p className="text-sm text-slate-400">
            Showing all chapters ({filteredChapters.length})
          </p>
          <Button variant="ghost" size="sm" onClick={toggleSort}>
            <ArrowUpDown className="h-4 w-4 mr-1" />
            Sort
          </Button>
        </div>

        <div className="p-4 space-y-2">
          {filteredChapters.map((chapter, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-900 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "rounded-full p-2",
                    chapter.subject.toLowerCase() === "physics" &&
                      "bg-orange-500/20 text-orange-500",
                    chapter.subject.toLowerCase() === "chemistry" &&
                      "bg-green-500/20 text-green-500",
                    chapter.subject.toLowerCase() === "mathematics" &&
                      "bg-blue-500/20 text-blue-500"
                  )}
                >
                  {getChapterIconJSX(chapter.chapter)}
                </div>
                <h3 className="font-medium">{chapter.chapter}</h3>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <span className="text-sm">
                      {currentYear}: {getQuestionCount(chapter, currentYear)}Qs
                    </span>
                    <span className="ml-1">
                      {getTrendIcon(
                        getQuestionCount(chapter, currentYear),
                        getQuestionCount(chapter, previousYear)
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    {previousYear}: {getQuestionCount(chapter, previousYear)}Qs
                  </p>
                </div>

                <div className="text-right min-w-20">
                  <p className="text-sm">{chapter.questionSolved} Qs</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return isMobile ? renderMobileView() : renderDesktopView();
}
