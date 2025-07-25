import {
  formatTemperature,
  formatDate,
  formatTemperatureSeries,
  formatRecordCount,
} from "../formatters";

describe("formatters", () => {
  describe("formatTemperature", () => {
    it("formats positive temperatures correctly", () => {
      expect(formatTemperature(37.2)).toBe("37.2°C");
      expect(formatTemperature(0)).toBe("0°C");
      expect(formatTemperature(100.5)).toBe("100.5°C");
    });

    it("formats negative temperatures correctly", () => {
      expect(formatTemperature(-5.3)).toBe("-5.3°C");
      expect(formatTemperature(-0.5)).toBe("-0.5°C");
    });

    it("handles zero correctly", () => {
      expect(formatTemperature(0)).toBe("0°C");
    });
  });

  describe("formatDate", () => {
    it("formats date strings correctly", () => {
      const testDate = "2024-01-15T10:30:00Z";
      const formatted = formatDate(testDate);

      // Should contain the date in a readable format
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe("string");
    });

    it("handles different date formats", () => {
      const date1 = "2024-12-25T15:45:00Z";
      const date2 = "2024-06-01T09:15:00Z";

      expect(formatDate(date1)).toBeTruthy();
      expect(formatDate(date2)).toBeTruthy();
    });
  });

  describe("formatTemperatureSeries", () => {
    it("formats temperature series correctly", () => {
      expect(formatTemperatureSeries([37.2, 36.8, 37.5])).toBe(
        "37.2, 36.8, 37.5"
      );
      expect(formatTemperatureSeries([-5.3, 0, 100.5])).toBe("-5.3, 0, 100.5");
    });

    it("handles empty array", () => {
      expect(formatTemperatureSeries([])).toBe("");
    });

    it("handles single temperature", () => {
      expect(formatTemperatureSeries([37.2])).toBe("37.2");
    });
  });

  describe("formatRecordCount", () => {
    it("formats single record correctly", () => {
      expect(formatRecordCount(1)).toBe("1 temperature");
    });

    it("formats multiple records correctly", () => {
      expect(formatRecordCount(5)).toBe("5 temperatures");
      expect(formatRecordCount(0)).toBe("0 temperatures");
    });
  });
});
