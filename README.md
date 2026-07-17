# Breakability demo — `js-yaml`

A minimal Node service that loads and re-serializes YAML config, used to demo
Remy's agentic Open Source (SCA) fix with breakability analysis. It ships with a
vulnerable `js-yaml` dependency and **no installed dependencies** (no
`node_modules/`, no lockfile), so the fix flow has to provision the environment
before it can scan.

## Run

```bash
snyk fix --agentic --experimental --sca --prepare-env
```

- `--agentic --experimental` — opt into the LLM-driven agentic fix flow.
- `--sca` — select the Open Source (dependency) product.
- `--prepare-env` — discover the package manager and install dependencies
  before scanning. This repo is committed without `node_modules/` or a lockfile,
  so without it the SCA scan has no resolved dependency tree to analyze. With it,
  the environment is prepared first, then the scan and fix run against real,
  installed dependencies.

You'll need an LLM provider configured (e.g. `ANTHROPIC_API_KEY`).

## Reset between runs — `reset-demo.sh`

A fix run edits `package.json` / `src/config.js` and leaves installed artifacts
behind. Restore the clean starting state before running again:

```bash
./reset-demo.sh
```

What it does:

- `cd`s to its own directory, so it works from anywhere.
- `git reset --hard HEAD` — restores tracked files (`package.json`,
  `src/config.js`, …) to the pristine committed state.
- `git clean -fd -e reset-demo.sh` — removes untracked artifacts
  (`node_modules/`, the lockfile), while **keeping itself** so it stays
  re-runnable.

It's committed executable (mode `755`), so a fresh clone can run it directly —
no `chmod` needed.
