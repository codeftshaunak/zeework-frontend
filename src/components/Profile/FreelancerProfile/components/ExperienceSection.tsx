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
          Experience
        </CardTitle>
        {isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddExperience}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences && experiences.length > 0 ? (
          experiences.map((experience, index) => (
            <div
              key={experience._id || index}
              className="relative border-l-2 border-green-200 pl-6 pb-6 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white shadow-sm" />

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <h3 className="font-semibold text-gray-900">
                      {experience.company_name}
                    </h3>
                  </div>

                  <h4 className="font-medium text-gray-700 mb-2">
                    {experience.position}
                  </h4>

                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDateRange(
                        experience.start_date,
                        experience.end_date,
                        experience.is_current
                      )}
                    </Badge>
                    <span>{experience.job_location}</span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {truncateDescription(experience.job_description)}
                  </p>
                </div>

                {isOwner && (
                  <div className="flex items-center gap-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditExperience?.(experience)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteExperience?.(experience)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="mb-4">No work experience added yet</p>
            {isOwner && (
              <Button
                variant="outline"
                onClick={onAddExperience}
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                Add Experience
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};