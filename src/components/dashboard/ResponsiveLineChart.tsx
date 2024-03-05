import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IChartDatum } from "../../interfaces";
import { LineChartTooltip } from "./LineChartTooltip";

type TResponsiveLineChartProps = {
  lines: {
    label: string
    key: string
    color: string
    dash: boolean
  }[];
  data: IChartDatum[];
};

export const ResponsiveLineChart = ({
  lines,
  data,
}: TResponsiveLineChartProps) => {
  return (
    <ResponsiveContainer height={400}>
      <LineChart
        data={data}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          interval={2}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
          tickCount={6}
          interval="preserveStartEnd"
          domain={[0, "auto"]}
        />
        <Tooltip
          content={<LineChartTooltip lines={lines} />}
          wrapperStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1 solid #fff",
            borderRadius: "10px",
            boxShadow: "1px 1px grey",
          }}
        />
        {lines.map(line => (
          <Line
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={3}
            dot={false}
            strokeDasharray={line.dash ? "5 5" : "0 0"}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
