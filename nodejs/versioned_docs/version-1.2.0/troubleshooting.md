---
id: troubleshooting
title: "Troubleshooting"
---


<!-- GEN:toc -->
- [Chromium](#chromium)
  * [Chrome headless doesn't launch on Windows](#chrome-headless-doesnt-launch-on-windows)
  * [Chrome headless doesn't launch on Linux/WSL](#chrome-headless-doesnt-launch-on-linuxwsl)
  * [Setting Up Chrome Linux Sandbox](#setting-up-chrome-linux-sandbox)
    - [[recommended] Enable user namespace cloning](#recommended-enable-user-namespace-cloning)
    - [[alternative] Setup setuid sandbox](#alternative-setup-setuid-sandbox)
- [Firefox](#firefox)
  * [Firefox headless doesn't launch on Linux/WSL](#firefox-headless-doesnt-launch-on-linuxwsl)
- [WebKit](#webkit)
  * [WebKit headless doesn't launch on Linux/WSL](#webkit-headless-doesnt-launch-on-linuxwsl)
- [Code transpilation issues](#code-transpilation-issues)
- [Node requirements](#node-requirements)
  * [ReferenceError: URL is not defined](#referenceerror-url-is-not-defined)
<!-- GEN:stop -->

## Chromium

### Chrome headless doesn't launch on Windows

Some [chrome policies](https://support.google.com/chrome/a/answer/7532015?hl=en) might enforce running Chrome/Chromium
with certain extensions.

Playwright passes `--disable-extensions` flag by default and will fail to launch when such policies are active.

To work around this, try running without the flag:

```js
const browser = await playwright.chromium.launch({
  ignoreDefaultArgs: ['--disable-extensions'],
});
```

> Context: [Puppeteer#3681](https://github.com/puppeteer/puppeteer/issues/3681#issuecomment-447865342).

### Chrome headless doesn't launch on Linux/WSL

Make sure all the necessary dependencies are installed. You can run `ldd chrome | grep not` on a Linux
machine to check which dependencies are missing. For dependencies on Ubuntu, please refer to [Dockerfile](https://github.com/microsoft/playwright/blob/master/utils/docker/Dockerfile.bionic) which is used to run our tests.

The common ones for Debian and CentOS are provided below.

<details>
<summary>Debian (e.g. Ubuntu) Dependencies</summary>

```
gconf-service
libasound2
libatk1.0-0
libatk-bridge2.0-0
libc6
libcairo2
libcups2
libdbus-1-3
libexpat1
libfontconfig1
libgcc1
libgconf-2-4
libgdk-pixbuf2.0-0
libglib2.0-0
libgtk-3-0
libnspr4
libpango-1.0-0
libpangocairo-1.0-0
libstdc++6
libx11-6
libx11-xcb1
libxcb1
libxcomposite1
libxcursor1
libxdamage1
libxext6
libxfixes3
libxi6
libxrandr2
libxrender1
libxss1
libxtst6
ca-certificates
fonts-liberation
libappindicator1
libnss3
lsb-release
xdg-utils
wget
libgbm1
```
</details>

<details>
<summary>CentOS Dependencies</summary>

```
pango.x86_64
libXcomposite.x86_64
libXcursor.x86_64
libXdamage.x86_64
libXext.x86_64
libXi.x86_64
libXtst.x86_64
cups-libs.x86_64
libXScrnSaver.x86_64
libXrandr.x86_64
GConf2.x86_64
alsa-lib.x86_64
atk.x86_64
gtk3.x86_64
ipa-gothic-fonts
xorg-x11-fonts-100dpi
xorg-x11-fonts-75dpi
xorg-x11-utils
xorg-x11-fonts-cyrillic
xorg-x11-fonts-Type1
xorg-x11-fonts-misc
```

After installing dependencies you need to update nss library using this command

```
yum update nss -y
```
</details>

<details>
  <summary>Check out discussions</summary>

- [Puppeteer#290](https://github.com/puppeteer/puppeteer/issues/290) - Debian troubleshooting <br/>
- [Puppeteer#391](https://github.com/puppeteer/puppeteer/issues/391) - CentOS troubleshooting <br/>
- [Puppeteer#379](https://github.com/puppeteer/puppeteer/issues/379) - Alpine troubleshooting <br/>

</details>

Please file new issues in this repo for things relating to Playwright.

### Setting Up Chrome Linux Sandbox

In order to protect the host environment from untrusted web content, Chrome uses [multiple layers of sandboxing](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/linux_sandboxing.md). For this to work properly,
the host should be configured first. If there's no good sandbox for Chrome to use, it will crash
with the error `No usable sandbox!`.

If you **absolutely trust** the content you open in Chrome, you can launch Chrome
with the `--no-sandbox` argument:

```js
const browser = await playwright.chromium.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
```

> **NOTE**: Running without a sandbox is **strongly discouraged**. Consider configuring a sandbox instead.

There are 2 ways to configure a sandbox in Chromium.

#### [recommended] Enable [user namespace cloning](http://man7.org/linux/man-pages/man7/user_namespaces.7.html)

User namespace cloning is only supported by modern kernels. Unprivileged user namespaces are generally fine to enable,
but in some cases they open up more kernel attack surface for (unsandboxed) non-root processes to elevate to
kernel privileges.

```bash
sudo sysctl -w kernel.unprivileged_userns_clone=1
```

#### [alternative] Setup [setuid sandbox](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/linux_suid_sandbox_development.md)

The setuid sandbox comes as a standalone executable and is located next to the Chromium that Playwright downloads. It is
fine to re-use the same sandbox executable for different Chromium versions, so the following could be
done only once per host environment:

```bash
# cd to the downloaded instance
cd <project-dir-path>/node_modules/playwright/.local-browsers/chromium-<revision>/
sudo chown root:root chrome_sandbox
sudo chmod 4755 chrome_sandbox
# copy sandbox executable to a shared location
sudo cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox
# export CHROME_DEVEL_SANDBOX env variable
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
```

You might want to export the `CHROME_DEVEL_SANDBOX` env variable by default. In this case, add the following to the `~/.bashrc`
or `.zshenv`:

```bash
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
```

## Firefox

### Firefox headless doesn't launch on Linux/WSL

Make sure all the necessary dependencies are installed. You can run `ldd chrome | grep not` on a Linux
machine to check which dependencies are missing. For dependencies on Ubuntu, please refer to [Dockerfile](https://github.com/microsoft/playwright/blob/master/utils/docker/Dockerfile.bionic) which is used to run our tests.

## WebKit

### WebKit headless doesn't launch on Linux/WSL

Make sure all the necessary dependencies are installed. You can run `ldd chrome | grep not` on a Linux
machine to check which dependencies are missing. For dependencies on Ubuntu, please refer to [Dockerfile](https://github.com/microsoft/playwright/blob/master/utils/docker/Dockerfile.bionic) which is used to run our tests.

## Code transpilation issues

If you are using a JavaScript transpiler like babel or TypeScript, calling `evaluate()` with an async function might not work. This is because while `playwright` uses `Function.prototype.toString()` to serialize functions while transpilers could be changing the output code in such a way it's incompatible with `playwright`.

Some workarounds to this problem would be to instruct the transpiler not to mess up with the code, for example, configure TypeScript to use latest ECMAScript version (`"target": "es2018"`). Another workaround could be using string templates instead of functions:

```js
await page.evaluate(`(async() => {
   console.log('1');
})()`);
```

## Node requirements

### ReferenceError: URL is not defined

Playwright requires Node 10 or higher. Node 8 is not supported, and will cause you to receive this error.

# Please file an issue

Playwright is a new project, and we are watching the issues very closely. As we solve common issues, this document will grow to include the common answers.
