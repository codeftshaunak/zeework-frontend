"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Clock,
  Star,
  DollarSign,
  Award,
  Users,
  CheckCircle
} from "lucide-react";

interface FreelancerStats {
  totalEarnings?: number;
  completedJobs?: number;
  hoursWorked?: number;
  averageRating?: number;
  totalReviews?: number;
  successRate?: number;
  responseTime?: string;
}

interface StatsSectionProps {
  stats: FreelancerStats;
  isVerified?: boolean;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  isVerified = false,
}) => {
  const statItems = [
    {
      icon: DollarSign,
      label: "Total Earnings",
      value: stats.totalEarnings ? `$${stats.totalEarnings.toLocaleString()}` : "$0",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: CheckCircle,
      label: "Jobs Completed",
      value: stats.completedJobs?.toString() || "0",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      label: "Hours Worked",
      value: stats.hoursWorked?.toString() || "0",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Star,
      label: "Average Rating",
      value: stats.averageRating ? `${stats.averageRating.toFixed(1)} ⭐` : "No ratings",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Verification Badge */}
      {isVerified && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex-shrink-0">
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-900">Verified Freelancer</h3>
              <p className="text-sm text-green-700">
                This freelancer has been verified by ZeeWork
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Card */}
      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Freelance Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {statItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
                <span className="font-semibold text-gray-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            {stats.successRate && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <Badge
                  variant={stats.successRate >= 90 ? "default" : "secondary"}
                  className={stats.successRate >= 90 ? "bg-green-100 text-green-800" : ""}
                >
                  {stats.successRate}%
                </Badge>
              </div>
            )}

            {stats.responseTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <Badge variant="outline">
                  {stats.responseTime}
                </Badge>
              </div>
            )}

            {stats.totalReviews && stats.totalReviews > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Reviews</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.totalReviews}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon Card */}
      <Card className="border-gray-200/60 shadow-sm">
        <CardContent className="text-center py-8">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="font-semibold text-gray-700 mb-2">
            Enhanced Analytics Coming Soon
          </h3>
          <p className="text-sm text-gray-500">
            Get detailed insights into your freelancing performance
          </p>
        </CardContent>
      </Card>
    </div>
  );
};