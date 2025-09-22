"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, GraduationCap, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Education {
  _id?: string;
  institution: string;
  degree_name: string;
  field_of_study?: string;
  start_date: string;
  end_date: string;
  grade?: string;
  description?: string;
}

interface EducationSectionProps {
  education: Education[];
  isOwner?: boolean;
  onAddEducation?: () => void;
  onEditEducation?: (education: Education) => void;
  onDeleteEducation?: (education: Education) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  isOwner = false,
  onAddEducation,
  onEditEducation,
  onDeleteEducation,
}) => {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = format(new Date(startDate), "yyyy");
    const end = format(new Date(endDate), "yyyy");
    return `${start} - ${end}`;
  };

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">

};