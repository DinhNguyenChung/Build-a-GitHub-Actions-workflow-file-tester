const request = require("supertest");
// Change this import - server.js doesn't export the app
const express = require("express");
const app = express();
require("../src/web/server"); // Just require the server file
const fs = require("fs");
const path = require("path");

describe("Integration Tests for GitHub Actions Tester", () => {
  let sampleWorkflow;

  beforeAll(() => {
    // Load the sample workflow YAML file
    sampleWorkflow = fs.readFileSync(
      path.join(__dirname, "fixtures", "sample-workflow.yml"),
      "utf8"
    );
  });

  it("should test a valid workflow file", async () => {
    const response = await request(app)
      .post("/api/test-workflow") // Assuming this is the endpoint for testing workflows
      .send({ workflow: sampleWorkflow });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("logs");
  });

  it("should return an error for an invalid workflow file", async () => {
    const invalidWorkflow = "invalid: yaml: content"; // Example of invalid YAML

    const response = await request(app)
      .post("/api/test-workflow")
      .send({ workflow: invalidWorkflow });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("message");
  });
});
