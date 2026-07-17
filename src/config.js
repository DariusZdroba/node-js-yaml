'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

// Reads a YAML file from disk and returns the parsed object.
function loadConfig(configPath) {
  const raw = fs.readFileSync(configPath, 'utf8');
  return yaml.safeLoad(raw);
}

// Serializes a config object back to a YAML string.
function dumpConfig(config) {
  return yaml.safeDump(config);
}

module.exports = { loadConfig, dumpConfig };
