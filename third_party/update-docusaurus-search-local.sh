#!/bin/bash

set -e

COMMIT_HASH="dadc30a6d5764875116dbaa0596e94691773d991"

cd third_party

TMP_ZIP_FILE="docusaurus-search-local.zip"

rm -rf docusaurus-search-local/

curl --fail -o "${TMP_ZIP_FILE}" "https://codeload.github.com/easyops-cn/docusaurus-search-local/zip/${COMMIT_HASH}"

unzip "${TMP_ZIP_FILE}"
rm "${TMP_ZIP_FILE}"
mv "docusaurus-search-local-${COMMIT_HASH}/" "docusaurus-search-local/"
