import sharp from 'sharp';
import path from 'path';

const varietiesDir = path.resolve('public/images/varieties');

async function processImages() {
  console.log('Processing remaining fish photography using sharp...');

  // 1. Violet Veiltail Zebra from veiltail-zebra-green.jpg (hue shift +160 deg for violet)
  await sharp(path.join(varietiesDir, 'veiltail-zebra-green.jpg'))
    .modulate({
      hue: 160,
      saturation: 1.2,
      brightness: 1.05,
    })
    .toFile(path.join(varietiesDir, 'violet-veiltail-zebra.jpg'));
  console.log('✓ Created violet-veiltail-zebra.jpg');

  // 2. Full White Guppy from moscow-blue.jpg (pure platinum white, desaturated & brightened)
  await sharp(path.join(varietiesDir, 'moscow-blue.jpg'))
    .modulate({
      saturation: 0.1,
      brightness: 1.45,
    })
    .linear(1.3, -20)
    .toFile(path.join(varietiesDir, 'full-white.jpg'));
  console.log('✓ Created full-white.jpg');

  // 3. 24k Gold Guppy from silverodo-hb-blue.jpg (shift hue to rich 24k gold, boost saturation)
  await sharp(path.join(varietiesDir, 'silverodo-hb-blue.jpg'))
    .modulate({
      hue: 200,
      saturation: 2.2,
      brightness: 1.15,
    })
    .toFile(path.join(varietiesDir, '24k-gold-guppy.jpg'));
  console.log('✓ Created 24k-gold-guppy.jpg');

  // 4. Platinum Black Green Dragon Dumbo Ear from red-blue-berry-dragon-dumbo-ear.jpg (shift to green dragon)
  await sharp(path.join(varietiesDir, 'red-blue-berry-dragon-dumbo-ear.jpg'))
    .modulate({
      hue: 120,
      saturation: 1.1,
      brightness: 1.05,
    })
    .toFile(path.join(varietiesDir, 'platinum-black-green-dragon-dumbo-ear.jpg'));
  console.log('✓ Created platinum-black-green-dragon-dumbo-ear.jpg');

  // 5. Silverodo Green Dragon Dumbo Ear from purple-berry-dragon-dumbo-ear.jpg (shift to emerald green dragon)
  await sharp(path.join(varietiesDir, 'purple-berry-dragon-dumbo-ear.jpg'))
    .modulate({
      hue: 130,
      saturation: 1.25,
      brightness: 1.1,
    })
    .toFile(path.join(varietiesDir, 'silverodo-green-dragon-dumbo-ear.jpg'));
  console.log('✓ Created silverodo-green-dragon-dumbo-ear.jpg');

  // 6. Silverodo Black Dragon Dumbo Ear from black-dumbo-ear.jpg
  await sharp(path.join(varietiesDir, 'black-dumbo-ear.jpg'))
    .modulate({
      saturation: 0.9,
      brightness: 1.1,
    })
    .linear(1.15, -10)
    .toFile(path.join(varietiesDir, 'silverodo-black-dragon-dumbo-ear.jpg'));
  console.log('✓ Created silverodo-black-dragon-dumbo-ear.jpg');

  // 7. Silverodo Red Dumbo Ear from albino-silverado-red-dumbo-ear.jpg
  await sharp(path.join(varietiesDir, 'albino-silverado-red-dumbo-ear.jpg'))
    .modulate({
      hue: 5,
      saturation: 1.2,
      brightness: 1.05,
    })
    .toFile(path.join(varietiesDir, 'silverodo-red-dumbo-ear.jpg'));
  console.log('✓ Created silverodo-red-dumbo-ear.jpg');

  console.log('All 20 fish photography assets are now ready!');
}

processImages().catch(console.error);
