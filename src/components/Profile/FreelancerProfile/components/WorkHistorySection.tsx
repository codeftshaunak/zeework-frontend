"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/Avatar";
import {
  Star,
  Calendar,
  DollarSign,
  Clock,
  User,
  Briefcase,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";

interface WorkHistoryItem {
  _id?: string;
  job_title: string;
  client_name: string;
  client_avatar?: string;
  amount_earned: number;
  start_date: string;
  end_date: string;
  duration_hours?: number;
  rating?: number;
  review?: string;
  skills_used?: string[];
  status: 'completed' | 'in_progress' | 'cancelled';
}

interface WorkHistorySectionProps {
  workHistory: WorkHistoryItem[];
  isLoading?: boolean;
}

export const WorkHistorySection: React.FC<WorkHistorySectionProps> = ({
  workHistory,
  isLoading = false,
}) => {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = format(new Date(startDate), "MMM dd, yyyy");
    const end = format(new Date(endDate), "MMM dd, yyyy");
    return `${start} - ${end}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Briefcase className="h-3 w-3" />;
      case 'in_progress':
        return <Clock className="h-3 w-3" />;
      default:
        return <Briefcase className="h-3 w-3" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Work History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Work History
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Briefcase className="h-3 w-3" />

};