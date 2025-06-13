import React from "react";
import { X } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";

interface LogDetailsModalProps {
  log: {
    id: string;
    body: string;
    project: string;
    type: string;
    date: string;
    avatarSrc: string;
    owner: string;
    description: string;
    createdAt: string;
    status: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LogDetailsModal = ({ log, isOpen, onClose }: LogDetailsModalProps): JSX.Element | null => {
  if (!isOpen || !log) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Log Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Log ID</label>
              <p className="text-base font-medium text-gray-900 dark:text-white mt-1">{log.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className={`rounded-lg px-2 py-1.5 font-semibold text-xs ${
                    log.status === 'Critical' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' :
                    log.status === 'High Priority' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' :
                    log.status === 'In Progress' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                    log.status === 'Active' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' :
                    log.status === 'Pending' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' :
                    'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {log.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Title/Body */}
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</label>
            <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{log.body}</p>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
            <p className="text-base text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{log.description}</p>
          </div>

          {/* Project and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Project</label>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className="bg-white dark:bg-gray-800 rounded-lg px-2 py-1.5 font-semibold text-black dark:text-white text-xs border-gray-200 dark:border-gray-600"
                >
                  {log.project}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</label>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className={`rounded-lg px-2 py-1.5 font-semibold text-xs ${
                    log.type === 'Alert' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' :
                    log.type === 'Warn' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' :
                    log.type === 'Info' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                    log.type === 'High' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' :
                    log.type === 'Low' ? 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-600' :
                    'bg-white dark:bg-gray-800 text-black dark:text-white border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {log.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Owner */}
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Owner</label>
            <div className="flex items-center gap-3 mt-2">
              <Avatar className="w-10 h-10 bg-[#f7f7f7] dark:bg-gray-700">
                <AvatarImage src={log.avatarSrc} alt="User avatar" />
                <AvatarFallback className="text-gray-600 dark:text-gray-300">
                  {log.owner.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-base font-medium text-gray-900 dark:text-white">{log.owner}</span>
            </div>
          </div>

          {/* Timestamps */}
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</label>
            <p className="text-base text-gray-700 dark:text-gray-300 mt-1">{formatDate(log.createdAt)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Edit Log
          </Button>
        </div>
      </div>
    </div>
  );
};