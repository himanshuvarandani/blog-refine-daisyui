import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import React from "react";
export const LineChartTooltip = ({
  active,
  payload,
  label,
  coordinate,
  lines, // lines as [{ label, key, color, dash? }]
  formatValue,
}: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;

    const tooltipStyle = {
      left: coordinate.x, // Adjust positioning
      top: coordinate.y, // Adjust positioning
    };

    return (
      <div
        className="py-1 px-3 flex flex-col justify-center items-start rounded-lg"
        style={tooltipStyle}
      >
        <p className="flex text-sm font-semibold">{label}</p>
        {lines.map((line: any, index: number) => (
          <div className="flex items-center text-sm space-x-4 my-1" key={line.key}>
            <hr
              className={`w-4 border-2 ${line.dash && "border-dashed"}`}
              style={{ borderColor: line.color }}
            />
            <p>{line.label}</p>
            <p className="font-semibold">{formatValue(dataPoint[line.key])}</p>
            {index != 0 ? null : (
              <div className="flex items-center space-x-1">
                <ArrowTrendingUpIcon className="h-4 w-4" />
                <p>9%</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
};
