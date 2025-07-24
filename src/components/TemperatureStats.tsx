import React from "react";
import type { TemperatureStats as StatsType } from "../utils/temperatureApi";

interface TemperatureStatsProps {
  stats: StatsType;
}

const TemperatureStats: React.FC<TemperatureStatsProps> = ({ stats }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Temperature Statistics
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Records</p>
              <p className="text-2xl font-semibold text-blue-900">
                {stats.totalRecords}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">
                Unique People
              </p>
              <p className="text-2xl font-semibold text-purple-900">
                {stats.uniquePeopleCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureStats;
