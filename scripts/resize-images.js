const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '..', 'images', 'hero.png');
const sizes = [400, 800, 1200];

(async () => {
  try {
    if (!fs.existsSync(input)) {
      console.error('Input image not found:', input);
      process.exit(1);
    }

    for (const w of sizes) {
      const outPng = path.join(__dirname, '..', 'images', `hero-${w}.png`);
      const outWebp = path.join(__dirname, '..', 'images', `hero-${w}.webp`);

      await sharp(input)
        .resize({ width: w })
        .png({ quality: 80, compressionLevel: 8 })
        .toFile(outPng);

      await sharp(input)
        .resize({ width: w })
        .webp({ quality: 75 })
        .toFile(outWebp);

      console.log('Created', outPng, outWebp);
    }

    console.log('All images generated.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
