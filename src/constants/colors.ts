export const TEMPERATURE_COLORS = {
  NORMAL: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  WARNING: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  DANGER: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
  },
} as const;

export const BUTTON_VARIANTS = {
  primary: {
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    focus: "focus:ring-blue-500",
    text: "text-white",
  },
  secondary: {
    bg: "bg-white",
    hover: "hover:bg-gray-50",
    focus: "focus:ring-blue-500",
    text: "text-gray-700",
    border: "border border-gray-300",
  },
  danger: {
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
    focus: "focus:ring-red-500",
    text: "text-white",
  },
  view: {
    bg: "bg-blue-100",
    hover: "hover:bg-blue-200",
    focus: "focus:ring-blue-500",
    text: "text-blue-700",
  },
} as const;
