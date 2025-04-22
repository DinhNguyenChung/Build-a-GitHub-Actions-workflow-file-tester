const jsYaml = require("js-yaml");

function parseYaml(content) {
  try {
    // Parse content string instead of file path
    const data = jsYaml.load(content);
    return data;
  } catch (e) {
    console.error(`Error parsing YAML: ${e.message}`);
    throw e;
  }
}

module.exports = { parseYaml };
