import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  helpText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  rows = 4,
  helpText,
}) => {
  const baseClasses =
    "px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label} {required && "*"}
      </label>
      {type === "text" ? (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
          disabled={disabled}
        />
      ) : (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
          rows={rows}
          disabled={disabled}
        />
      )}
      {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

export default FormField;
