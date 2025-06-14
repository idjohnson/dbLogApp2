import { MoreHorizontalIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Button } from "../../../../components/ui/button";
import { LogDetailsModal } from "./LogDetailsModal.tsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type LogEntry = {
  id: string;
  body: string;
  project: string;
  type: string;
  date: string;
  avatar_src: string;
  owner: string;
  description: string;
  created_at: string;
  status: string;
};

type SortField = 'id' | 'body' | 'project' | 'type' | 'date' | 'owner';
type SortDirection = 'asc' | 'desc';

interface ActiveLogsSectionProps {
  searchQuery: string;
}

export const ActiveLogsSection = ({ searchQuery }: ActiveLogsSectionProps): JSX.Element => {
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    const fetchLogs = () => {
      fetch(`${API_URL}/logs`)
        .then(res => res.json())
        .then(setLogEntries)
        .catch(() => setLogEntries([]));
    };

    fetchLogs(); // initial fetch

    const interval = setInterval(fetchLogs, 5000); // poll every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUpIcon className="w-4 h-4 ml-1" /> : 
      <ChevronDownIcon className="w-4 h-4 ml-1" />;
  };

  const handleViewDetails = (log: typeof logEntries[0]) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const filteredAndSortedEntries = useMemo(() => {
    // Filter entries based on search query
    let filtered = logEntries.filter(entry =>
      entry.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort entries
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'body':
          aValue = a.body.toLowerCase();
          bValue = b.body.toLowerCase();
          break;
        case 'project':
          aValue = a.project.toLowerCase();
          bValue = b.project.toLowerCase();
          break;
        case 'type':
          aValue = a.type.toLowerCase();
          bValue = b.type.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'owner':
          aValue = a.owner.toLowerCase();
          bValue = b.owner.toLowerCase();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [logEntries, searchQuery, sortField, sortDirection]);

  return (
    <div className="flex flex-col w-full items-start">
      <Table>
        <TableHeader>
          <TableRow className="h-14 border-b border-gray-200 dark:border-gray-700">
            <TableHead className="w-[70px]">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-[#828282] dark:text-gray-400 text-base hover:bg-transparent"
                onClick={() => handleSort('id')}
              >
                LogID
                {getSortIcon('id')}
              </Button>
            </TableHead>
            <TableHead className="w-[522px]">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-black dark:text-white text-base hover:bg-transparent"
                onClick={() => handleSort('body')}
              >
                Body
                {getSortIcon('body')}
              </Button>
            </TableHead>
            <TableHead className="w-[120px]">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-black dark:text-white text-base hover:bg-transparent"
                onClick={() => handleSort('project')}
              >
                Project
                {getSortIcon('project')}
              </Button>
            </TableHead>
            <TableHead className="w-16">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-black dark:text-white text-base hover:bg-transparent"
                onClick={() => handleSort('type')}
              >
                Type
                {getSortIcon('type')}
              </Button>
            </TableHead>
            <TableHead className="w-12 text-right">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-black dark:text-white text-base hover:bg-transparent"
                onClick={() => handleSort('date')}
              >
                Date
                {getSortIcon('date')}
              </Button>
            </TableHead>
            <TableHead className="w-[84px] text-center">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-black dark:text-white text-base hover:bg-transparent"
                onClick={() => handleSort('owner')}
              >
                Owner
                {getSortIcon('owner')}
              </Button>
            </TableHead>
            <TableHead className="w-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedEntries.map((entry, index) => (
            <TableRow key={index} className="h-14 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800">
              <TableCell className="font-medium text-[#828282] dark:text-gray-400 text-base">
                {entry.id}
              </TableCell>
              <TableCell className="font-medium text-black dark:text-white text-base">
                {entry.body}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-white dark:bg-gray-800 rounded-lg px-2 py-1.5 font-semibold text-black dark:text-white text-xs border-gray-200 dark:border-gray-600"
                >
                  {entry.project}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`rounded-lg px-2 py-1.5 font-semibold text-xs ${
                    entry.type === 'Alert' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' :
                    entry.type === 'Warn' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' :
                    entry.type === 'Info' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                    entry.type === 'High' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' :
                    entry.type === 'Low' ? 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-600' :
                    'bg-white dark:bg-gray-800 text-black dark:text-white border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {entry.type}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-normal text-[#828282] dark:text-gray-400 text-base">
                {entry.date}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Avatar className="w-7 h-7 bg-[#f7f7f7] dark:bg-gray-700">
                    <AvatarImage src={entry.avatarSrc} alt="User avatar" />
                    <AvatarFallback className="text-gray-600 dark:text-gray-300">
                      {entry.owner.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleViewDetails(entry)}
                >
                  <MoreHorizontalIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredAndSortedEntries.length === 0 && (
        <div className="flex items-center justify-center w-full py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No logs found matching your search.</p>
        </div>
      )}

      <LogDetailsModal
        log={selectedLog}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};