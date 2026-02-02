import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Root route so Orchestrate can ping the server
app.get("/", (req, res) => {
  res.send("MCP Job Board Server is running");
});

// Serve OpenAPI spec
app.get("/openapi.yaml", (req, res) => {
  res.sendFile(path.join(__dirname, "openapi.yaml"));
});

// Tool route: forward job posting to MockAPI
app.post("/jobs", async (req, res) => {
  try {
    const response = await axios.post(
      "https://6980c3626570ee87d5104969.mockapi.io/v1/jobs",
      req.body
    );

    res.json(response.data);
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ error: "Failed to post job" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MCP server running on port ${PORT}`);
});
