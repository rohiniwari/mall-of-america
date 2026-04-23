const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const BACKUP_DIR = path.join(PUBLIC_DIR, 'videos-original');

// Hardcoded video configs based on known dimensions from ffmpeg -i output
const VIDEO_CONFIGS = [
  {
    name: '10596199-hd_1080_1920_30fps.mp4',
    width: 1080,
    height: 1920,
  },
  {
    name: '3226114-hd_1920_1080_25fps.mp4',
    width: 1920,
    height: 1080,
  },
  {
    name: '20441628-uhd_3840_2160_50fps.mp4',
    width: 3840,
    height: 2160,
  },
  {
    name: '15067115_2560_1440_30fps.mp4',
    width: 2560,
    height: 1440,
  },
  {
    name: '15586754_2160_3840_30fps.mp4',
    width: 2160,
    height: 3840,
  },
];

function getScaleFilter(width, height) {
  const maxDim = 1920;
  if (width <= maxDim && height <= maxDim) return null;
  if (width >= height) {
    return `scale=${maxDim}:-2:flags=lanczos`;
  }
  return `scale=-2:${maxDim}:flags=lanczos`;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function compressVideo(inputPath, outputPath, scaleFilter) {
  const args = [
    '-y',
    '-i', inputPath,
    '-an',
    '-c:v', 'libx264',
    '-crf', '28',
    '-preset', 'slow',
    '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p',
    '-profile:v', 'high',
    '-level', '4.2',
  ];

  if (scaleFilter) {
    args.push('-vf', scaleFilter);
  }

  args.push(outputPath);

  console.log(`  Running ffmpeg...`);
  const result = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  return result.status === 0;
}

function main() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  console.log(`Found ${VIDEO_CONFIGS.length} video(s) to compress.\n`);

  const results = [];

  for (const config of VIDEO_CONFIGS) {
    const video = config.name;
    const srcPath = path.join(PUBLIC_DIR, video);

    if (!fs.existsSync(srcPath)) {
      console.log(`Skipping ${video} (not found in public/)`);
      continue;
    }

    const backupPath = path.join(BACKUP_DIR, video);
    const originalSize = fs.statSync(srcPath).size;

    // Backup if not already backed up
    if (!fs.existsSync(backupPath)) {
      console.log(`Backing up ${video}...`);
      fs.copyFileSync(srcPath, backupPath);
    } else {
      console.log(`Backup already exists for ${video}`);
    }

    const scaleFilter = getScaleFilter(config.width, config.height);
    if (scaleFilter) {
      console.log(`Compressing ${video} (${formatBytes(originalSize)}) → scaling with "${scaleFilter}"...`);
    } else {
      console.log(`Compressing ${video} (${formatBytes(originalSize)}) → re-encoding at same resolution...`);
    }

    const tempPath = path.join(PUBLIC_DIR, `_${video}`);
    const success = compressVideo(srcPath, tempPath, scaleFilter);

    if (success && fs.existsSync(tempPath)) {
      const newSize = fs.statSync(tempPath).size;
      // Use copy+unlink instead of rename to avoid OneDrive EPERM issues
      fs.copyFileSync(tempPath, srcPath);
      fs.unlinkSync(tempPath);
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`  Done: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)\n`);
      results.push({ name: video, before: originalSize, after: newSize });
    } else {
      console.error(`  Failed to compress ${video}\n`);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      results.push({ name: video, before: originalSize, after: originalSize, failed: true });
    }
  }

  console.log('========================================');
  console.log('Compression Summary');
  console.log('========================================');
  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    totalBefore += r.before;
    totalAfter += r.after;
    const status = r.failed ? 'FAILED' : `${((1 - r.after / r.before) * 100).toFixed(1)}% saved`;
    console.log(`${r.name}: ${formatBytes(r.before)} → ${formatBytes(r.after)} (${status})`);
  }
  console.log('----------------------------------------');
  const totalSavings = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(`TOTAL: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (${totalSavings}% saved)`);
  console.log('========================================');
}

main();

