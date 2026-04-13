---
title: "Test Debugging"
---

# Test Debugging

Use the CLI to debug Playwright test failures interactively.

## Connecting to a paused test

Start a test with the debug flag:

```bash
npx playwright test --debug=cli
```

The test pauses at the start and outputs a session name. Connect to it:

```bash
playwright-cli attach <session-name>
```

Then explore the page state:

```bash
playwright-cli snapshot                 # see current state
playwright-cli console error           # check for errors
playwright-cli eval "() => document.title"
playwright-cli screenshot --filename=debug-state.png
```

And control execution:

```bash
playwright-cli resume                   # continue
playwright-cli step-over                # step to next action
playwright-cli pause-at test.ts:42      # set a breakpoint
```

## Workflow: investigating a flaky test

```bash
# 1. Run the failing test
npx playwright test tests/checkout.spec.ts --debug=cli

# 2. Connect
playwright-cli attach playwright-test-1

# 3. Record a trace
playwright-cli tracing-start

# 4. Step through
playwright-cli resume
playwright-cli snapshot
playwright-cli console
playwright-cli network

# 5. Investigate at the failing step
playwright-cli screenshot --filename=before-failure.png
playwright-cli eval "() => document.querySelector('.spinner')?.style.display"

# 6. Save trace
playwright-cli tracing-stop
```
