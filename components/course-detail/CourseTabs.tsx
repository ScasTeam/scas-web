"use client";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface CourseTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function CourseTabs({ tabs, activeTab, onTabChange }: CourseTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-white/10 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative font-days text-[10px] uppercase tracking-widest px-5 py-3 transition-all ${
            activeTab === tab.id
              ? "text-white"
              : "text-white/30 hover:text-white/60"
          }`}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`font-abel text-[9px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white/60"
                    : "bg-white/5 text-white/20"
                }`}
              >
                {tab.count}
              </span>
            )}
          </span>

          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
          )}
        </button>
      ))}
    </div>
  );
}
