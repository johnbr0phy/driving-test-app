// Email clients need literal colours rather than CSS variables. Keep this
// generated palette in step with the app's light themes. Run with --check in CI.
const fs = require('node:fs');
const css = fs.readFileSync('app/globals.css', 'utf8').split('.dark')[0];
function hex(value) {
  const [h, s, l] = value.split(/\s+/).map(Number);
  const a = s / 100 * Math.min(l / 100, 1 - l / 100);
  return '#' + [0, 8, 4].map(n => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, '0');
  }).join('');
}
const palettes = {};
for (const m of css.matchAll(/(:root|\[data-theme="([^"]+)"\])\s*\{([^}]+)\}/g)) {
  const values = {};
  for (const [, key, value] of m[3].matchAll(/--brand(-light|-darker|-border-light)?:\s*([\d.% ]+);/g)) values[key || ''] = hex(value.replaceAll('%', ''));
  if (values[''] && values['-light'] && values['-darker']) palettes[m[2] || 'dmv'] = [values[''], values['-light'], values['-darker'], values['-border-light'] || '#d8ded8'];
}
const target = 'lib/email-brand-palette.json';
const output = '{\n' + Object.entries(palettes).map(([key, colors]) => `  ${JSON.stringify(key)}: ${JSON.stringify(colors)}`).join(',\n') + '\n}\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(target, 'utf8') !== output) throw new Error('Run node scripts/build-email-brand.cjs');
} else fs.writeFileSync(target, output);
