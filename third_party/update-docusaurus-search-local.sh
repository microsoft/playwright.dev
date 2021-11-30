#!/bin/bash

set -e

COMMIT_HASH="9093d71039f35409535ca77fdf2198d1d87291bf"

cd third_party

TMP_ZIP_FILE="docusaurus-search-local.zip"

rm -rf docusaurus-search-local/

curl --fail -o "${TMP_ZIP_FILE}" "https://codeload.github.com/easyops-cn/docusaurus-search-local/zip/${COMMIT_HASH}"

unzip "${TMP_ZIP_FILE}"
rm "${TMP_ZIP_FILE}"
mv "docusaurus-search-local-${COMMIT_HASH}/" "docusaurus-search-local/"
