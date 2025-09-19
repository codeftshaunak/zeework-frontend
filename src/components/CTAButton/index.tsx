"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CTAButtonProps {
  size?: string;
  bg?: string;
  fontWeight?: string | number;
  color?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  width?: string;
  height?: string;
  margin?: string;
  textAlign?: string;
  hoverbg?: string;
  hoverborder?: string;
  hovercolor?: string;
  action?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  text?: string;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}

const CTAButton: React.FC<CTAButtonProps> = (props) => {
  const sizeClass = props.size === "sm" ? "px-3 py-1.5 text-sm" :
                   props.size === "md" ? "px-4 py-2 text-base" :
                   "px-6 py-3 text-lg"; // lg default

  const baseStyles = "inline-flex items-center justify-center rounded font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const customStyles = {
    backgroundColor: props.bg || "#F9FAFB", // brand.300 equivalent
    color: props.color || "#6B7280",
    padding: props.padding || undefined,
    borderRadius: props.borderRadius || undefined,
    border: props.border || `1px solid ${props.bg || "#F9FAFB"}`,
    width: props.width || undefined,
    height: props.height || undefined,
    margin: props.margin || undefined,
    textAlign: props.textAlign as any || undefined,
    fontWeight: props.fontWeight || undefined,
  };

  const hoverStyles = `
    hover:bg-[${props.hoverbg || "white"}]
    hover:border-[${props.hoverborder?.replace("1px solid ", "") || "#22C55E"}]
    hover:text-[${props.hovercolor || "#374151"}]
  `;

  return (
    <button
      className={cn(
        baseStyles,
        sizeClass,
        hoverStyles,
        props.className
      )}
      style={customStyles}
      onClick={props.action || props.onClick}
      disabled={props.disabled}
      type={props.type || "button"}
      {...(props.otherProps || {})}
    >
      {props.text || "Get Started"}
    </button>
  );
};

export default CTAButton;
