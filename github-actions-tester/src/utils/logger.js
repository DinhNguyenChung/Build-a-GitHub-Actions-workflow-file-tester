const chalk = require("chalk");

function log(message, level = "info") {
  const timestamp = new Date().toISOString();
  let formattedMessage;

  switch (level) {
    case "info":
      formattedMessage = `${chalk.blue(`[INFO] [${timestamp}]`)} ${message}`;
      break;
    case "warn":
      formattedMessage = `${chalk.yellow(`[WARN] [${timestamp}]`)} ${message}`;
      break;
    case "error":
      formattedMessage = `${chalk.red(`[ERROR] [${timestamp}]`)} ${message}`;
      break;
    default:
      formattedMessage = `${chalk.white(`[LOG] [${timestamp}]`)} ${message}`;
      break;
  }

  console.log(formattedMessage);
}

module.exports = { log }; // Export as object with log property
