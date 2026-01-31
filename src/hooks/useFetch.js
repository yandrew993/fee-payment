import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest"; 

const useFetch = (url, isSingleItem = false) => {
  const [data, setData] = useState(isSingleItem ? null : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip fetch if URL is null or empty or contains undefined
    if (!url || url.trim() === "" || url.includes("undefined")) {
      setLoading(false);
      setError(null);
      setData(isSingleItem ? null : []);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiRequest.get(url);
        // If isSingleItem is true, return the object directly
        if (isSingleItem) {
          setData(res.data);
        } else if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (res.data && typeof res.data === 'object') {
          // If it's a single object but not marked as single, wrap it in an array
          setData([res.data]);
        } else {
          setData(isSingleItem ? null : []);
        }
      } catch (err) {
        // Only log errors that are actual API errors, not validation errors
        const status = err.response?.status;
        if (status !== 404 && status !== 400) {
          console.error(`Failed to fetch ${url}:`, err.message);
        }
        setError(err.response?.data?.message || err.message || "An error occurred");
        setData(isSingleItem ? null : []);
      }
      setLoading(false);
    };
    fetchData();
  }, [url, isSingleItem]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await apiRequest.get(url);
      if (isSingleItem) {
        setData(res.data);
      } else if (res.data && typeof res.data === 'object') {
        setData([res.data]);
      } else {
        setData([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
      setData([]);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
