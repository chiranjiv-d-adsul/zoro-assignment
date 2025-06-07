"use client";

import { getSubjectIcon } from "@/components/icons";
import { getSubjectsFromData } from "@/lib/utility";

interface DesktopHeaderProps {
  activeSubject: string;
}

export default function DesktopHeader({ activeSubject }: DesktopHeaderProps) {
  const subjects = getSubjectsFromData();

  return (
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
  );
}
