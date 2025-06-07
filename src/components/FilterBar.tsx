"use client";

import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/lib/features/chaptersSlice";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { getUniqueClasses, getUniqueUnits } from "@/lib/utility";
import type { RootState } from "@/lib/store";

interface FiltersBarProps {
  windowWidth: number;
}

export default function FiltersBar({ windowWidth }: FiltersBarProps) {
  const dispatch = useDispatch();
  const { activeSubject, filters } = useSelector(
    (state: RootState) => state.chapters
  );
  const filtersScrollRef = useRef<HTMLDivElement>(null);

  type FilterKey = keyof typeof filters;

  const handleFilterChange = (filterType: FilterKey, value: string) => {
    dispatch(setFilters({ ...filters, [filterType]: value }));
  };

  const toggleFilter = (filterType: FilterKey) => {
    dispatch(setFilters({ ...filters, [filterType]: !filters[filterType] }));
  };

  const scrollFiltersRight = () => {
    if (filtersScrollRef.current) {
      filtersScrollRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    dispatch(
      setFilters({
        class: "",
        unit: "",
        notStarted: false,
        weakChapters: false,
      })
    );
  }, [activeSubject, dispatch]);

  const uniqueClasses = getUniqueClasses(activeSubject);
  const uniqueUnits = getUniqueUnits(activeSubject);

  return (
    <div className="border-b bg-background">
      <div className="relative w-screen md:w-full">
        <div className="py-3 px-3 md:py-4 md:px-6">
          <div
            ref={filtersScrollRef}
            className="flex gap-2 md:gap-3 overflow-x-scroll  scrollbar-hide pb-1"
          >
            <Select
              value={filters.class}
              onValueChange={(value) => handleFilterChange("class", value)}
            >
              <SelectTrigger className=" hover:cursor-pointer w-auto min-w-[70px] md:min-w-[80px] h-8 md:h-9 md:px-4 rounded-xl border-2 text-xs md:text-sm font-medium flex-shrink-0">
                <SelectValue
                  placeholder="Class"
                  className="text-muted-foreground"
                />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#2f3845]">
                <SelectItem className="" value="all">
                  All
                </SelectItem>
                <Separator className="my-1" />

                {uniqueClasses.map((cls, index, array) => (
                  <div key={cls}>
                    <SelectItem className="hover:cursor-pointer" value={cls}>
                      {cls}
                    </SelectItem>
                    {index < array.length - 1 && <Separator className="my-1" />}
                  </div>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.unit}
              onValueChange={(value) => handleFilterChange("unit", value)}
            >
              <SelectTrigger className=" hover:cursor-pointer w-auto min-w-[70px] md:min-w-[80px] h-8 md:h-9 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-medium flex-shrink-0">
                <SelectValue
                  className="text-muted-foreground"
                  placeholder="Units"
                />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#2f3845]">
                <SelectItem className="" value="all">
                  All
                </SelectItem>
                <Separator className="my-1" />

                {uniqueUnits.map((unit, index, array) => (
                  <div key={unit}>
                    <SelectItem className="hover:cursor-pointer" value={unit}>
                      {unit}
                    </SelectItem>
                    {index < array.length - 1 && <Separator className="my-1" />}
                  </div>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={filters.notStarted ? "default" : "outline"}
              size="sm"
              className=" hover:cursor-pointer h-9 md:h-9 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0"
              onClick={() => toggleFilter("notStarted")}
            >
              Not Started
            </Button>

            <Button
              variant={filters.weakChapters ? "default" : "outline"}
              size="sm"
              className=" hover:cursor-pointer h-9 md:h-9 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 mr-6"
              onClick={() => toggleFilter("weakChapters")}
            >
              <span>{windowWidth < 340 ? "Weak" : "Weak Chapters"}</span>
            </Button>
          </div>
        </div>

        <div
          onClick={scrollFiltersRight}
          className="md:hidden block absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-l from-background via-background to-transparent pl-4 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
        </div>
      </div>
    </div>
  );
}
