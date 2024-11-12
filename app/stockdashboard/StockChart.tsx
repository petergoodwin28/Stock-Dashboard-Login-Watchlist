"use client";

import React, { useState, useEffect } from "react";
import { restClient } from "@polygon.io/client-js";
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DateRange } from "react-day-picker";

interface Result {
  t: number; // Timestamp
  o: number; // Open
  c: number; // Close
  h: number; // High
  l: number; // Low
}

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
};

const transformDataForChart = (results: Result[]) => {
  return results.map((result) => ({
    date: new Date(result.t).toLocaleDateString(), // Format the date
    close: result.c, // Closing price
  }));
};
// format date to request from api
function formatDate(date: Date | undefined): string | undefined {
  if (!date) return undefined;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DashBody(props: { ticker: string; date: DateRange | undefined; range: string }) {
  const [results, setResults] = useState<Result[]>([]);
  const [chartData, setChartData] = useState<{ date: string; close: number }[]>([]);
  
  // State for formatted date range
  const [fromDate, setFromDate] = useState<string | undefined>(formatDate(props.date?.from) || formatDate(new Date(2022, 0, 20))); // Default date if undefined
  const [toDate, setToDate] = useState<string | undefined>(formatDate(props.date?.to) || formatDate(new Date())); // Default to today if undefined

  // statful range
  const [range, setRange] = useState(props.range)
  const [multiplier, setMultiplier] = useState(1)

  // get stock info client
  const rest = restClient(process.env.NEXT_PUBLIC_POLY_API_KEY as string);

  // on render and ticker/date change
  useEffect(() => {
    const { ticker, date } = props;
    const newFromDate = formatDate(date?.from) || formatDate(new Date(2022, 0, 20)); // Default date if undefined
    const newToDate = formatDate(date?.to) || formatDate(new Date()); // Default to today if undefined
  
    setFromDate(newFromDate);
    setToDate(newToDate);

    setRange(props.range)

    // if the user updates chart settings rerequest the chart data accordingly
    if (newFromDate && newToDate) {
      rest.stocks
        .aggregates(ticker, multiplier, range, newFromDate, newToDate)
        .then((data) => {
          setResults(data.results as Result[]);
          console.log(results)
          // Transform the data for the chart
          const transformedData = transformDataForChart(data.results as Result[]);
          setChartData(transformedData);
        })
        .catch((e) => {
          console.error("An error occurred:", e);
        });
    }
  }, [props.ticker, props.date, props.range]); // Re-run effect if ticker or date range changes

  return (
    <div className="bg-white border text-center  m-36 ml-auto mr-auto">
      <h1 className="font-extrabold text-2xl border-b mb-10 m-10">Stock Closing Prices</h1>
      <h2 className="text-xl font-semibold mt-4">
         {props.ticker}
      </h2>

      <div className="h-fit w-[600px]">
        <ChartContainer config={chartConfig}>
          <BarChart width={1000} height={500} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="close" fill={chartConfig.desktop.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

export default DashBody;
