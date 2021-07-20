#!/usr/bin/env bash

PW_CHECKOUT_PATH="/tmp/playwright-for-playwright-dev"

if ! command -v node > /dev/null; then
  echo "ERROR: node.js not found!"
  exit 1
fi

NODE_VERSION=$(node --version)
if [[ "${NODE_VERSION}" != "v14"* ]]; then
  echo "ERROR: node.js must be v14"
  exit 1
fi

if ! command -v yarn > /dev/null; then
  echo "ERROR: yarn must be installed globally"
  echo "Run:   npm i -g yarn"
  exit 1
fi

if [[ -d "${PW_CHECKOUT_PATH}" ]]; then
  rm -rf "${PW_CHECKOUT_PATH}"
fi

git clone --depth=1 https://github.com/microsoft/playwright "${PW_CHECKOUT_PATH}"
SRC_DIR="${PW_CHECKOUT_PATH}" npm run roll
