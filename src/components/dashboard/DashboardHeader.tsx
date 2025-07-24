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
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Temperature Records ({recordCount})
        </h2>
        <Button onClick={onCreate} variant="primary">
          <svg
            className="mr-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
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
