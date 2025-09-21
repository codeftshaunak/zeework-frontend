"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, Eye, Folder } from "lucide-react";
import Image from "next/image";

interface Portfolio {
  _id?: string;
  title: string;
  description: string;
  images?: string[];
  technologies?: string[];
  live_url?: string;
  github_url?: string;
  category?: string;
}

interface PortfolioSectionProps {
  portfolio: Portfolio[];
  categories?: any[];
  isOwner?: boolean;
  onAddProject?: () => void;
  onViewProject?: (project: Portfolio) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolio,
  categories,
  isOwner = false,
  onAddProject,
  onViewProject,
}) => {
  const getImageSrc = (images?: string[]) => {
    if (!images || images.length === 0) return null;
    return images[0];
  };

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Portfolio Projects
        </CardTitle>
        {isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddProject}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {portfolio && portfolio.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {portfolio.map((project, index) => (
              <div
                key={project._id || index}
                className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gray-100">
                  {getImageSrc(project.images) ? (
                    <Image
                      src={getImageSrc(project.images)!}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                      <Folder className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

                  {/* Action Buttons Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="shadow-lg"
                        onClick={() => onViewProject?.(project)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {project.live_url && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="shadow-lg"
                          onClick={() => window.open(project.live_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs px-2 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Category */}
                  {project.category && (
                    <Badge className="bg-green-50 text-green-700 hover:bg-green-100">
                      {project.category}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Folder className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p className="mb-4 max-w-sm mx-auto">
              Showcase your work by adding portfolio projects to attract clients and demonstrate your skills
            </p>
            {isOwner && (
              <Button
                onClick={onAddProject}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};