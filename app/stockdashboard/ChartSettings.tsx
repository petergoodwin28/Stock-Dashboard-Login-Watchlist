import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateRangePick from "./DateRangePick";
import { DateRange } from "react-day-picker";
import DynamicSearchStocks from "./DynamicSearchStocks";
import { root } from "postcss";

interface ChartSettingsProps {
  setDate: (dateRange: DateRange) => void;
  setStock: (arg0: string) => void;
  updateRange : (arg0: string) => void;
}


function ChartSettings({ setDate, setStock, updateRange }: ChartSettingsProps) {
  const [range, setRange] = useState("day")


  function onSetRange(range : string){
    updateRange(range)
  }

  function onAddTicker (ticker : string){
    setStock(ticker)
  }
  return (
    <Drawer>
      <DrawerTrigger className="mr-auto ml-auto">
        {" "}
        <Button>Chart Settings</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Chart</DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-row justify-around">
              <div>
                <h1>Ticker</h1>
                <DynamicSearchStocks onAddTicker={onAddTicker}></DynamicSearchStocks>
              </div>
              <div>
                <h1>Range</h1>
                <DateRangePick
                  className="mt-3"
                  setDate={setDate}
                ></DateRangePick>
              </div>
              <div>
                <h1>Range</h1>
                <Select onValueChange={onSetRange} >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Range" defaultValue={range} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ranges</SelectLabel>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ChartSettings;
