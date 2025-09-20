"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react'

interface AuthFormFieldProps {
  type: 'email' | 'password' | 'text'
  placeholder: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  showPassword?: boolean
  onTogglePassword?: () => void
  error?: string
  className?: string
  ref?: React.Ref<HTMLInputElement>
  [key: string]: any // for react-hook-form register props
}

const AuthFormField = React.forwardRef<HTMLInputElement, AuthFormFieldProps>(
  ({
    type,
    placeholder,
    value,
    onChange,
    onKeyDown,
    showPassword,
    onTogglePassword,
    error,
    className,
    ...props
  }, ref) => {
    const getIcon = () => {
      switch (type) {
        case 'email':
          return <Mail className="h-5 w-5 text-gray-400" />
        case 'password':
          return <Lock className="h-5 w-5 text-gray-400" />
        default:
          return <User className="h-5 w-5 text-gray-400" />
      }
    }

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

    return (
      <div className={cn("space-y-2", className)}>
        <div className="relative">
          {/* Icon */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {getIcon()}
          </div>

          {/* Input */}
          <Input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={cn(
              "pl-10 h-12 text-base transition-all duration-200",
              type === 'password' && "pr-12",
              error && "border-red-500 focus-visible:ring-red-500",
              "focus-visible:ring-green-500 focus-visible:border-green-500"
            )}
            {...props}
          />

          {/* Password Toggle */}
          {type === 'password' && (
            <button
              type="button"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
              onClick={onTogglePassword}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    )
  }
)

AuthFormField.displayName = "AuthFormField"

export default AuthFormField