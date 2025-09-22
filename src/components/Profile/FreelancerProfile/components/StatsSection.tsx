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

};