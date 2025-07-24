import type { TemperatureRecord } from "./api";

export interface DashboardProps {
  records: TemperatureRecord[];
  onView: (record: TemperatureRecord) => void;
  onCreate: () => void;
}

export interface RecordDetailProps {
  record: TemperatureRecord;
  onEdit: (record: TemperatureRecord) => void;
  onDelete: (id: number) => void;
  onBack: () => void;
}

export interface TemperatureFormProps {
  onSubmit: (data: { personName: string; temperatureSeries: number[] }) => void;
  onCancel: () => void;
  initialData?: {
    personName: string;
    temperatureSeries: number[];
  };
  isEditing?: boolean;
}

export interface TemperatureChartProps {
  temperatures: number[];
  closestToZero: number;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "view";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}
