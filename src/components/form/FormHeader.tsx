import React from "react";

interface FormHeaderProps {
  title: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
    </div>
  );
};

export default FormHeader;
