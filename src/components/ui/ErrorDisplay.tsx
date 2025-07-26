import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
  variant?: "error" | "warning" | "info";
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  variant = "error",
}) => {
  if (!error) return null;

  const variantStyles = {
    error: {
      container: "bg-red-50 border-red-200",
      icon: "text-red-400",
      text: "text-red-700",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200",
      icon: "text-yellow-400",
      text: "text-yellow-700",
    },
    info: {
      container: "bg-blue-50 border-blue-200",
      icon: "text-blue-400",
      text: "text-blue-700",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`p-4 mb-6 rounded-md border ${styles.container}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className={`w-5 h-5 ${styles.icon}`} />
        </div>
        <div className="ml-3">
          <p className={`text-sm ${styles.text}`}>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
