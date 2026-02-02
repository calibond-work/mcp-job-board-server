import express from "express";
import fs from "fs";
import YAML from "yaml";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load OpenAPI YAML
const openapiFile = fs.readFileSync("./openapi.yaml", "utf8");

// Expose tool definition to Orchestrate
app.get("/.well-known/mcp/openapi.yaml", (req, res) => {
  res.setHeader("Content-Type", "application/yaml");
  res.send(openapiFile);
});

// Handle tool execution
app.post("/mcp/tools/post_job_listing", async (req, res) => {
  try {
    const payload = req.body;

    const response = await axios.post(
      "https://6980c3626570ee87d5104969.mockapi.io/v1/jobs", 
      payload
    );

    res.json({
      status: "success",
      jobId: response.data.id,
      data: response.data
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MCP server running on port ${PORT}`);
});

