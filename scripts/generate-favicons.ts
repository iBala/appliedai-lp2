import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sizes = {
  favicon: [16, 32],
  apple: [180],
  android: [192, 512],
};

async function generateFavicons() {
  const svgBuffer = await fs.readFile(path.join(process.cwd(), 'public/icon.svg'));

  // Generate ICO files
  for (const size of sizes.favicon) {
    await sharp(svgBuffer)
      .resize(size, size)
      .toFile(path.join(process.cwd(), `public/favicon-${size}x${size}.png`));
  }

  // Generate Apple Touch Icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .toFile(path.join(process.cwd(), 'public/apple-icon.png'));

  // Generate Android Icons
  for (const size of sizes.android) {
    await sharp(svgBuffer)
      .resize(size, size)
      .toFile(path.join(process.cwd(), `public/android-${size}x${size}.png`));
  }

  console.log('✅ Generated all favicon sizes');
}

generateFavicons().catch(console.error); 