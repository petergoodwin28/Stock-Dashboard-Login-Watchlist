"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiCirclePlus } from "react-icons/ci";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sampleTickers = ["AAPL", "MSFT", "GOOG", "AMZN", "TSLA", "META", "NFLX", "NVDA", "BABA", "O"];

interface SearchStocksProps {
  onAddTicker: (ticker: string) => void;
}

export default function DialogCloseButton({ onAddTicker }: SearchStocksProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickers, setFilteredTickers] = useState<string[]>([]);
  const [selectedTicker, setSelectedTicker] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTickers([]);
    } else {
      const results = sampleTickers.filter((ticker) =>
        ticker.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredTickers(results);
    }
  }, [searchTerm]);

  const handleAddTicker = () => {
    if (selectedTicker) {
      onAddTicker(selectedTicker);
      resetSearch();
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredTickers([]);
    setSelectedTicker("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CiCirclePlus size={100} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Stock</DialogTitle>
          <DialogDescription>Please search by stock ticker.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="stock" className="sr-only">
                Stock
              </Label>
              <Input
                id="stock"
                placeholder="Search stock ticker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="button" size="sm" onClick={handleAddTicker} className="px-3">
              Add
            </Button>
          </div>

          {/* Render filtered tickers */}
          <ul className="space-y-2">
            {filteredTickers.map((ticker) => (
              <li
                key={ticker}
                onClick={() => {
                  setSelectedTicker(ticker);
                  setSearchTerm(ticker);  // Set input value to the selected ticker
                  setFilteredTickers([]); // Hide the list after selecting
                }}
                className={`p-2 cursor-pointer hover:bg-gray-100 rounded ${
                  selectedTicker === ticker ? "bg-gray-200" : ""
                }`}
              >
                {ticker}
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={resetSearch}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
