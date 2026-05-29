/**
 * Gera os favicons a partir do logo-icon.png (símbolo MAB).
 *
 * Resultado: ícone quadrado com fundo escuro (brand-dark) e o símbolo
 * preto/laranja centrado — fica visível em qualquer tema do browser.
 *
 * Uso:  node scripts/generate-favicon.js
 */
const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const SRC      = path.join(__dirname, "..", "public", "logo-icon.png");
const APP_DIR  = path.join(__dirname, "..", "src", "app");
const PUBLIC   = path.join(__dirname, "..", "public");

const BG = { r: 26, g: 26, b: 26, alpha: 1 }; // brand-black (#1a1a1a)

async function makeFavicon(size, padding) {
  const inner = size - padding * 2;
  // 1. Redimensionar o símbolo mantendo proporção
  // 2. Compor sobre um canvas quadrado com BG escuro
  const resized = await sharp(SRC)
    .resize({
      width: inner, height: inner,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: resized, top: padding, left: padding }])
    .png()
    .toBuffer();
}

(async () => {
  if (!fs.existsSync(SRC)) {
    console.error("✘ logo-icon.png não encontrado em /public");
    process.exit(1);
  }

  console.log("→ A gerar favicons a partir de logo-icon.png...");

  // 512×512 — favicon principal (Next.js serve em /icon)
  await fs.promises.writeFile(
    path.join(APP_DIR, "icon.png"),
    await makeFavicon(512, 56)
  );
  console.log("✔ src/app/icon.png (512×512)");

  // 180×180 — apple touch icon
  await fs.promises.writeFile(
    path.join(APP_DIR, "apple-icon.png"),
    await makeFavicon(180, 20)
  );
  console.log("✔ src/app/apple-icon.png (180×180)");

  // 32×32 — favicon clássico para o /public
  await fs.promises.writeFile(
    path.join(PUBLIC, "favicon-32x32.png"),
    await makeFavicon(32, 3)
  );
  console.log("✔ public/favicon-32x32.png");

  console.log("\n✔ Concluído!");
})();
