/**
 * Remove o fundo (branco/cinzento muito claro) de uma imagem PNG.
 * Salva o resultado sobre o ficheiro original.
 *
 * Uso:
 *   node scripts/remove-bg.js <ficheiro-relativo-a-public> [threshold]
 *
 * Exemplo:
 *   node scripts/remove-bg.js manuel_amorim_barros_logo_sem_fundo.png 235
 */

const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const PUBLIC    = path.join(__dirname, "..", "public");
const file      = process.argv[2] || "manuel_amorim_barros_logo_sem_fundo.png";
const threshold = parseInt(process.argv[3] || "230", 10);
const src       = path.join(PUBLIC, file);

if (!fs.existsSync(src)) {
  console.error("Ficheiro não encontrado:", src);
  process.exit(1);
}

(async () => {
  const buf = await fs.promises.readFile(src);
  const { data, info } = await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`A processar ${file} (${info.width}×${info.height}, threshold=${threshold})`);

  let cleared = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Pixel quase-branco em todos os canais → transparente
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0;
      cleared++;
    }
  }

  const result = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).png().toBuffer();

  await fs.promises.writeFile(src, result);
  const pct = ((cleared / (info.width * info.height)) * 100).toFixed(1);
  console.log(`✔ ${cleared.toLocaleString()} pixels limpos (${pct}% da imagem)`);
})();
