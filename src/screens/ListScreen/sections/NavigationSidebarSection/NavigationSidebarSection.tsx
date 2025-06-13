import {
  ActivityIcon,
  LayoutDashboardIcon,
  MonitorIcon,
  SettingsIcon,
} from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../contexts/AuthContext";

// Navigation items data for mapping
const navigationItems = [
  {
    icon: <ActivityIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
    label: "Active Logs",
    active: true,
    id: "logs"
  },
  {
    icon: <LayoutDashboardIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
    label: "Dashboard",
    active: false,
    id: "dashboard"
  },
  {
    icon: <MonitorIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
    label: "Monitors",
    active: false,
    id: "monitors"
  },
  {
    icon: <SettingsIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
    label: "Settings",
    active: false,
    id: "settings"
  },
];

interface NavigationSidebarSectionProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const NavigationSidebarSection = ({ activeSection, onSectionChange }: NavigationSidebarSectionProps): JSX.Element => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="h-full w-64 bg-white dark:bg-gray-900 border-r border-[#dfdfdf] dark:border-gray-700 flex flex-col">
      {/* App Logo/Title */}
      <div className="px-6 py-6">
        <h1 className="font-semibold text-2xl tracking-[-0.24px] leading-9 text-black dark:text-white">
          Log App
        </h1>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col px-2 gap-1 flex-1">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => onSectionChange(item.id)}
            className={`flex h-10 items-center justify-start gap-4 px-4 py-0 w-full rounded-lg ${
              activeSection === item.id ? "bg-[#f7f7f7] dark:bg-gray-800" : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {item.icon}
            <span className="font-small-text font-[number:var(--small-text-font-weight)] text-black dark:text-white text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)]">
              {item.label}
            </span>
          </Button>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="px-6 py-4 flex items-center gap-3 mb-2">
        <Avatar className="h-[42px] w-[42px]">
          <AvatarImage src="/image-1.png" alt="User profile" />
          <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm text-black dark:text-white">
            {user?.username || 'User'}
          </span>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="h-auto p-0 font-normal text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-transparent justify-start"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};