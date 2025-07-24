import React from "react";

interface TemperatureBadgeProps {
  temperature: number;
}

const TemperatureBadge: React.FC<TemperatureBadgeProps> = ({ temperature }) => {
  const getBadgeColor = (temp: number) => {
    if (temp >= 37.5) return "bg-red-100 text-red-800";
    if (temp >= 37) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <span
      className={`inline-flex px-3 py-2 text-xs font-semibold rounded-full ${getBadgeColor(temperature)}`}
    >
      {temperature}°C
    </span>
  );
};

export default TemperatureBadge;
