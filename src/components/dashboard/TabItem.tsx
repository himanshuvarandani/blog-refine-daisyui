import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from "@heroicons/react/24/outline";
import React from "react";
import { TTab } from "../../interfaces";
import { TabsModal } from "./TabsModal";

type TTabItem = {
  label: string;
  desc: string;
  total: number;
  trend: number;
  formatValue?: (value: number | string) => typeof value;
  isActive: boolean;
  setActiveTab: () => void;
  hiddenTabs: TTab[];
  setViewTabs: (newTab: TTab) => void;
};

export const TabItem = ({
  label,
  desc,
  total,
  trend,
  formatValue = (value) => value,
  isActive,
  setActiveTab,
  hiddenTabs,
  setViewTabs,
}: TTabItem) => {
  const percent = Math.round((trend / total) * 100);
  const [showDesc, setShowDesc] = React.useState(false);
  const [showTabs, setShowTabs] = React.useState(false);
  const tabsModalRef = React.useRef<HTMLDivElement>(null);

  return (
    <a
      className={`stat my-2 mx-1 py-4 flex-1 rounded-2xl ${
        isActive ? "bg-gray-100" : ""
      } hover:bg-gray-100`}
      onClick={setActiveTab}
    >
      <div className="flex justify-between relative">
        <div
          className="stat-title w-full underline underline-offset-4 decoration-dotted decoration-gray-400"
          onMouseEnter={() => setShowDesc(true)}
          onMouseLeave={() => setShowDesc(false)}
        >
          {label}
        </div>

        {!showDesc ? null : (
          <div className="absolute top-[200%] z-50 rounded-lg left-5 bg-zinc-50 shadow-lg space-y-3 p-2">
            <p className="text-lg font-bold">{label}</p>
            <p className="text-sm">{desc}</p>
          </div>
        )}

        <div
          className="stat-figure cursor-pointer relative rounded hover:bg-gray-200 p-1"
          ref={tabsModalRef}
        >
          <PencilIcon
            className="h-5 w-5"
            onClick={(e) => {
              e.stopPropagation();
              setShowTabs(prev => !prev);
            }}
          />
          <TabsModal
            modalRef={tabsModalRef}
            hiddenTabs={hiddenTabs}
            showModal={showTabs}
            closeModal={() => setShowTabs(false)}
            setViewTabs={setViewTabs}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 my-2">
        <p className="stat-value text-3xl">{formatValue(total ?? "...")}</p>
        {percent == 0 ? null : (
          <>
            {total > trend ? (
              <ChevronUpIcon className="h-3 w-3 stat-desc" />
            ) : (
              <ChevronDownIcon className="h-3 w-3 stat-desc" />
            )}
            <p className="stat-desc">{percent}%</p>
          </>
        )}
      </div>
    </a>
  );
};
