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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
              />
              {isOwner && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0 shadow-md"
                  onClick={onEditProfile}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {profile.firstName} {profile.lastName.charAt(0)}.
                  </h1>
                  <h2 className="text-lg lg:text-xl text-gray-600 font-medium">
                    {profile.professional_role}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{localTime} local time</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-lg font-semibold px-4 py-2">
                    ${profile.hourly_rate}/hr
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {profile.description && (
          <div className="mt-6">
            <div
              className="text-gray-700 leading-relaxed prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: profile.description }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyProfileURL}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Profile
          </Button>

          {isOwner && (
            <Button
              onClick={onSettingsClick}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              <Settings className="h-4 w-4" />
              Profile Settings
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};