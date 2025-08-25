import { Pool } from "pg";

// Initialize database connection pools for both connection strings
const pools = {
  supabase: new Pool({
    connectionString: process.env.SUPABASE_CONNECTION_STRING,
  }),
  database1: new Pool({
    connectionString: process.env.DATABASE_URL_1,
  }),
};

/**
 * Executes a database query with proper connection management
 * @param {string} connectionName - The name of the connection to use ('supabase' or 'database1')
 * @param {string} query - The SQL query to execute
 * @param {Array} params - Optional query parameters
 * @returns {Promise<Object>} Query result
 */
async function executeQuery(connectionName, query, params = []) {
  const pool = pools[connectionName];
  if (!pool) {
    throw new Error(`Invalid connection name: ${connectionName}`);
  }
  
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
}

/**
 * Tests a database connection and returns the result
 * @param {string} connectionName - The name of the connection to test
 * @returns {Promise<Object>} Connection test result
 */
async function testConnection(connectionName) {
  try {
    const result = await executeQuery(connectionName, "SELECT NOW()");
    return {
      success: true,
      serverTime: result.rows[0].now,
      connectionName,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      connectionName,
    };
  }
}

/**
 * Handles the API request to test the database connections.
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
    console.log("Testing database connections...");
    console.log("SUPABASE_CONNECTION_STRING:", process.env.SUPABASE_CONNECTION_STRING);
    console.log("DATABASE_URL_1:", process.env.DATABASE_URL_1);
    
    // Test both database connections
    const [supabaseResult, database1Result] = await Promise.all([
      testConnection('supabase'),
      testConnection('database1'),
    ]);
    
    // Determine overall success
    const allSuccessful = supabaseResult.success && database1Result.success;
    
    // Send response with results for both connections
    res.status(allSuccessful ? 200 : 207).json({
      message: allSuccessful
        ? "All database connections successful!"
        : "Some database connections failed",
      connections: {
        supabase: supabaseResult,
        database1: database1Result,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // If an error occurs, send a detailed error response.
    console.error("Database connection test failed:", error.stack);
    res.status(500).json({
      message: "Failed to test database connections.",
      error: error.message,
    });
  }
}