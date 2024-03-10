import React, { useMemo } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";

const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(30, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];

export const Dashboard: React.FC = () => {
  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
          date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value1: item?.value,
        value2: Number(item?.value) < 1000 ? Number(item?.value)+100 : Number(item?.value)-100,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

  const lines = [
    {
      label: "Value 1",
      key: "value1",
      color: "rgb(54, 162, 235)",
      dash: false
    },
    {
      label: "Value 2",
      key: "value2",
      color: "rgba(54, 162, 235, 0.2)",
      dash: true
    },
  ]

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Online Store Sessions",
      desc: "Your online stores traffic volume, shown in sessions.",
      content: (
        <ResponsiveLineChart
          lines={lines}
          data={memoizedRevenueData}
          formatValue={(value: number | string) => value}
        />
      ),
      total: dailyRevenue?.data?.total,
      trend: dailyRevenue?.data?.trend,
      formatValue: (value: number | string) => value,
    },
    {
      id: 2,
      label: "Net Return Value",
      desc: "Your online store net return value, shown in sessions.",
      content: (
        <ResponsiveLineChart
          lines={lines}
          data={memoizedOrdersData}
          formatValue={(value: number | string) =>
            Number(value) > 0 ? `$ ${value}` : `- $ ${value}`
          }
        />
      ),
      total: dailyOrders?.data?.total,
      trend: dailyOrders?.data?.trend,
      formatValue: (value: number | string) => 
        Number(value) > 0 ? `$ ${value}` : `- $ ${value}`,
    },
    {
      id: 3,
      label: "Total Orders",
      desc: "Your online stores total orders, shown in sessions.",
      content: (
        <ResponsiveLineChart
          lines={lines}
          data={memoizedNewCustomersData}
          formatValue={(value: number | string) => value}
        />
      ),
      total: newCustomers?.data?.total,
      trend: newCustomers?.data?.trend,
      formatValue: (value: number | string) => value,
    },
    {
      id: 4,
      label: "Conversion Rate",
      desc: "Your online stores conversion rate, shown in sessions.",
      content: (
        <ResponsiveLineChart
          lines={lines}
          data={memoizedRevenueData}
          formatValue={(value: number | string) => `${value}%`}
        />
      ),
      total: dailyRevenue?.data?.total,
      trend: dailyRevenue?.data?.trend,
      formatValue: (value: number | string) => `${value}%`,
    },
    {
      id: 5,
      label: "Average Order Value",
      desc: "Your online stores average order value, shown in sessions.",
      content: (
        <ResponsiveLineChart
          lines={lines}
          data={memoizedOrdersData}
          formatValue={(value: number | string) => `$ ${value}`}
        />
      ),
      total: dailyOrders?.data?.total,
      trend: dailyOrders?.data?.trend,
      formatValue: (value: number | string) => `$ ${value}`,
    },
    {
      id: 6,
      label: "Gross Sales",
      desc: "Your online stores gross sales, shown in sessions.",
      content: (
        <ResponsiveLineChart
          lines={lines}
          data={memoizedNewCustomersData}
          formatValue={(value: number | string) =>
            Number(value) > 0 ? `$ ${value}` : `- $ ${value}`
          }
        />
      ),
      total: newCustomers?.data?.total,
      trend: newCustomers?.data?.trend,
      formatValue: (value: number | string) => 
        Number(value) > 0 ? `$ ${value}` : `- $ ${value}`,
    },
    {
      id: 7,
      label: "Store Search Conversion",
      desc: "Your online stores search conversion, shown in sessions.",
      content: (
        <ResponsiveLineChart
          lines={lines}
          data={memoizedRevenueData}
          formatValue={(value: number | string) => value}
        />
      ),
      total: dailyRevenue?.data?.total,
      trend: dailyRevenue?.data?.trend,
      formatValue: (value: number | string) => value,
    },
    {
      id: 8,
      label: "Return Rate",
      desc: "Your online stores return rate, shown in sessions.",
      content: (
        <ResponsiveLineChart
          lines={lines}
          data={memoizedOrdersData}
          formatValue={(value: number | string) => `${value}%`}
        />
      ),
      total: dailyOrders?.data?.total,
      trend: dailyOrders?.data?.trend,
      formatValue: (value: number | string) => `${value}%`,
    },
  ];

  return (
    <>
      <TabView tabs={tabs} />
      <RecentSales />
    </>
  );
};
