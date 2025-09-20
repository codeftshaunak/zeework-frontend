"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: React.ReactNode;
  error?: string;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, onChange, checked, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(
      checked || false
    );

    // Use controlled value if provided, otherwise use internal state
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      if (checked === undefined) {
        setInternalChecked(newChecked);
      }

      if (onChange) {
        onChange(newChecked, event);
      }
    };

    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    return (
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              ref={ref}
              checked={isChecked}
              onChange={handleChange}
              {...props}
            />
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white transition-colors",
                "hover:border-green-400 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2",
                isChecked && "border-green-500 bg-green-500",
                error && "border-red-500",
                props.disabled && "opacity-50 cursor-not-allowed",
                className
              )}
            >
              {isChecked && <Check className="w-3 h-3 text-white" />}
            </div>
          </div>
          {label && (
            <span
              className={cn(
                "text-sm text-gray-700 leading-5",
                props.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="ml-8 text-sm font-medium text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
