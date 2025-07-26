import React from "react";

interface PageHeaderProps {
  title: string;
  onCancel?: () => void;
  cancelText?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onCancel,
  cancelText = "Cancel",
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {onCancel && (
        <button
          onClick={onCancel}
          className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
        >
          {cancelText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
