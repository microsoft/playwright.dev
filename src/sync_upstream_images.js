const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const isWatch = process.argv.includes('--watch');
const srcDir = process.env.SRC_DIR || '../playwright';
const sourceImagesDir = path.join(srcDir, 'docs', 'src', 'images');
const targetImagesDir = path.join(__dirname, '..', 'docs', 'images');

/**
 * Get relative path from source images directory
 * @param {string} fullPath 
 * @returns {string}
 */
function getRelativePath(fullPath) {
  return path.relative(sourceImagesDir, fullPath);
}

/**
 * Check if file is an image
 * @param {string} filePath 
 * @returns {boolean}
 */
function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
  return imageExtensions.includes(ext);
}

/**
 * Copy a single file from source to target
 * @param {string} sourcePath 
 * @param {string} targetPath 
 */
function copyFile(sourcePath, targetPath) {
  if (!isImageFile(sourcePath)) {
    return;
  }
  
  // Ensure target directory exists
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  console.log(`Copying image: ${getRelativePath(sourcePath)}`);
  fs.copyFileSync(sourcePath, targetPath);
}

/**
 * Remove a file from target
 * @param {string} targetPath 
 */
function removeFile(targetPath) {
  if (fs.existsSync(targetPath)) {
    console.log(`Removing image: ${getRelativePath(targetPath)}`);
    fs.unlinkSync(targetPath);
  }
}

/**
 * Recursively copy all files from source directory to target directory
 * @param {string} sourceDir 
 * @param {string} targetDir 
 */
function copyDirectoryRecursive(sourceDir, targetDir) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Read the source directory
  const files = fs.readdirSync(sourceDir);
  let imageCount = 0;

  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      // Recursively copy subdirectories
      imageCount += copyDirectoryRecursive(sourcePath, targetPath);
    } else if (isImageFile(sourcePath)) {
      copyFile(sourcePath, targetPath);
      imageCount++;
    }
  });

  return imageCount;
}

/**
 * Handle file system events when watching
 * @param {string} event 
 * @param {string} sourcePath 
 */
function handleFileEvent(event, sourcePath) {
  if (!isImageFile(sourcePath)) {
    return;
  }

  const relativePath = getRelativePath(sourcePath);
  const targetPath = path.join(targetImagesDir, relativePath);

  switch (event) {
    case 'add':
    case 'change':
      copyFile(sourcePath, targetPath);
      break;
    case 'unlink':
      removeFile(targetPath);
      break;
    case 'addDir':
      // Directory events are handled automatically by file events
      break;
    case 'unlinkDir':
      const targetDir = path.join(targetImagesDir, relativePath);
      if (fs.existsSync(targetDir)) {
        console.log(`Removing directory: ${relativePath}`);
        fs.rmSync(targetDir, { recursive: true, force: true });
      }
      break;
  }
}

function syncImages() {
  console.log('Syncing images from upstream playwright repo...');
  console.log(`Source: ${sourceImagesDir}`);
  console.log(`Target: ${targetImagesDir}`);

  if (!fs.existsSync(sourceImagesDir)) {
    console.error(`Source images directory does not exist: ${sourceImagesDir}`);
    process.exit(1);
  }

  const imageCount = copyDirectoryRecursive(sourceImagesDir, targetImagesDir);
  console.log(`Image sync completed! Copied ${imageCount} images.`);
}

// Main execution
if (isWatch) {
  console.log('Watching for image changes...');
  syncImages();
  
  const watcher = chokidar.watch(sourceImagesDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  watcher
    .on('add', path => handleFileEvent('add', path))
    .on('change', path => handleFileEvent('change', path))
    .on('unlink', path => handleFileEvent('unlink', path))
    .on('addDir', path => handleFileEvent('addDir', path))
    .on('unlinkDir', path => handleFileEvent('unlinkDir', path))
    .on('error', error => console.error(`Watcher error: ${error}`));

  console.log('Image watcher started. Press Ctrl+C to stop.');
} else {
  syncImages();
}
