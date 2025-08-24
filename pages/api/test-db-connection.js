import { Pool } from "pg";

// Initialize the database connection pool using the environment variable.
const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
});

/**
 * Handles the API request to test the database connection.
 * @param {import('next').NextApiRequest} req The incoming request object.
 * @param {import('next').NextApiResponse} res The server response object.
 */
export default async function handler(req, res) {
  // Check if the request method is GET.
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Use a try-catch block for robust error handling.
  try {
    console.log(process.env.SUPABASE_CONNECTION_STRING);
    // Acquire a client from the connection pool.
    const client = await pool.connect();

    // Execute a simple query to check the connection.
    const result = await client.query("SELECT NOW()");
    // Release the client back to the pool.
    client.release();
    console.log('result', result);
    // Send a success response.
    res.status(200).json({
      message: "Database connection successful!",
      serverTime: result.rows[0].now,
    });
  } catch (error) {
    // If an error occurs, send a detailed error response.
    console.error("Database connection failed:", error.stack);
    res.status(500).json({
      message: "Failed to connect to the database.",
      error: error.message,
    });
  }
}