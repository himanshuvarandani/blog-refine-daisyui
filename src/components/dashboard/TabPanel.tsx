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
    <div className="mx-auto py-6">
      <ResponsiveLineChart
        lines={lines}
        data={data}
        formatValue={formatValue}
      />
    </div>
  );
};
