const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const assetsDir = path.join(process.cwd(), 'src/assets');

try {
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(f => {
    const ext = f.toLowerCase();
    return ext.endsWith('.png') || ext.endsWith('.jpeg') || ext.endsWith('.jpg');
  });
  
  if (imageFiles.length === 0) {
    console.log("No PNG or JPEG files found. Your assets are clean!");
    process.exit(0);
  }

  console.log(`Found ${imageFiles.length} old images to clean up...`);

  let convertCount = 0;
  let deleteCount = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, file.replace(/\.(png|jpeg|jpg)$/i, '.webp'));
    
    // If the webp doesn't exist yet (like for the JPEGs), convert it first
    if (!fs.existsSync(outputPath)) {
      console.log(`Converting ${file} to WEBP...`);
      try {
        execSync(`npx -y cwebp-bin "${inputPath}" -q 80 -o "${outputPath}"`, { stdio: 'inherit' });
        convertCount++;
      } catch (e) {
        console.error(`Error converting ${file}:`, e.message);
        continue; // Don't delete if conversion failed
      }
    }

    // Now securely delete the old PNG/JPEG
    console.log(`Deleting old file: ${file}`);
    fs.unlinkSync(inputPath);
    deleteCount++;
  }
  
  console.log(`\nSUCCESS! Converted ${convertCount} new files and deleted ${deleteCount} old files.`);
  console.log(`Your assets folder now contains ONLY ultra-fast .webp images!`);
} catch (e) {
  console.error("Script failed:", e);
}
