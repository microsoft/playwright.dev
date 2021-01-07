---
id: ci
title: "Continuous Integration"
---


Playwright tests can be executed to run on your CI environments. To simplify this, we have created sample configurations for common CI providers that can be used to bootstrap your setup.

<!-- GEN:toc -->
- [GitHub Actions](#github-actions)
- [Docker](#docker)
- [Azure Pipelines](#azure-pipelines)
<!-- GEN:stop -->

Broadly, configuration on CI involves **ensuring system dependencies** are in place, **installing Playwright and browsers** (typically with `npm install`), and **running tests** (typically with `npm test`). Windows and macOS build agents do not require any additional system dependencies. Linux build agents can require additional dependencies, depending on the Linux distribution.

## GitHub Actions

The [Playwright GitHub Action](https://github.com/microsoft/playwright-github-action) can be used to run Playwright tests on GitHub Actions.

```yml
steps:
  - uses: microsoft/playwright-github-action@v1
  - name: Run your tests
    run: npm test
```

We run [our tests](https://github.com/microsoft/playwright/blob/master/.github/workflows/tests.yml) on GitHub Actions, across a matrix of 3 platforms (Windows, Linux, macOS) and 3 browsers (Chromium, Firefox, WebKit).

## Docker

We have a [pre-built Docker image](docker/README.md) which can either be used directly, or as a reference to update your existing Docker definitions.

## Azure Pipelines

For Windows or macOS agents, no additional configuration required, just install Playwright and run your tests.

For Linux agents, refer to [our Docker setup](docker/README.md) to see additional dependencies that need to be installed.
