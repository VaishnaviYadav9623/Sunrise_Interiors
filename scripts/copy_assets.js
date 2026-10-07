import fs from 'fs';
import path from 'path';

const srcDir = `C:\\Users\\siddh\\.gemini\\antigravity-ide\\brain\\6d8ab799-9abe-4a54-b35e-26fd2261e164`;
const destDir = `c:\\Users\\siddh\\OneDrive\\ドキュメント\\Antigravity_workspace1\\public\\images`;

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);

const mapping = {
  'luxury_living_room_hero': 'hero.png',
  'velvet_armchair': 'velvet_armchair.png',
  'oak_dining_table': 'oak_dining_table.png',
  'brass_floor_lamp': 'brass_floor_lamp.png',
  'sculptural_modular_sofa': 'modular_sofa.png',
  'walnut_coffee_table': 'walnut_table.png'
};

for (const file of files) {
  for (const [key, destName] of Object.entries(mapping)) {
    if (file.startsWith(key) && file.endsWith('.png')) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, destName);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} -> ${destName}`);
    }
  }
}
