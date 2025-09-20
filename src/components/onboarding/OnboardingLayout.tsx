"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OnboardingLayoutProps {
  currentStep: number
  totalSteps: number
  title: string
  description?: string
  children: React.ReactNode
  onNext?: () => void
  onBack?: () => void
  isLoading?: boolean
  nextText?: string
  backText?: string
  canGoNext?: boolean
  canGoBack?: boolean
  className?: string
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  title,
  description,
  children,
  onNext,
  onBack,
  isLoading = false,
  nextText = "Continue",
  backText = "Back",
  canGoNext = true,
  canGoBack = true,
  className
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Let's get you set up on ZeeWork</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <Card className={cn("shadow-xl border-0 bg-white/95 backdrop-blur-sm", className)}>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {title}
            </CardTitle>
            {description && (
              <p className="text-gray-600 mt-2">
                {description}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {children}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={!canGoBack || isLoading}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {backText}
              </Button>

              <Button
                type="submit"
                variant="gradient"
                onClick={onNext}
                disabled={!canGoNext || isLoading}
                className="flex items-center gap-2 min-w-[120px]"
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    {nextText}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Need help? Contact our support team
        </div>
      </div>
    </div>
  )
}

export default OnboardingLayout