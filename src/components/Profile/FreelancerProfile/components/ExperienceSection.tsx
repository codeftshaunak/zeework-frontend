"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Building2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Experience {
  _id?: string;
  company_name: string;
  position: string;
  job_location: string;
  job_description: string;
  start_date: string;
  end_date: string;
  is_current?: boolean;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  isOwner?: boolean;
  onAddExperience?: () => void;
  onEditExperience?: (experience: Experience) => void;
  onDeleteExperience?: (experience: Experience) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  isOwner = false,
  onAddExperience,
  onEditExperience,
  onDeleteExperience,
}) => {
  const formatDateRange = (startDate: string, endDate: string, isCurrent?: boolean) => {
    const start = format(new Date(startDate), "MMM yyyy");
    const end = isCurrent ? "Present" : format(new Date(endDate), "MMM yyyy");
    return `${start} - ${end}`;
  };

  const truncateDescription = (description: string, maxLength: number = 150) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">

};