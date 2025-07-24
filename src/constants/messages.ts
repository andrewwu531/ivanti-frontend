export const SUCCESS_MESSAGES = {
  RECORD_CREATED: "Temperature record created successfully",
  RECORD_UPDATED: "Temperature record updated successfully",
  RECORD_DELETED: "Temperature record deleted successfully",
} as const;

export const ERROR_MESSAGES = {
  FETCH_FAILED: "Failed to fetch temperature records",
  CREATE_FAILED: "Failed to create temperature record",
  UPDATE_FAILED: "Failed to update temperature record",
  DELETE_FAILED: "Failed to delete temperature record",
  NETWORK_ERROR: "Network error. Please check your connection",
  VALIDATION_ERROR: "Please check your input and try again",
} as const;

export const UI_MESSAGES = {
  LOADING: "Loading...",
  NO_RECORDS: "No temperature records found",
  CREATE_FIRST: "Create your first temperature record",
  CONFIRM_DELETE: "Are you sure you want to delete this record?",
  BACK_TO_DASHBOARD: "Back to Dashboard",
  VIEW_RECORD: "View Record",
  EDIT_RECORD: "Edit Record",
  DELETE_RECORD: "Delete Record",
  CREATE_RECORD: "Create New Record",
  SAVE_CHANGES: "Save Changes",
  CANCEL: "Cancel",
} as const;

export const FORM_LABELS = {
  PERSON_NAME: "Person Name",
  TEMPERATURE_SERIES: "Temperature Series",
  CLOSEST_TO_ZERO: "Closest to Zero",
  RECORDED_AT: "Recorded At",
  CREATED_AT: "Created At",
  UPDATED_AT: "Last Updated",
} as const;

export const VALIDATION_MESSAGES = {
  PERSON_NAME_REQUIRED: "Person name is required",
  PERSON_NAME_TOO_SHORT: "Person name must be at least 2 characters",
  PERSON_NAME_TOO_LONG: "Person name must be less than 50 characters",
  TEMPERATURE_SERIES_REQUIRED: "Temperature series is required",
  TEMPERATURE_INVALID: "Invalid temperature value",
  TEMPERATURE_RANGE: "Temperature must be between -100 and 100°C",
} as const;
