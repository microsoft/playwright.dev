---
title: "Configuration"
---

# Configuration

## Headed and headless mode

By default, Playwright MCP runs the browser in **headed mode** so you can see what's happening. To run headless:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"]
    }
  }
}
```

## Browser selection

```json
["@playwright/mcp@latest", "--browser=firefox"]
```

| Value | Browser |
|-------|---------|
| `chrome` | Google Chrome (default) |
| `firefox` | Mozilla Firefox |
| `webkit` | WebKit (Safari engine) |
| `msedge` | Microsoft Edge |

## Device emulation

```json
["@playwright/mcp@latest", "--device=iPhone 15"]
```

## Viewport size

```json
["@playwright/mcp@latest", "--viewport-size=1280x720"]
```

## Proxy

```json
["@playwright/mcp@latest", "--proxy-server=http://myproxy:3128", "--proxy-bypass=localhost,*.internal.com"]
```

## Standalone HTTP server

When running a headed browser on a system without a display or from IDE worker processes, start the MCP server separately with HTTP transport:

```bash
npx @playwright/mcp@latest --port 8931
```

Then point your MCP client to the HTTP endpoint:

```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}
```

Use `--host 0.0.0.0` to bind to all interfaces (useful in containers). Use `--shared-browser-context` to share a single browser context between multiple connected clients.

## Configuration file

For advanced settings, use a JSON config file:

```bash
npx @playwright/mcp@latest --config path/to/config.json
```

### Schema

```typescript
{
  browser?: {
    browserName?: 'chromium' | 'firefox' | 'webkit';
    isolated?: boolean;
    userDataDir?: string;
    launchOptions?: playwright.LaunchOptions;
    contextOptions?: playwright.BrowserContextOptions;
    cdpEndpoint?: string;
    cdpHeaders?: Record<string, string>;
    cdpTimeout?: number;
    remoteEndpoint?: string;
    initPage?: string[];
    initScript?: string[];
  };
  extension?: boolean;
  server?: {
    port?: number;
    host?: string;
    allowedHosts?: string[];
  };
  saveVideo?: { width: number; height: number };
  capabilities?: ('core' | 'core-navigation' | 'core-tabs' | 'core-input'
    | 'network' | 'storage' | 'testing' | 'vision' | 'pdf' | 'devtools')[];
  secrets?: Record<string, string>;
  saveSession?: boolean;
  sharedBrowserContext?: boolean;
  snapshot?: { mode?: 'full' | 'none' };
  imageResponses?: 'allow' | 'omit';
  outputDir?: string;
  outputMode?: 'file' | 'stdout';
  console?: { level?: 'error' | 'warning' | 'info' | 'debug' };
  network?: {
    allowedOrigins?: string[];
    blockedOrigins?: string[];
  };
  testIdAttribute?: string;
  timeouts?: {
    action?: number;      // default: 5000ms
    navigation?: number;  // default: 60000ms
    expect?: number;      // default: 5000ms
  };
  allowUnrestrictedFileAccess?: boolean;
  codegen?: 'typescript' | 'none';
}
```

### Init scripts

Run code on every page before the page's own scripts:

```json
{
  "browser": {
    "initScript": ["./setup.js"]
  }
}
```

```js
// setup.js
window.isPlaywrightMCP = true;
```

### Init page

Run Playwright code on the page object at startup:

```json
{
  "browser": {
    "initPage": ["./setup-page.ts"]
  }
}
```

```ts
// setup-page.ts
export default async ({ page }) => {
  await page.context().grantPermissions(['geolocation']);
  await page.context().setGeolocation({ latitude: 37.7749, longitude: -122.4194 });
};
```

## All command-line options

| Option | Description | Env Variable |
|--------|-------------|--------------|
| `--browser <browser>` | Browser to use | `PLAYWRIGHT_MCP_BROWSER` |
| `--headless` | Run headless | `PLAYWRIGHT_MCP_HEADLESS` |
| `--caps <caps>` | Enable capabilities (comma-separated) | `PLAYWRIGHT_MCP_CAPS` |
| `--config <path>` | Config file path | `PLAYWRIGHT_MCP_CONFIG` |
| `--isolated` | In-memory profile | `PLAYWRIGHT_MCP_ISOLATED` |
| `--extension` | Connect via browser extension | `PLAYWRIGHT_MCP_EXTENSION` |
| `--user-data-dir <path>` | Custom profile directory | `PLAYWRIGHT_MCP_USER_DATA_DIR` |
| `--storage-state <path>` | Initial storage state | `PLAYWRIGHT_MCP_STORAGE_STATE` |
| `--port <port>` | HTTP transport port | `PLAYWRIGHT_MCP_PORT` |
| `--host <host>` | Server host | `PLAYWRIGHT_MCP_HOST` |
| `--device <device>` | Device to emulate | `PLAYWRIGHT_MCP_DEVICE` |
| `--executable-path <path>` | Custom browser executable | `PLAYWRIGHT_MCP_EXECUTABLE_PATH` |
| `--viewport-size <size>` | Viewport (e.g., "1280x720") | `PLAYWRIGHT_MCP_VIEWPORT_SIZE` |
| `--proxy-server <url>` | Proxy server | `PLAYWRIGHT_MCP_PROXY_SERVER` |
| `--proxy-bypass <hosts>` | Bypass proxy | `PLAYWRIGHT_MCP_PROXY_BYPASS` |
| `--user-agent <ua>` | Custom user agent | `PLAYWRIGHT_MCP_USER_AGENT` |
| `--ignore-https-errors` | Ignore HTTPS errors | `PLAYWRIGHT_MCP_IGNORE_HTTPS_ERRORS` |
| `--timeout-action <ms>` | Action timeout (5000) | `PLAYWRIGHT_MCP_TIMEOUT_ACTION` |
| `--timeout-navigation <ms>` | Navigation timeout (60000) | `PLAYWRIGHT_MCP_TIMEOUT_NAVIGATION` |
| `--console-level <level>` | Console level | `PLAYWRIGHT_MCP_CONSOLE_LEVEL` |
| `--test-id-attribute <attr>` | Test ID attribute | `PLAYWRIGHT_MCP_TEST_ID_ATTRIBUTE` |
| `--codegen <lang>` | Code generation language | `PLAYWRIGHT_MCP_CODEGEN` |
| `--init-page <path>` | Page init TypeScript | `PLAYWRIGHT_MCP_INIT_PAGE` |
| `--init-script <path>` | Page init JavaScript | `PLAYWRIGHT_MCP_INIT_SCRIPT` |
| `--blocked-origins <origins>` | Block origins | `PLAYWRIGHT_MCP_BLOCKED_ORIGINS` |
| `--allowed-origins <origins>` | Allow origins | `PLAYWRIGHT_MCP_ALLOWED_ORIGINS` |
| `--grant-permissions <perms>` | Browser permissions | `PLAYWRIGHT_MCP_GRANT_PERMISSIONS` |
| `--block-service-workers` | Block service workers | `PLAYWRIGHT_MCP_BLOCK_SERVICE_WORKERS` |
| `--no-sandbox` | Disable sandbox | `PLAYWRIGHT_MCP_NO_SANDBOX` |
| `--output-dir <path>` | Output directory | `PLAYWRIGHT_MCP_OUTPUT_DIR` |
| `--save-session` | Save session data | `PLAYWRIGHT_MCP_SAVE_SESSION` |
| `--save-video <size>` | Auto-record video (e.g., "800x600") | `PLAYWRIGHT_MCP_SAVE_VIDEO` |
| `--secrets <path>` | Secrets file (dotenv) | `PLAYWRIGHT_MCP_SECRETS_FILE` |
