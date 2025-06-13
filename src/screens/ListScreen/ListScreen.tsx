import React, { useState } from "react";
import { ActiveLogsSection } from "./sections/ActiveLogsSection/ActiveLogsSection";
import { HeaderSection } from "./sections/HeaderSection";
import { NavigationSidebarSection } from "./sections/NavigationSidebarSection";
import { SettingsScreen } from "../SettingsScreen";

export const ListScreen = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("logs");

  const renderMainContent = () => {
    switch (activeSection) {
      case "settings":
        return <SettingsScreen onBack={() => setActiveSection("logs")} />;
      case "logs":
      default:
        return (
          <>
            <HeaderSection 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <ActiveLogsSection searchQuery={searchQuery} />
          </>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white dark:bg-gray-900 w-full max-w-[1440px] relative flex flex-row">
        <div className="flex-shrink-0">
          <NavigationSidebarSection 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
        <div className="flex-grow flex flex-col">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};