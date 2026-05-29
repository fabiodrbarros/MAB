# Deploy — Manuel Amorim Barros

Guia para correr o website numa VM via Docker.

---

## 1. Pré-requisitos na VM

- **Docker** (≥ 24)
- **docker compose** (v2)
- Porta **3000** disponível (ou redirecionada via reverse proxy)

Instalar Docker no Ubuntu:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# logout / login para aplicar
```

---

## 2. Obter o código

```bash
git clone https://github.com/fabiodrbarros/MAB.git
cd MAB
```

---

## 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
nano .env
```

**Obrigatório alterar:**

| Variável | Descrição |
|---|---|
| `ADMIN_USERNAME`    | Utilizador do painel /mab-gest-admi |
| `ADMIN_PASSWORD`    | Palavra-passe forte |
| `ADMIN_SESSION_KEY` | String aleatória de pelo menos 32 caracteres |

**Gerar uma chave de sessão segura:**
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```
ou:
```bash
openssl rand -hex 48
```

---

## 4. Build + arranque

```bash
docker compose up -d --build
```

Verificar:
```bash
docker compose ps
docker compose logs -f mab-website
```

Aceder:
- **Site público**: `http://IP_DA_VM:3000`
- **Admin**:       `http://IP_DA_VM:3000/mab-gest-admi`

---

## 5. Persistência

Os volumes garantem que os dados sobrevivem a `docker compose down`:

| Volume host                | Container             | Conteúdo                         |
|----------------------------|-----------------------|----------------------------------|
| `./data`                   | `/app/data`           | JSON de propriedades/projetos    |
| `./public/uploads`         | `/app/public/uploads` | Imagens carregadas via admin     |

**Backup recomendado:**
```bash
tar czvf backup-$(date +%F).tar.gz data public/uploads
```

---

## 6. Atualizações

Sempre que houver alterações de código:

```bash
cd MAB
git pull
docker compose up -d --build
```

O Docker reconstroi a imagem e reinicia o container sem perder os volumes.

---

## 7. Reverse proxy (recomendado em produção)

Para servir em `https://manuelamorimbarros.pt` em vez de `:3000`,
configurar **Nginx** ou **Caddy** à frente do container.

### Caddyfile (mais simples):
```caddy
manuelamorimbarros.pt {
    reverse_proxy localhost:3000
}
```

Caddy gere automaticamente o certificado SSL via Let's Encrypt.

### Nginx (alternativa):
```nginx
server {
    listen 80;
    server_name manuelamorimbarros.pt;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
(Adicionar SSL via certbot.)

---

## 8. Comandos úteis

```bash
# parar
docker compose down

# parar e remover volumes (CUIDADO: apaga dados)
docker compose down -v

# rebuild forçado (sem cache)
docker compose build --no-cache

# ver logs em tempo real
docker compose logs -f

# entrar no container
docker compose exec mab-website sh

# ver consumo
docker stats mab-website
```

---

## 9. Troubleshooting

**Erro de permissões em `/app/public/uploads`:**
```bash
sudo chown -R 1001:1001 public/uploads data
```
(o container corre como UID 1001 — `nextjs`)

**Porta 3000 já em uso:**
Mudar a porta no `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"   # site fica em http://IP:8080
```
