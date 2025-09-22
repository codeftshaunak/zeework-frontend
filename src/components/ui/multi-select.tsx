"use client"

import * as React from "react"
import { X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface MultiSelectOption {
  label: string
  value: string
  _id?: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: MultiSelectOption[]
  onChange: (selected: MultiSelectOption[]) => void
  placeholder?: string
  maxSelections?: number
  className?: string
  error?: string
  disabled?: boolean
  searchable?: boolean
  emptyMessage?: string
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({
    options,
    selected,
    onChange,
    placeholder = "Select options...",
    maxSelections,
    className,
    error,
    disabled = false,
    searchable = false,
    emptyMessage = "No options available",
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")

    React.useEffect(() => {
      console.log("🔄 MultiSelect component received props:");
      console.log("- maxSelections:", maxSelections);
      console.log("- disabled:", disabled);
      console.log("- selected.length:", selected.length);
      console.log("- options.length:", options.length);
    }, [maxSelections, disabled, selected.length, options.length])

    const handleSelect = (option: MultiSelectOption) => {
      console.log("=== handleSelect called ===");
      console.log("Option:", option.label);
      console.log("Disabled:", disabled);
      console.log("MaxSelections prop:", maxSelections);
      console.log("Current selected count:", selected.length);
      console.log("Selected items:", selected.map(s => s.label));

      if (disabled) {
        console.log("MultiSelect is disabled, cannot select");
        return;
      }

      const isSelected = selected.some(item =>
        item._id ? item._id === option._id : item.value === option.value
      )

      console.log(`Selecting skill: ${option.label}, Currently selected: ${selected.length}, isSelected: ${isSelected}, maxSelections: ${maxSelections}`);

      if (isSelected) {
        const newSelected = selected.filter(item =>
          item._id ? item._id !== option._id : item.value !== option.value
        )
        console.log("Removing skill, new count:", newSelected.length);
        onChange(newSelected)
      } else {
        console.log("Checking maxSelections:", maxSelections, "Current count:", selected.length);

          return
        }
        const newSelected = [...selected, option]
        console.log("✅ Adding skill, new count:", newSelected.length);
        onChange(newSelected)
      }
      console.log("=== handleSelect end ===");
    }

    const handleRemove = (option: MultiSelectOption, event: React.MouseEvent) => {
      event.stopPropagation()
      if (disabled) return
      onChange(selected.filter(item =>
        item._id ? item._id !== option._id : item.value !== option.value
      ))
    }

    const availableOptions = options.filter(
      option => {
        const isNotSelected = !selected.some(selectedItem =>
          selectedItem._id ? selectedItem._id === option._id : selectedItem.value === option.value
        )
        const matchesSearch = searchable
          ? option.label.toLowerCase().includes(searchTerm.toLowerCase())
          : true
        return isNotSelected && matchesSearch
      }
    )

    return (
      <div className={cn("relative w-full", className)} ref={ref} {...props}>
        <div
          className={cn(
            "flex min-h-12 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer",
            error && "border-red-500 focus:ring-red-500",
            disabled && "cursor-not-allowed opacity-50",
            "focus:ring-green-500 focus:border-green-500"
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selected.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200"
              >
                {option.label}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-600"
                  onClick={(e) => handleRemove(option, e)}
                />
              </Badge>
            ))
          )}

          <div className="ml-auto">
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </div>
        </div>

        {maxSelections && (
          <p className="mt-1 text-xs text-gray-500">
            {selected.length}/{maxSelections} selected
          </p>
        )}

        {isOpen && !disabled && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-72 rounded-md border bg-white shadow-lg">
              {searchable && (
                <div className="p-2 border-b space-y-2">
                  <input
                    type="text"
                    placeholder="Search skills..."
                    className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {availableOptions.length > 0 && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="text-xs text-green-600 hover:text-green-700 font-medium"
                        onClick={(e) => {
                          e.stopPropagation()
                          const newSelections = [...selected, ...availableOptions]
                          onChange(newSelections)
                        }}
                      >
                        Select All
                      </button>
                      {selected.length > 0 && (
                        <button
                          type="button"
                          className="text-xs text-red-600 hover:text-red-700 font-medium"
                          onClick={(e) => {
                            e.stopPropagation()
                            onChange([])
                          }}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div className="max-h-48 overflow-auto">
                {availableOptions.length === 0 ? (
                  <div className="p-3 text-center text-sm text-gray-500">
                    {maxSelections && selected.length >= maxSelections
                      ? `Maximum ${maxSelections} selections reached`
                      : searchable && searchTerm
                      ? `No skills found for "${searchTerm}"`
                      : emptyMessage
                    }
                  </div>
                ) : (
                  availableOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        handleSelect(option)
                        if (searchable) setSearchTerm("")
                        // Keep dropdown open for multiple selections
                      }}
                    >
                      {option.label}
                    </button>
                  ))
                )}
              </div>
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

MultiSelect.displayName = "MultiSelect"

export { MultiSelect }