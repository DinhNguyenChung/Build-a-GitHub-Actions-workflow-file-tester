const { execSync } = require("child_process");
const { log } = require("../utils/logger");

class ActionRunner {
  constructor() {
    this.logs = [];
  }

  runAction(action) {
    return new Promise((resolve, reject) => {
      const { name, run } = action;

      this.log(`Starting action: ${name}`);

      const child = require("child_process").exec(
        run,
        (error, stdout, stderr) => {
          if (error) {
            this.log(`Error executing action: ${name}`);
            this.log(stderr);
            return reject(error);
          }

          this.log(`Action completed: ${name}`);
          this.log(stdout);
          resolve(stdout);
        }
      );

      child.stdout.on("data", (data) => {
        this.log(data);
      });

      child.stderr.on("data", (data) => {
        this.log(data);
      });
    });
  }

  log(message) {
    this.logs.push(message);
    console.log(message);
  }

  getLogs() {
    return this.logs;
  }
}

async function runActions(workflow) {
  const results = [];

  try {
    // Extract jobs from workflow
    const jobs = workflow.jobs || {};

    // Process each job
    for (const [jobId, jobConfig] of Object.entries(jobs)) {
      log(`Processing job: ${jobId}`, "info");

      const steps = jobConfig.steps || [];

      // Process each step in the job
      for (const step of steps) {
        log(`Executing step: ${step.name || "unnamed step"}`, "info");

        try {
          if (step.uses) {
            // Simulate GitHub Action
            log(`Simulating action: ${step.uses}`, "info");
            results.push({
              step: step.name || step.uses,
              status: "simulated",
              action: step.uses,
            });
          } else if (step.run) {
            // In a real implementation, you would execute this safely
            // This is just a simulation for demonstration
            log(`Simulating command: ${step.run}`, "info");
            results.push({
              step: step.name || "Command step",
              status: "simulated",
              command: step.run,
            });
          }
        } catch (stepError) {
          log(`Error in step: ${stepError.message}`, "error");
          results.push({
            step: step.name || "unnamed step",
            status: "error",
            error: stepError.message,
          });
        }
      }
    }

    return results;
  } catch (error) {
    log(`Error running actions: ${error.message}`, "error");
    throw error;
  }
}

module.exports = { ActionRunner, runActions };
