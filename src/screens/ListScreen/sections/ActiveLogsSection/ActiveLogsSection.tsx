import { MoreHorizontalIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
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

// Define data structure for log entries
const logEntries = [
  {
    id: "001",
    body: "Task 1",
    project: "Project 1",
    type: "Alert",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "John Doe",
    description: "This is a detailed description of Task 1. It involves completing the initial setup and configuration.",
    createdAt: "2024-12-05T10:30:00Z",
    status: "Active"
  },
  {
    id: "002",
    body: "Task 2",
    project: "Acme GTM",
    type: "Info",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Jane Smith",
    description: "Task 2 focuses on implementing the core functionality for the GTM system.",
    createdAt: "2024-12-05T11:15:00Z",
    status: "In Progress"
  },
  {
    id: "003",
    body: "Write blog post for demo day",
    project: "Acme GTM",
    type: "Alert",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Mike Johnson",
    description: "Create compelling blog content to showcase our demo day achievements and key features.",
    createdAt: "2024-12-05T09:45:00Z",
    status: "Pending"
  },
  {
    id: "004",
    body: "Publish blog page",
    project: "Website launch",
    type: "Info",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Sarah Wilson",
    description: "Deploy the blog page to production and ensure all links are working correctly.",
    createdAt: "2024-12-05T14:20:00Z",
    status: "Active"
  },
  {
    id: "005",
    body: "Add gradients to design system",
    project: "Design backlog",
    type: "Warn",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Alex Chen",
    description: "Implement gradient components and documentation in our design system library.",
    createdAt: "2024-12-05T13:10:00Z",
    status: "Active"
  },
  {
    id: "006",
    body: "Responsive behavior doesn't work on Android",
    project: "Bug fixes",
    type: "Warn",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Tom Brown",
    description: "Investigation and fix for responsive layout issues specifically affecting Android devices.",
    createdAt: "2024-12-05T08:30:00Z",
    status: "Critical"
  },
  {
    id: "007",
    body: "Confirmation states not rendering properly",
    project: "Bug fixes",
    type: "Warn",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Lisa Davis",
    description: "Fix rendering issues with confirmation dialogs and state management.",
    createdAt: "2024-12-05T12:45:00Z",
    status: "In Progress"
  },
  {
    id: "008",
    body: "Text wrapping is awkward on older iPhones",
    project: "Bug fixes",
    type: "Info",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "David Lee",
    description: "Optimize text wrapping and typography for legacy iPhone models.",
    createdAt: "2024-12-05T15:00:00Z",
    status: "Active"
  },
  {
    id: "009",
    body: "Revise copy on About page",
    project: "Website launch",
    type: "Info",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Emma Taylor",
    description: "Update and improve the content on the About page to better reflect our mission.",
    createdAt: "2024-12-05T16:30:00Z",
    status: "Pending"
  },
  {
    id: "010",
    body: "Publish HackerNews post",
    project: "Acme GTM",
    type: "Info",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Ryan Garcia",
    description: "Create and publish a HackerNews post to increase visibility and engagement.",
    createdAt: "2024-12-05T17:15:00Z",
    status: "Active"
  },
  {
    id: "011",
    body: "Review image licensing for header section images",
    project: "Website Launch",
    type: "Alert",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Kelly Martinez",
    description: "Audit and ensure proper licensing for all images used in header sections.",
    createdAt: "2024-12-05T10:00:00Z",
    status: "Critical"
  },
  {
    id: "012",
    body: "Accessibility focused state for input fields",
    project: "Design backlog",
    type: "Alert",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Chris Anderson",
    description: "Implement proper focus states and accessibility features for all input components.",
    createdAt: "2024-12-05T11:45:00Z",
    status: "Active"
  },
  {
    id: "013",
    body: "Header IA revision to support addition of blog page",
    project: "Design backlog",
    type: "Warn",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Nicole White",
    description: "Restructure header information architecture to accommodate new blog section.",
    createdAt: "2024-12-05T13:30:00Z",
    status: "In Progress"
  },
  {
    id: "014",
    body: "Press outbound",
    project: "Acme GTM",
    type: "Warn",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Mark Thompson",
    description: "Coordinate outbound press activities and media outreach campaigns.",
    createdAt: "2024-12-05T14:45:00Z",
    status: "Active"
  },
  {
    id: "FIG-109",
    body: "GIFs flicker when looping back more than 3 times on the header images",
    project: "Bug fixes",
    type: "Low",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Steve Wilson",
    description: "Fix GIF animation flickering issue that occurs after multiple loop cycles.",
    createdAt: "2024-12-05T09:15:00Z",
    status: "Low Priority"
  },
  {
    id: "FIG-108",
    body: "Editorial format for blog posts on website",
    project: "Design backlog",
    type: "High",
    date: "Dec 5",
    avatarSrc: "/rectangle-1-15.png",
    owner: "Rachel Green",
    description: "Design and implement editorial formatting standards for blog post layouts.",
    createdAt: "2024-12-05T12:00:00Z",
    status: "High Priority"
  },
];

type SortField = 'id' | 'body' | 'project' | 'type' | 'date' | 'owner';
type SortDirection = 'asc' | 'desc';

interface ActiveLogsSectionProps {
  searchQuery: string;
}

export const ActiveLogsSection = ({ searchQuery }: ActiveLogsSectionProps): JSX.Element => {
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedLog, setSelectedLog] = useState<typeof logEntries[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  }, [searchQuery, sortField, sortDirection]);

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