#!/bin/bash

set -e

COMMIT_HASH="5c51edc1d46b2739236cd16b67e3f6e2ae7bd0cb"

cd third_party

TMP_ZIP_FILE="docusaurus-search-local.zip"

rm -rf docusaurus-search-local/

curl -o "${TMP_ZIP_FILE}" "https://codeload.github.com/easyops-cn/docusaurus-search-local/zip/${COMMIT_HASH}"

unzip "${TMP_ZIP_FILE}"
rm "${TMP_ZIP_FILE}"
mv "docusaurus-search-local-${COMMIT_HASH}/" "docusaurus-search-local/"
