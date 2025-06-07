"use client";

import { getChapterIcon, getTrendIcon } from "@/components/icons";
import { Chapter, getQuestionCount } from "@/lib/utility";

interface ChaptersListProps {
  filteredChapters: Chapter[];
  currentYear: string;
  previousYear: string;
}

export default function ChaptersList({
  filteredChapters,
  currentYear,
  previousYear,
}: ChaptersListProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-background w-svw md:w-full pb-20 md:pb-6">
      <div className="space-y-1 md:space-y-3">
        {filteredChapters.map((chapter) => (
          <ChapterItem
            key={`${chapter.subject}-${chapter.chapter}`}
            chapter={chapter}
            currentYear={currentYear}
            previousYear={previousYear}
          />
        ))}
      </div>
    </div>
  );
}

interface ChapterItemProps {
  chapter: Chapter;
  currentYear: string;
  previousYear: string;
}

function ChapterItem({ chapter, currentYear, previousYear }: ChapterItemProps) {
  const IconComponent = getChapterIcon(chapter.chapter);
  const curYearCount = getQuestionCount(chapter, currentYear);
  const prevYearCount = getQuestionCount(chapter, previousYear);
  const TrendIcon = getTrendIcon(curYearCount, prevYearCount);
  const totalQs = Object.values(chapter.yearWiseQuestionCount || {}).reduce(
    (a: number, b: number) => a + b,
    0
  );

  return (
    <div className="mx-0 md:mx-6 border-b md:border-0 border-border">
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
            className="font-medium text-sm leading-tight mb-1 truncate"
            title={chapter.chapter}
          >
            {chapter.chapter}
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
}
