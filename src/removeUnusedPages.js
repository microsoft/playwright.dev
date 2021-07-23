const fs = require("fs");
const path = require("path");

/** @typedef {'nodejs' | 'dotnet' | 'java' | 'python'} LanguageFolder */

/** @type {Record<LanguageFolder, string[]} */
const languageExceptions = {
  'nodejs': [
    'mobile.mdx'
  ]
}

const exceptions = [
  'installation.mdx',
  'showcase.mdx',
]

/**
 * @param {LanguageFolder} language
 * */
function removeUnusedPages(languages) {
  for(const language of languages) {
    removeUnusedPageForLanguage(language)
  }
}

function removeUnusedPageForLanguage(language) {
  const languageFolder = path.join(__dirname, '..', language)
  const sidebarPages = getSidebarPages(languageFolder)
  const existingPages = readDirRecursive(path.join(languageFolder, 'docs'))
  const unusedPages = getUnusedPages(language, languageFolder, sidebarPages, existingPages)
  for(const page of unusedPages) {
    console.log(`Removing unused page: ${page}`)
    fs.rmSync(page)
  }
}

function getSidebarPages(languageFolder) {
  const sidebar = require(path.join(languageFolder, 'sidebars.js'))
  const pages = []
  const visit = (item) => {
    if (item.type === 'doc') {
      pages.push(path.join(languageFolder, 'docs', item.id + '.mdx'))
    } else if (item.type === 'category') {
      item.items.forEach(visit)
    }
  }
  for (const key in sidebar)
    sidebar[key].forEach(visit)
  return pages
}

function readDirRecursive(dir) {
  const files = fs.readdirSync(dir)
  const result = []
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      result.push(...readDirRecursive(filePath))
    } else {
      const content = fs.readFileSync(filePath, 'utf8')
      const id = /id: (.*)\n/.exec(content)[1]
      result.push(path.join(path.dirname(filePath), id + path.extname(filePath)))
    }
  }
  return result
}

function getUnusedPages(language, languageFolder, sidebarPages, existingPages) {
  const result = []
  for (const page of existingPages) {
    const isIncludedInSidebar = sidebarPages.includes(page)
    const isInExceptions = exceptions.some(p => path.join(languageFolder, "docs", p) === page)
    const isInLanguageExceptions = languageExceptions[language]?.some(p => path.join(languageFolder, "docs", p) === page)
    if (!isIncludedInSidebar && !isInExceptions && !isInLanguageExceptions) {
      result.push(page)
    }
  }
  return result
}

module.exports = {
  removeUnusedPages,
}