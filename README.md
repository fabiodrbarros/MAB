# Manuel Amorim Barros, Lda.

Website oficial — construção, engenharia e imobiliária em Arcos de Valdevez.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion.

---

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Admin

URL: [http://localhost:3000/mab-guest-admin](http://localhost:3000/mab-guest-admin)

Credenciais padrão (alterar via `.env.local`):
- Utilizador: `admin`
- Palavra-passe: `mab2026`

---

## Deploy (Docker)

Ver [DEPLOY.md](./DEPLOY.md) para instruções completas.

```bash
cp .env.example .env
# editar .env com credenciais reais
docker compose up -d --build
```

---

## Estrutura

```
src/
├── app/                  # páginas (App Router) + API routes
│   ├── api/              # endpoints REST
│   ├── admin/            # painel de gestão
│   └── ...               # páginas públicas
├── components/
│   ├── layout/           # header, footer
│   ├── sections/         # secções reutilizáveis das páginas
│   ├── ui/               # componentes pequenos (logo, botões, etc.)
│   └── admin/            # componentes específicos do admin
├── data/                 # constantes de UI estáticas
├── lib/                  # helpers (storage, auth, utils)
└── middleware.ts         # proteção das rotas /mab-guest-admin e API writes

data/                     # JSON persistente (propriedades, projetos)
public/uploads/           # imagens carregadas via admin
scripts/                  # utilitários (processar logo, etc.)
```

---

## Conteúdos editáveis

| Tipo | Onde |
|---|---|
| Propriedades        | `/mab-guest-admin/imobiliaria` → guardadas em `data/properties.json` |
| Projetos            | `/mab-guest-admin/projetos`    → guardados em `data/projects.json`   |
| Imagens             | Upload via admin     → ficam em `public/uploads/`           |
| Texto das secções   | Diretamente nos componentes em `src/components/sections/`  |
