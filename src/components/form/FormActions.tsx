import React from "react";
import Button from "../ui/Button";

interface FormActionsProps {
  onSave: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onSave,
  onCancel,
  isSubmitting = false,
  isValid = true,
}) => {
  return (
    <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
      <Button onClick={onCancel} variant="secondary" disabled={isSubmitting}>
        Cancel
      </Button>
      <Button
        onClick={onSave}
        variant="primary"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default FormActions;
