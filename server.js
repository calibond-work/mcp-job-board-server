import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();   // ← THIS must come before any app.get/app.use

app.use(cors());
app.use(express.json());

// Root route so Orchestrate can ping the server
app.get("/", (req, res) => {
  res.send("MCP Job Board Server is running");
});

// Serve your OpenAPI file
app.get("/openapi.yaml", (req, res) => {
  res.sendFile(path.join(__dirname, "openapi.yaml"));
});

// Your existing routes go here…

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MCP server running on port ${PORT}`);
});
