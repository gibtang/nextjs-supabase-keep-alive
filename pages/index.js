import { useState, useEffect } from "react";

export default function HomePage() {
  const [dbStatus, setDbStatus] = useState("Checking database connection...");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API route when the component mounts.
    const checkDbConnection = async () => {
      try {
        const response = await fetch("/api/test-db-connection");
        const data = await response.json();

        // If the request was successful, update the status.
        if (response.ok) {
          setDbStatus(`Connection successful! Server time: ${data.serverTime}`);
        } else {
          // If there was an error, set the error message.
          setError(data.message || "An unknown error occurred.");
          setDbStatus("Connection failed.");
        }
      } catch (e) {
        // Handle network or other fetch-related errors.
        setError(e.message);
        setDbStatus("Connection failed. Check the console for details.");
        console.error("Fetch error:", e);
      }
    };

    checkDbConnection();
  }, []); // The empty dependency array ensures this runs only once.

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Next.js Supabase Keep Alive Connector</h1>
      <p>{dbStatus}</p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
