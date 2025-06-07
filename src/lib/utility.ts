import chaptersData from "./data.json";

// Extract unique subjects from data
export const getSubjectsFromData = () => {
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
export const getAvailableYears = () => {
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

// Get unique classes for a subject
export const getUniqueClasses = (activeSubject: string) => {
  const classes = [
    ...new Set(
      chaptersData
        .filter((ch) => ch.subject === activeSubject)
        .map((ch) => ch.class)
    ),
  ];
  return classes.sort();
};

// Get unique units for a subject
export const getUniqueUnits = (activeSubject: string) => {
  const units = [
    ...new Set(
      chaptersData
        .filter((ch) => ch.subject === activeSubject)
        .map((ch) => ch.unit)
    ),
  ];
  return units.sort();
};

// Function to truncate text based on screen size
export const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export interface Chapter {
  yearWiseQuestionCount?: Record<string, number>;
  subject: string;
  chapter: string;
  questionSolved: number;
  class?: string;
  unit?: string;
}

export const getQuestionCount = (chapter: Chapter, year: string) => {
  return chapter.yearWiseQuestionCount &&
    chapter.yearWiseQuestionCount[year] !== undefined
    ? chapter.yearWiseQuestionCount[year]
    : 0;
};
