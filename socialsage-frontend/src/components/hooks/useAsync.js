import { useState, useCallback } from 'react';

export function useAsync(asyncFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await asyncFunction(...args);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || 'Error');
      setLoading(false);
      throw err;
    }
  }, [asyncFunction]);

  return { execute, loading, error };
}
