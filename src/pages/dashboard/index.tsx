import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import { Loading } from "../../components/dashboard/Loading";

export const Dashboard: React.FC = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(
    new Date()
  );

  const filters: CrudFilter[] = [
    {
      field: "start",
      operator: "eq",
      value: startDate,
    },
    {
      field: "end",
      operator: "eq",
      value: endDate,
    },
  ];

  const { data: dailyRevenue, isLoading } = useList<IChartDatum>({
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
      data: memoizedRevenueData,
      lines: lines,
      total: dailyRevenue?.data?.total,
      trend: dailyRevenue?.data?.trend,
      formatValue: (value: number | string) => value,
    },
    {
      id: 2,
      label: "Net Return Value",
      desc: "Your online store net return value, shown in sessions.",
      data: memoizedOrdersData,
      lines: lines,
      total: dailyOrders?.data?.total,
      trend: dailyOrders?.data?.trend,
      formatValue: (value: number | string) => 
        Number(value) > 0 ? `$ ${value}` : `- $ ${value}`,
    },
    {
      id: 3,
      label: "Total Orders",
      desc: "Your online stores total orders, shown in sessions.",
      data: memoizedNewCustomersData,
      lines: lines,
      total: newCustomers?.data?.total,
      trend: newCustomers?.data?.trend,
      formatValue: (value: number | string) => value,
    },
    {
      id: 4,
      label: "Conversion Rate",
      desc: "Your online stores conversion rate, shown in sessions.",
      data: memoizedRevenueData,
      lines: lines,
      total: dailyRevenue?.data?.total,
      trend: dailyRevenue?.data?.trend,
      formatValue: (value: number | string) => `${value}%`,
    },
    {
      id: 5,
      label: "Average Order Value",
      desc: "Your online stores average order value, shown in sessions.",
      data: memoizedOrdersData,
      lines: lines,
      total: dailyOrders?.data?.total,
      trend: dailyOrders?.data?.trend,
      formatValue: (value: number | string) => `$ ${value}`,
    },
    {
      id: 6,
      label: "Gross Sales",
      desc: "Your online stores gross sales, shown in sessions.",
      data: memoizedNewCustomersData,
      lines: lines,
      total: newCustomers?.data?.total,
      trend: newCustomers?.data?.trend,
      formatValue: (value: number | string) => 
        Number(value) > 0 ? `$ ${value}` : `- $ ${value}`,
    },
    {
      id: 7,
      label: "Store Search Conversion",
      desc: "Your online stores search conversion, shown in sessions.",
      data: memoizedRevenueData,
      lines: lines,
      total: dailyRevenue?.data?.total,
      trend: dailyRevenue?.data?.trend,
      formatValue: (value: number | string) => value,
    },
    {
      id: 8,
      label: "Return Rate",
      desc: "Your online stores return rate, shown in sessions.",
      data: memoizedOrdersData,
      lines: lines,
      total: dailyOrders?.data?.total,
      trend: dailyOrders?.data?.trend,
      formatValue: (value: number | string) => `${value}%`,
    },
  ];

  return (
    <>
      <div className="bg-slate-50 border rounded-lg drop-shadow-md p-5 mb-5">
        <div className="tabs space-x-2">
          <div className="flex-1 space-y-2">
            <p className="font-semibold">Start Date</p>
            <input
              type="date"
              className="bg-gray-100 text-sm rounded-lg focus:ring-gray-200 focus:border-gray-200 block w-full md:w-1/2 py-2 px-4"
              value={startDate.toISOString().substring(0, 10)}
              onChange={e => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="font-semibold">End Date</p>
            <input
              type="date"
              className="bg-gray-100 text-sm rounded-lg focus:ring-gray-200 focus:border-gray-200 block w-full md:w-1/2 py-2 px-4"
              value={endDate.toISOString().substring(0, 10)}
              onChange={e => setEndDate(new Date(e.target.value))}
              max={new Date().toISOString().substring(0, 10)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <TabView tabs={tabs} />
      )}
      <RecentSales />
    </>
  );
};
