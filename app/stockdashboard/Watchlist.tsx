"use client";
import React, { useState } from "react";

import { CiCirclePlus } from "react-icons/ci";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DateRangePick from "./DateRangePick";
import DynamicSearchStocks from "./DynamicSearchStocks";
import { Toggle } from "@/components/ui/toggle";

function Watchlist( props: { setStock: (arg0: string) => void; } ) {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const addToWatchlist = (ticker: string) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, ticker]);
  };

  return (
    
      
      <Sheet>
        <Button asChild className="w-fit ml-auto mr-auto">
          <SheetTrigger>Watchlist</SheetTrigger>
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Watchlist</SheetTitle>
            <SheetDescription className="flex flex-col gap-y-10">
              Click on a wathlist ticker to update the chart!
 
              {/* onclick should open a shadcn dialog that allows you to search through existing stocks and upon hitting a button add to you watchlist*/}
              <Button asChild variant={"outline"} className="w-full">
                <DynamicSearchStocks onAddTicker={addToWatchlist}></DynamicSearchStocks>
              </Button>
              <ul>
                {watchlist.map((ticker, index) => (
                    <Toggle key={index} >
                        <li onClick={() => props.setStock(ticker)} key={index}>{ticker}</li>

                    </Toggle>
                  
                ))}
              </ul>

            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    
  );
}

export default Watchlist;
