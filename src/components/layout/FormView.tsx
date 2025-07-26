import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";
import TemperatureForm from "../TemperatureForm";
import PageHeader from "../ui/PageHeader";

interface FormViewProps {
  mode: "create" | "edit";
  editRecord?: TemperatureRecord | null;
  formLoading: boolean;
  onSubmit: (data: {
    personName: string;
    temperatureSeries: number[];
  }) => Promise<void>;
  onCancel: () => void;
}

const FormView: React.FC<FormViewProps> = ({
  mode,
  editRecord,
  formLoading,
  onSubmit,
  onCancel,
}) => {
  const isEdit = mode === "edit";
  const title = isEdit ? "Edit Record" : "Create New Record";
  const submitText = isEdit ? "Update Record" : "Create Record";

  return (
    <div className="mb-8">
      <PageHeader title={title} onCancel={onCancel} />
      <TemperatureForm
        onSubmit={onSubmit}
        isLoading={formLoading}
        initialData={
          isEdit
            ? {
                personName: editRecord!.personName,
                temperatureSeries: editRecord!.temperatureSeries,
              }
            : undefined
        }
        submitText={submitText}
      />
    </div>
  );
};

export default FormView;
