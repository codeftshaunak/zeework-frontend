"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectOption {
  label: string
  value: string
  name?: string
}

interface SelectProps {
  options: SelectOption[]
  placeholder?: string
  value?: string
  onChange?: (option: SelectOption) => void
  className?: string
  error?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, placeholder = "Select an option", value, onChange, className, error, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedOption, setSelectedOption] = React.useState<SelectOption | null>(null)

    const handleSelect = (option: SelectOption) => {
      setSelectedOption(option)
      onChange?.(option)
      setIsOpen(false)
    }

    React.useEffect(() => {
      if (value) {
        const option = options.find(opt => opt.value === value || opt.name === value)
        if (option) {
          setSelectedOption(option)
        }
      }
    }, [value, options])

    return (
      <div className={cn("relative w-full", className)} ref={ref} {...props}>
        <button
          type="button"
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            "focus:ring-green-500 focus:border-green-500"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cn("text-left", !selectedOption && "text-muted-foreground")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "w-full px-3 py-2 text-left text-base hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
                    selectedOption?.value === option.value && "bg-green-50 text-green-700"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"

export { Select }