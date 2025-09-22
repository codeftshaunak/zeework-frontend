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
  categories?: unknown[];
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

};