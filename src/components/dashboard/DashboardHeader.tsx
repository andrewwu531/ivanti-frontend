import React from "react";
import Button from "../ui/Button";

interface DashboardHeaderProps {
  recordCount: number;
  onCreate: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  recordCount,
  onCreate,
}) => {
  return (
    <div className="px-8 py-5 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Temperature Dashboard
        </h2>
        <Button onClick={onCreate} variant="primary">
          <svg
            className="mt-0.5 mr-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create New Record
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
