import React from "react";
import { ResponsiveLineChart } from "./ResponsiveLineChart";
import { TLine, TTab } from "../../interfaces";

type TTabPanelProps = {
  isActive: boolean;
  lines: TLine[];
  data: any;
  formatValue: TTab["formatValue"];
};

export const TabPanel = ({
  isActive,
  lines,
  data,
  formatValue,
}: TTabPanelProps) => {
  return !isActive ? null : (
    <div className="mx-auto py-6 px-2">
      <ResponsiveLineChart
        lines={lines}
        data={data}
        formatValue={formatValue}
      />
      <div className="flex flex-wrap justify-end space-x-4 mt-2">
        {lines.map(line => (
          <div
            key={line.key}
            className="flex items-center space-x-4 rounded-xl bg-gray-100 py-1 px-2"
          >
            <hr
              className={`w-4 border-2 ${line.dash && "border-dashed"}`}
              style={{ borderColor: line.color }}
            />
            <p>{line.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
