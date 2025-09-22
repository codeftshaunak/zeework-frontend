"use client"

import Image from "next/image";
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface AuthLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  description,
  children,
  className
}) => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div
            className="flex items-center cursor-pointer group w-fit"
            onClick={() => router.push("/")}
          >
            <img
              src="/images/zeework_logo.png"
              alt="ZeeWork"
              className="h-6 w-auto transition-transform group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Content with top padding to account for fixed nav */}
      <div className="pt-20 pb-4 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ZeeWork</h1>
            <p className="text-gray-600">Professional Freelancing Platform</p>
          </div>

        {/* Auth Card */}
        <Card className={cn(
          "shadow-xl border-0 bg-white/95 backdrop-blur-sm",
          className
        )}>
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-gray-600">
                {description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
          </CardContent>
        </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            © 2024 ZeeWork. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout