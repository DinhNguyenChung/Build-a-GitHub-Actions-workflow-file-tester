const express = require("express");
const fileUpload = require("express-fileupload");
const { parseYaml } = require("../parser/yaml-parser");
const { runActions } = require("../simulator/action-runner");
const { log } = require("../utils/logger");

function setRoutes(app) {
  // Add file upload middleware
  app.use(
    fileUpload({
      createParentPath: true,
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB max file size
      },
    })
  );

  // Home route
  app.get("/", (req, res) => {
    res.send(`
            <h1>GitHub Actions Workflow Tester</h1>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="workflow" accept=".yml,.yaml" required>
                <button type="submit">Test Workflow</button>
            </form>
        `);
  });

  // Upload and test workflow route
  app.post("/upload", (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }

      const workflowFile = req.files.workflow;
      const workflowContent = workflowFile.data.toString();

      // Parse the YAML content
      log("Parsing YAML workflow file...", "info");
      const workflow = parseYaml(workflowContent);

      // Run the workflow
      log("Starting workflow simulation...", "info");
      runActions(workflow)
        .then((results) => {
          res.json({
            success: true,
            workflow: workflow,
            results: results,
          });
        })
        .catch((err) => {
          log(`Workflow simulation failed: ${err.message}`, "error");
          res.status(500).json({
            success: false,
            error: err.message,
          });
        });
    } catch (err) {
      log(`Error processing request: ${err.message}`, "error");
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  });
}

module.exports = setRoutes;
