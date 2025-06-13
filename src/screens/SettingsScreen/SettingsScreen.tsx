import React from 'react';
import { Button } from '../../components/ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { MoonIcon, SunIcon } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen = ({ onBack }: SettingsScreenProps): JSX.Element => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="w-full py-6 bg-transparent">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="h-10 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Back
          </Button>
          <h1 className="text-xl font-semibold tracking-[-0.20px] font-['Inter',Helvetica] text-black dark:text-white">
            Settings
          </h1>
        </div>
      </header>

      {/* Settings Content */}
      <div className="flex-1 px-6">
        <div className="max-w-2xl">
          {/* Theme Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Appearance
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme
                </label>
                <div className="flex gap-3">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setTheme('light')}
                    className="flex items-center gap-2 h-12 px-6"
                  >
                    <SunIcon className="w-4 h-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setTheme('dark')}
                    className="flex items-center gap-2 h-12 px-6"
                  >
                    <MoonIcon className="w-4 h-4" />
                    Dark
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your preferred theme. Your selection will be saved and applied across the application.
              </p>
            </div>
          </div>

          {/* Additional Settings Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              General
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage your notification preferences
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Data Export
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Export your log data
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};