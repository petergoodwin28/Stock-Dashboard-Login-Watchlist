"use client";

import React, { useEffect, useState } from "react";
import StockChart from "./StockChart";
import Watchlist from "./Watchlist";
import { DateRange } from "react-day-picker";
import ChartSettings from "./ChartSettings";
import { useSession } from "next-auth/react";

function Page() {
  const [featureWatchlistEnabled, setFeatureWatchlistEnabled] = useState(true);
  const [currentStock, setCurrentStock] = useState("AAPL");
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();

  const [range, setRange] = useState("day");
  const [multiplier, setMultiplier] = useState(1);

  const { data: session } = useSession();

  // useEffect(() => {
  //   // Check if window and localStorage are available to avoid server-side errors
  //   if (typeof window !== "undefined") {
  //     const featureWatchlist = localStorage.getItem("featureWatchlist");
  //     setFeatureWatchlistEnabled(featureWatchlist === "true");
  //   }
  // }, []);

  const setStock = (ticker: string) => {
    setCurrentStock(ticker);
    // console.log("@Page: setStock()", ticker);
  };

  const setDate = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange);
    // console.log("@Page: setDate()", dateRange);
  };

  function updateRange(range: string) {
    setRange(range);
  }

  return (
    <div className="flex flex-col justify-around items-center h-[800px] mb-40">
      <StockChart
        ticker={currentStock}
        date={selectedDateRange}
        range={range}
      />
      <div className="flex flex-row gap-x-5 mt-10">
        {session && <Watchlist setStock={setStock} />}
        <ChartSettings
          setDate={setDate}
          setStock={setStock}
          updateRange={updateRange}
        />
      </div>
    </div>
  );
}

export default Page;
