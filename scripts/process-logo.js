/**
 * Processa /public/logo.png para gerar:
 *  - logo.png             (versão original mas com fundo transparente)
 *  - logo-icon.png        (só o símbolo, fundo transparente)
 *  - logo-white.png       (versão completa, mas com o preto invertido para branco — para fundos escuros)
 *  - logo-icon-white.png  (só símbolo, com o preto invertido para branco)
 *
 * Uso:  node scripts/process-logo.js
 */

const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const PUBLIC = path.join(__dirname, "..", "public");
const SRC    = path.join(PUBLIC, "logo.png");

/** Remove fundo branco (>= threshold) tornando-o transparente */
async function removeWhiteBackground(buffer, threshold = 245) {
  const img = sharp(buffer);
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Pixel quase-branco → transparente
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

/** Substitui tudo que NÃO é laranja por branco (mantendo a opacidade original) */
async function blackToWhite(buffer) {
  const img = sharp(buffer);
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a === 0) continue;

    // Pixel é laranja? (R dominante sobre G e B)
    const isOrange = (r - g) > 30 && (r - b) > 60 && r > 130;

    if (!isOrange) {
      // Substitui por branco (255,255,255), mantém alpha
      data[i]     = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
    // Se for laranja, deixa intacto
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error("✘ /public/logo.png não encontrado.");
    process.exit(1);
  }

  const meta = await sharp(SRC).metadata();
  console.log(`Logo original: ${meta.width}×${meta.height}`);

  const srcBuffer = await fs.promises.readFile(SRC);

  // 1) Versão original com fundo transparente
  console.log("→ Gerar logo.png (transparente)...");
  const transparent = await removeWhiteBackground(srcBuffer);
  await fs.promises.writeFile(path.join(PUBLIC, "logo.png"), transparent);

  // 2) Recortar só o símbolo (parte superior central)
  // O símbolo ocupa aproximadamente o terço superior, centrado.
  // Vamos detectar automaticamente: símbolo está entre y=~30 e y=~ height*0.55
  const symbolHeight = Math.floor(meta.height * 0.58);  // até ~58% da altura
  const symbolWidth  = Math.floor(meta.width  * 0.40);  // ~40% da largura, centrado
  const symbolLeft   = Math.floor((meta.width - symbolWidth) / 2);

  console.log(`→ Recortar símbolo: ${symbolWidth}×${symbolHeight} em (${symbolLeft}, 0)`);
  const iconCropped = await sharp(transparent)
    .extract({ left: symbolLeft, top: 0, width: symbolWidth, height: symbolHeight })
    .trim()  // recorta excesso transparente
    .png()
    .toBuffer();

  await fs.promises.writeFile(path.join(PUBLIC, "logo-icon.png"), iconCropped);
  console.log("✔ logo-icon.png criado");

  // 3) Versão branca (preto invertido) para fundos escuros
  console.log("→ Gerar logo-white.png (preto → branco)...");
  const whiteFull = await blackToWhite(transparent);
  await fs.promises.writeFile(path.join(PUBLIC, "logo-white.png"), whiteFull);

  // 4) Ícone branco
  console.log("→ Gerar logo-icon-white.png...");
  const whiteIcon = await blackToWhite(iconCropped);
  await fs.promises.writeFile(path.join(PUBLIC, "logo-icon-white.png"), whiteIcon);

  console.log("\n✔ Tudo gerado com sucesso!");
  console.log("  /public/logo.png");
  console.log("  /public/logo-icon.png");
  console.log("  /public/logo-white.png");
  console.log("  /public/logo-icon-white.png");
}

main().catch((err) => {
  console.error("Erro:", err);
  process.exit(1);
});
