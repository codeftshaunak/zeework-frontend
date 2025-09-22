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
  skills: Array<string | Skill>;
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

              const skillId = typeof skill === 'object' ? skill?._id : undefined;

              return (
                <Badge
                  key={skillId || skillValue || index}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                >
                  {skillValue}
                </Badge>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">No skills added yet</p>

};