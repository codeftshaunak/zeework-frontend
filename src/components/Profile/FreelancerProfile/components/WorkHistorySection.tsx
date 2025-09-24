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
            Completed Jobs
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {workHistory && workHistory.length > 0 ? (
          <div className="space-y-6">
            {workHistory.map((item, index) => (
              <div
                key={item._id || index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={item.client_avatar}
                      name={item.client_name}
                      size="md"
                      className="bg-gray-100 text-gray-600"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.job_title}</h3>
                      <p className="text-sm text-gray-600">Client: {item.client_name}</p>
                    </div>
                  </div>

                  <Badge className={getStatusColor(item.status)} variant="secondary">
                    {getStatusIcon(item.status)}
                    <span className="ml-1 capitalize">{item.status}</span>
                  </Badge>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">${item.amount_earned.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateRange(item.start_date, item.end_date)}</span>
                  </div>

                  {item.duration_hours && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{item.duration_hours} hours</span>
                    </div>
                  )}
                </div>

                {/* Skills Used */}
                {item.skills_used && item.skills_used.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Skills Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills_used.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="px-3 py-1 text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors duration-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating and Review */}
                {item.rating && (
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">{renderStars(item.rating)}</div>
                      <span className="text-sm font-medium text-gray-700">
                        {item.rating}/5
                      </span>
                    </div>
                    {item.review && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-gray-500 mt-1" />
                          <p className="text-sm text-gray-700 italic">
                            {item.review}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No work history yet</h3>
            <p className="mb-4 max-w-sm mx-auto">
              Complete your first project to build your work history and showcase your expertise
            </p>
            <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
              Browse Available Jobs
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};