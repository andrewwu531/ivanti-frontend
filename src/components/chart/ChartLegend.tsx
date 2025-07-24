import React from "react";

interface ChartLegendProps {
  closestToZero: number;
  totalTemperatures: number;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  closestToZero,
  totalTemperatures,
}) => {
  return (
    <div className="p-4 mt-4 bg-gray-50 rounded-lg">
      <h4 className="mb-2 text-sm font-medium text-gray-900">
        Chart Information
      </h4>
      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Total temperatures:</span>
          <span className="font-medium">{totalTemperatures}</span>
        </div>
        <div className="flex justify-between">
          <span>Closest to zero:</span>
          <span className="font-medium text-blue-600">{closestToZero}°C</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          The closest-to-zero temperature is highlighted in the chart
        </div>
      </div>
    </div>
  );
};

export default ChartLegend;
