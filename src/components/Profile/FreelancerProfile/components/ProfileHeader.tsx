"use client";

import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Share2, Settings, Edit } from "lucide-react";
import { toast } from "@/lib/toast";

interface ProfileHeaderProps {
  profile: {
    firstName: string;
    lastName: string;
    profile_image: string;
    professional_role: string;
    location: string;
    hourly_rate: number;
    description: string;
    user_id: string;
  };
  localTime: string;
  isOwner?: boolean;
  onEditProfile?: () => void;
  onSettingsClick?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  localTime,
  isOwner = false,
  onEditProfile,
  onSettingsClick,
}) => {
  const handleCopyProfileURL = () => {
    if (typeof window === "undefined" || !profile.user_id) return;

    const profileURL = `${window.location.origin}/profile/f/${profile.user_id}`;
    navigator.clipboard.writeText(profileURL);
    toast.success("Profile URL copied to clipboard");
  };

  
  };

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardContent className="p-8">
        {/* Main Profile Info */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar
                src={profile.profile_image}
                name={`${profile.firstName} ${profile.lastName}`}
                size="xl"
                className="border-4 border-white shadow-lg"

};