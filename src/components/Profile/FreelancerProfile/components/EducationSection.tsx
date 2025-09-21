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
          Education
        </CardTitle>
        {isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddEducation}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {education && education.length > 0 ? (
          education.map((edu, index) => (
            <div
              key={edu._id || index}
              className="relative border-l-2 border-blue-200 pl-6 pb-6 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-sm" />

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <h3 className="font-semibold text-gray-900">
                      {edu.institution}
                    </h3>
                  </div>

                  <h4 className="font-medium text-gray-700 mb-2">
                    {edu.degree_name}
                    {edu.field_of_study && ` in ${edu.field_of_study}`}
                  </h4>

                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDateRange(edu.start_date, edu.end_date)}
                    </Badge>
                    {edu.grade && (
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {edu.grade}
                      </Badge>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>

                {isOwner && (
                  <div className="flex items-center gap-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditEducation?.(edu)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteEducation?.(edu)}
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
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="mb-4">No education added yet</p>
            {isOwner && (
              <Button
                variant="outline"
                onClick={onAddEducation}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Add Education
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};