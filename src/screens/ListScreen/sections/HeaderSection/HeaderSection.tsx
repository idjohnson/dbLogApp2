import {
  CalendarIcon,
  FilterIcon,
  LayoutGridIcon,
  ListIcon,
  SearchIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

interface HeaderSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: "list" | "grid" | "calendar";
  onViewModeChange: (mode: "list" | "grid" | "calendar") => void;
}

export const HeaderSection = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: HeaderSectionProps): JSX.Element => {
  return (
    <header className="w-full py-6 bg-transparent">
      <h1 className="mb-4 text-xl font-semibold tracking-[-0.20px] font-['Inter',Helvetica] text-black dark:text-white">
        Active Logs
      </h1>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-[405px]">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#828282] dark:text-gray-400" />
          <Input
            className="pl-11 py-2 h-10 text-base border-[#dfdfdf] dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          className="h-10 gap-3 pl-3 pr-4 py-2 text-[#828282] dark:text-gray-400 border-[#dfdfdf] dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <FilterIcon className="w-6 h-6" />
          <span className="font-presets-body2">Filter</span>
        </Button>

        <div className="ml-auto">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(val) => {
              if (val) onViewModeChange(val as "list" | "grid" | "calendar");
            }}
            className="p-1 bg-[#f7f7f7] dark:bg-gray-800 rounded-lg"
          >
            <ToggleGroupItem
              value="list"
              className="h-8 px-3 data-[state=on]:bg-white dark:data-[state=on]:bg-gray-700 data-[state=on]:shadow-button-shadow rounded text-gray-600 dark:text-gray-400 data-[state=on]:text-black dark:data-[state=on]:text-white"
            >
              <ListIcon className="w-6 h-6" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="grid"
              className="h-8 px-3 data-[state=on]:bg-white dark:data-[state=on]:bg-gray-700 data-[state=on]:shadow-button-shadow rounded text-gray-600 dark:text-gray-400 data-[state=on]:text-black dark:data-[state=on]:text-white"
            >
              <LayoutGridIcon className="w-6 h-6" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="calendar"
              className="h-8 px-3 data-[state=on]:bg-white dark:data-[state=on]:bg-gray-700 data-[state=on]:shadow-button-shadow rounded text-gray-600 dark:text-gray-400 data-[state=on]:text-black dark:data-[state=on]:text-white"
            >
              <CalendarIcon className="w-6 h-6" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </header>
  );
};