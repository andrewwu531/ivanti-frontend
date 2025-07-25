import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TemperatureForm from "../TemperatureForm";

describe("TemperatureForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders form fields correctly", () => {
    render(<TemperatureForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/person name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/temperature series/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add temperature record/i })
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    render(<TemperatureForm onSubmit={mockOnSubmit} />);

    // Fill in the form
    await user.type(screen.getByLabelText(/person name/i), "John Doe");
    await user.type(
      screen.getByLabelText(/temperature series/i),
      "37.2, 36.8, 37.5"
    );

    // Submit the form
    await user.click(
      screen.getByRole("button", { name: /add temperature record/i })
    );

    expect(mockOnSubmit).toHaveBeenCalledWith({
      personName: "John Doe",
      temperatureSeries: [37.2, 36.8, 37.5],
    });
  });

  it("shows error for empty person name", async () => {
    const user = userEvent.setup();
    render(<TemperatureForm onSubmit={mockOnSubmit} />);

    // Fill only temperature series
    await user.type(screen.getByLabelText(/temperature series/i), "37.2, 36.8");

    // Submit the form
    await user.click(
      screen.getByRole("button", { name: /add temperature record/i })
    );

    expect(screen.getByText(/person name is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error for empty temperature series", async () => {
    const user = userEvent.setup();
    render(<TemperatureForm onSubmit={mockOnSubmit} />);

    // Fill only person name
    await user.type(screen.getByLabelText(/person name/i), "John Doe");

    // Submit the form
    await user.click(
      screen.getByRole("button", { name: /add temperature record/i })
    );

    expect(
      screen.getByText(/temperature series is required/i)
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error for invalid temperature values", async () => {
    const user = userEvent.setup();
    render(<TemperatureForm onSubmit={mockOnSubmit} />);

    // Fill form with invalid data
    await user.type(screen.getByLabelText(/person name/i), "John Doe");
    await user.type(
      screen.getByLabelText(/temperature series/i),
      "37.2, abc, 37.5"
    );

    // Submit the form
    await user.click(
      screen.getByRole("button", { name: /add temperature record/i })
    );

    expect(screen.getByText(/invalid number: abc/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("renders with initial data when editing", () => {
    const initialData = {
      personName: "Jane Doe",
      temperatureSeries: [36.8, 37.2, 36.9],
    };

    render(
      <TemperatureForm
        onSubmit={mockOnSubmit}
        initialData={initialData}
        submitText="Update Record"
      />
    );

    expect(screen.getByDisplayValue("Jane Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("36.8, 37.2, 36.9")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update record/i })
    ).toBeInTheDocument();
  });

  it("handles loading state", () => {
    render(<TemperatureForm onSubmit={mockOnSubmit} isLoading={true} />);

    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
    expect(screen.getByLabelText(/person name/i)).toBeDisabled();
    expect(screen.getByLabelText(/temperature series/i)).toBeDisabled();
  });
});
