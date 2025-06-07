"use client";

import { useDispatch, useSelector } from "react-redux";
import { setActiveSubject } from "@/lib/features/chaptersSlice";
import { getSubjectIcon } from "@/components/icons";
import { getSubjectsFromData } from "@/lib/utility";
import type { RootState } from "@/lib/store";

export default function MobileSubjectTabs() {
  const dispatch = useDispatch();
  const { activeSubject } = useSelector((state: RootState) => state.chapters);
  const subjects = getSubjectsFromData();

  return (
    <div className="md:hidden w-full flex border-b border-border">
      {subjects.map((subject) => {
        const IconComponent = getSubjectIcon(subject.id);
        return (
          <button
            key={subject.id}
            onClick={() => dispatch(setActiveSubject(subject.id))}
            className={`flex-1 flex flex-col cursor-pointer
items-center py-3 px-2 relative ${
              activeSubject === subject.id
                ? "text-blue-500"
                : "text-muted-foreground"
            }`}
          >
            <div className={`p-1 rounded-full ${subject.bgColor} mb-1`}>
              <IconComponent
                size={18}
                className={`text-${subject.color}-500`}
              />
            </div>
            <span className="text-xs font-medium">{subject.shortName}</span>
            {activeSubject === subject.id && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-[60%] bg-[#6FBBFC]"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
