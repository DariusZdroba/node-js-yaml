'use strict';

// Minimal dependency-free test (run via `npm test` -> `node test.js`).
// Exits non-zero on failure so the agentic fix flow's validation step can
// tell whether the js-yaml upgrade + mechanical rename kept the app working.

const assert = require('assert');
const path = require('path');
const { loadConfig, dumpConfig } = require('./src/config');

const config = loadConfig(path.join(__dirname, 'config.yml'));

assert.strictEqual(config.server.host, '0.0.0.0', 'server.host');
assert.strictEqual(config.server.port, 8080, 'server.port');
assert.strictEqual(config.features.cache, true, 'features.cache');
assert.strictEqual(config.features.retries, 3, 'features.retries');

const dumped = dumpConfig(config);
assert.strictEqual(typeof dumped, 'string', 'dumpConfig returns a string');
assert.ok(dumped.includes('port: 8080'), 'round-trips port through dump');

console.log('ok - config loads and serializes');
