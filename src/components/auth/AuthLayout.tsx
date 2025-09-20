"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ZeeWork</h1>
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
  )
}

export default AuthLayout