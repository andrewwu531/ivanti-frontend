import React from "react";
import Icon from "./Icon";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "view";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  icon?:
    | "back"
    | "edit"
    | "delete"
    | "view"
    | "plus"
    | "chart"
    | "user"
    | "close"
    | "check"
    | "warning"
    | "error";
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  icon,
  iconPosition = "left",
}) => {
  const baseClasses =
    "inline-flex items-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed",
    secondary:
      "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
    danger:
      "text-white bg-red-600 border border-transparent hover:bg-red-700 focus:ring-red-500",
    view: "text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 focus:ring-blue-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const borderRadiusClasses = {
    primary: "rounded-lg",
    secondary: "rounded-md",
    danger: "rounded-md",
    view: "rounded-3xl", // Make view button more rounded
  };

  const iconSize = size === "sm" ? "sm" : "md";
  const iconClasses = iconPosition === "left" ? "mr-2" : "ml-2";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${borderRadiusClasses[variant]} ${className}`;

  const iconElement = icon && (
    <Icon name={icon} size={iconSize} className={iconClasses} />
  );

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {icon && iconPosition === "left" && iconElement}
      {children}
      {icon && iconPosition === "right" && iconElement}
    </button>
  );
};

export default Button;
