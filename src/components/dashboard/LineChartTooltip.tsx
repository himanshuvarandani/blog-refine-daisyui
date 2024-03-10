import React from "react";
export const LineChartTooltip = ({
  active,
  payload,
  label,
  coordinate,
  lines, // lines as [{ label, key, color, dash? }]
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
        <p className="flex text-xs font-semibold">{label}</p>
        {lines.map((line: any) => (
          <div className="flex items-center text-xs my-1" key={line.key}>
            <hr
              className={`w-4 mr-2 ${line.dash && "border-dashed"}`}
              style={{ borderColor: line.color }}
            />
            {`${line.label}: ${dataPoint[line.key]}`}
          </div>
        ))}
      </div>
    );
  }

  return null;
};
