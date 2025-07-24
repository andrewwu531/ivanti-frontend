import React from "react";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";

interface DashboardEmptyProps {
  onCreate: () => void;
}

const DashboardEmpty: React.FC<DashboardEmptyProps> = ({ onCreate }) => {
  const icon = (
    <svg
      className="w-12 h-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const action = (
    <Button onClick={onCreate} variant="primary">
      Create First Record
    </Button>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
      <div className="p-6">
        <EmptyState
          title="No temperature records"
          description="Get started by adding a new temperature record."
          icon={icon}
          action={action}
        />
      </div>
    </div>
  );
};

export default DashboardEmpty;
