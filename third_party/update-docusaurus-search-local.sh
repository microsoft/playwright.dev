#!/bin/bash

set -e

COMMIT_HASH="61c4b742c160b13b721eb400a8d531f131aaa2bd"

cd third_party

TMP_ZIP_FILE="docusaurus-search-local.zip"

rm -rf docusaurus-search-local/

curl -o "${TMP_ZIP_FILE}" "https://codeload.github.com/easyops-cn/docusaurus-search-local/zip/${COMMIT_HASH}"

unzip "${TMP_ZIP_FILE}"
rm "${TMP_ZIP_FILE}"
mv "docusaurus-search-local-${COMMIT_HASH}/" "docusaurus-search-local/"
