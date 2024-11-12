"use client"

import React from "react";



import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ComboboxDemo from "./ComboBox";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

function LoggedIn() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <div className="">
        <div className="flex flex-row justify-around">
          <div id="aspect" className="w-10">
            <AspectRatio ratio={16 / 9}>
              <Image
                src="/favicon.ico"
                width={100}
                height={100}
                alt="Image"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            ShadCN Website
          </h1>
          <Button>Home</Button>
        </div>
      </div>

      <Button variant="outline">Button</Button>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />

      <ComboboxDemo />

      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>

      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default LoggedIn;
