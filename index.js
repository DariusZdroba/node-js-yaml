'use strict';

const path = require('path');
const { loadConfig, dumpConfig } = require('./src/config');

const config = loadConfig(path.join(__dirname, 'config.yml'));

console.log(`starting server on ${config.server.host}:${config.server.port}`);
console.log(`cache=${config.features.cache} retries=${config.features.retries}`);
console.log('effective config:\n' + dumpConfig(config));
