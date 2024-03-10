import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from "@heroicons/react/24/outline";
import React from "react";
import { TTab } from "../../interfaces";
import { TabsModal } from "./TabsModal";

type TTabItem = {
  label: string;
  total: number;
  trend: number;
  formatTotal?: (value: number | string) => typeof value;
  isActive: boolean;
  clickHandler: () => void;
};

export const TabItem = ({
  label,
  total,
  trend,
  formatTotal = (value) => value,
  isActive,
  clickHandler,
}: TTabItem) => {
  const percent = Math.round((trend / total) * 100);

  return (
    <a
      className={`stat my-2 mx-1 py-4 flex-1 rounded-2xl ${
        isActive ? "bg-gray-100" : ""
      } hover:bg-gray-100`}
      onClick={clickHandler}
    >
      <div className="flex justify-between relative">
        <div className="stat-title w-full underline underline-offset-4 decoration-dotted decoration-gray-400">
          {label}
        </div>
      </div>

      <div className="flex items-center space-x-2 my-2">
        <p className="stat-value text-3xl">{formatTotal(total ?? "...")}</p>
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
