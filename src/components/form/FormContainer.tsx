import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
      {children}
    </div>
  );
};

export default FormContainer;
