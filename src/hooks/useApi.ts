import { useState, useCallback } from "react";
import type { LoadingState } from "../types/common";

export const useApi = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading("loading");
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      setLoading("success");
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setLoading("error");
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading("idle");
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};
