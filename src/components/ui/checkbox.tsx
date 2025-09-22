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

  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
