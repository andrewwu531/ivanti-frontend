import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  personName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  personName,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center">
      {/* Background overlay with reduced opacity */}
      <div
        className="absolute inset-0 bg-gray-100 bg-opacity-30"
        onClick={onCancel}
      ></div>

      {/* Popup */}
      <div className="relative px-10 py-10 mx-4 bg-white rounded-2xl shadow-lg w-100">
        <div className="text-center">
          {/* Warning icon */}
          <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            Delete Record
          </h3>

          {/* Message */}
          <p className="mb-7 text-sm text-gray-500">
            Are you sure you want to delete the temperature record for{" "}
            <span className="font-medium text-gray-900">{personName}</span>?
            <br />
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md border border-transparent hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
