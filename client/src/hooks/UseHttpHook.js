import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    
    ) => {
      setLoading(true);
      try {
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Щось пішло нетак");
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        toast.error(e.message);
      }
    },
    []
  );
  const clearError = () => setError(null);
  return { loading, request, error, clearError, data};
};
