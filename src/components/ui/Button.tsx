import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "view";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
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
    sm: "px-3 py-1.5 text-xs rounded-full",
    md: "px-6 py-3 text-sm rounded-full",
    lg: "px-8 py-4 text-base rounded-full",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};

export default Button;
