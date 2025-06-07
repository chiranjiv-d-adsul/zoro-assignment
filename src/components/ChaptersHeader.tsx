"use client";
import { useDispatch, useSelector } from "react-redux";
import { sortChapters } from "@/lib/features/chaptersSlice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, SortAsc, SortDesc } from "lucide-react";
import { Chapter } from "@/lib/utility"
import type { RootState } from "@/lib/store";
import { Separator } from "./ui/separator";

interface ChaptersHeaderProps {
  filteredChapters: Chapter[];
}

export default function ChaptersHeader({
  filteredChapters,
}: ChaptersHeaderProps) {
  const dispatch = useDispatch();
  const { sortDirection } = useSelector((state: RootState) => state.chapters);

  const handleSort = (direction: "asc" | "desc") => {
    dispatch(sortChapters(direction));
  };

  return (
    <div className="flex items-center justify-between p-3 md:p-6 bg-background">
      <span className="text-xs md:text-sm text-black dark:text-white">
        Showing all chapters ({filteredChapters.length})
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500  hover:cursor-pointer  hover:text-blue-600 h-8 text-xs md:text-sm"
          >
            <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            Sort {sortDirection === "asc" ? "A-Z" : "Z-A"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="dark:bg-[#2d333c]">
          <DropdownMenuItem
            className="flex items-center gap-2 "
            onClick={() => handleSort("asc")}
          >
            <SortAsc className="h-4 w-4" />
            <span>A to Z</span>
            {sortDirection === "asc" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <Separator className=""/>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => handleSort("desc")}
          >
            <SortDesc className="h-4 w-4" />
            <span>Z to A</span>
            {sortDirection === "desc" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
