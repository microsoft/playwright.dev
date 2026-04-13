---
title: "Tracing"
---

# Tracing

Record execution traces that capture DOM snapshots, screenshots, network activity, and console logs at every step.

## Commands

```bash
playwright-cli tracing-start            # start recording
playwright-cli tracing-stop             # stop and save
```

## Basic recording

```bash
playwright-cli tracing-start
playwright-cli goto https://example.com
playwright-cli click e5
playwright-cli fill e3 "test"
playwright-cli tracing-stop
# Trace saved to .playwright-cli/trace.zip
```

View the trace in the [Playwright Trace Viewer](/docs/trace-viewer-intro):

```bash
npx playwright show-trace .playwright-cli/trace.zip
```

The Trace Viewer shows a timeline of every action with DOM snapshots (before and after), screenshots, network requests and responses, console messages, and timing.

## Workflow: debugging a failing scenario

```bash
# Start tracing
playwright-cli tracing-start

# Walk through the failing flow
playwright-cli goto https://store.example.com/checkout
playwright-cli fill e10 "4111111111111111"
playwright-cli click e15

# Check what went wrong
playwright-cli snapshot
# - text: "Payment processing failed"

playwright-cli console error
# [error] POST /api/payment 422: {"error":"Card number must include expiry"}

# Save trace for analysis
playwright-cli tracing-stop
# Share trace with the team for full timeline analysis
```

## Automatic session recording

Save traces for every session automatically with the `--save-session` flag:

```bash
playwright-cli --save-session
```
