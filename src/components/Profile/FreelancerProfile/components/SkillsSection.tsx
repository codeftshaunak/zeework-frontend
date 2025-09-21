"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

interface Skill {
  _id?: string;
  value: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  isOwner?: boolean;
  onEditSkills?: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isOwner = false,
  onEditSkills,
}) => {
  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Skills
        </CardTitle>
        {isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditSkills}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {skills && skills.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {skills.map((skill, index) => (
              <Badge
                key={skill._id || index}
                variant="secondary"
                className="px-3 py-1 text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
              >
                {skill.value}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">No skills added yet</p>
            {isOwner && (
              <Button
                variant="outline"
                onClick={onEditSkills}
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                Add Skills
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};