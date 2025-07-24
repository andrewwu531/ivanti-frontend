import { useState, useEffect } from "react";
import type { TemperatureRecord } from "../types/api";
import { temperatureApi } from "../utils/temperatureApi";

export const useTemperatureData = () => {
  const [records, setRecords] = useState<TemperatureRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await temperatureApi.getTemperatureRecords();
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async (
    personName: string,
    temperatureSeries: number[]
  ) => {
    try {
      const newRecord = await temperatureApi.createTemperatureRecord({
        personName,
        temperatureSeries,
      });
      setRecords((prev) => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create record");
    }
  };

  const updateRecord = async (
    id: number,
    updates: { personName?: string; temperatureSeries?: number[] }
  ) => {
    try {
      const updatedRecord = await temperatureApi.updateTemperatureRecord(
        id,
        updates
      );
      setRecords((prev) =>
        prev.map((record) => (record.id === id ? updatedRecord : record))
      );
      return updatedRecord;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update record");
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      await temperatureApi.deleteTemperatureRecord(id);
      setRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete record");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return {
    records,
    loading,
    error,
    fetchRecords,
    createRecord,
    updateRecord,
    deleteRecord,
  };
};
