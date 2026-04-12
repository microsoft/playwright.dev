---
title: "Video Recording"
---

# Video Recording

Record browser sessions as WebM videos with chapter markers.

## Commands

```bash
playwright-cli video-start [filename]   # start recording
playwright-cli video-chapter <title>    # add chapter marker
playwright-cli video-stop               # stop and save
```

## Basic recording

```bash
playwright-cli video-start demo.webm
playwright-cli goto https://example.com
playwright-cli click e5
playwright-cli fill e3 "test"
playwright-cli video-stop
# Video saved to: .playwright-cli/demo.webm
```

## Chapter markers

Add structure for navigation and review:

```bash
playwright-cli video-start

playwright-cli video-chapter "Step 1: Login"
playwright-cli goto https://app.example.com/login
playwright-cli fill e3 "user@example.com"
playwright-cli fill e5 "password"
playwright-cli click e7

playwright-cli video-chapter "Step 2: Navigate to settings"
playwright-cli goto /settings

playwright-cli video-chapter "Step 3: Update profile"
playwright-cli fill e10 "New Display Name"
playwright-cli click e15

playwright-cli video-stop
```

### Chapter options

```bash
playwright-cli video-chapter "Title" \
  --description="Detailed description" \
  --duration=2000  # show chapter card for 2 seconds
```

### Video size

```bash
playwright-cli video-start --size=800x600
```

## Use cases

| Scenario | Approach |
|----------|----------|
| Bug reproduction | Record steps, attach to issue |
| Test documentation | Record with chapter markers |
| Agent monitoring | Record agent sessions for review |
| Demo creation | Record polished walkthrough |

## Automatic recording

Record all sessions automatically via the [config file](../configuration.mdx):

```json
{
  "saveVideo": { "width": 800, "height": 600 }
}
```

Or via environment variable:

```bash
PLAYWRIGHT_MCP_SAVE_VIDEO=800x600 playwright-cli open https://example.com
```
