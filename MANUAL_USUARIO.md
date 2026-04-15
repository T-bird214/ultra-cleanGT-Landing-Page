# 📘 MANUAL DE USUARIO COMPLETO
## Ultra-CleanGT Landing Page
### Fedora Linux + VSCode + GitHub + Supabase + HubSpot + Vercel

---

> **Nivel:** Guía paso a paso para ejecutar, configurar y desplegar el proyecto completo.
> **Entorno:** MacBook Pro 2012 · 16GB RAM · Linux Fedora · Node v22 · npm 10.9.4

---

## ÍNDICE

1. [Preparación del entorno](#1-preparacion)
2. [Clonar y configurar el proyecto](#2-proyecto)
3. [Configurar Supabase](#3-supabase)
4. [Configurar HubSpot](#4-hubspot)
5. [Ejecutar el proyecto localmente](#5-local)
6. [Extensiones de VSCode recomendadas](#6-vscode)
7. [Flujo de trabajo con GitHub](#7-github)
8. [Desplegar en Vercel](#8-vercel)
9. [Configurar dominio ultra-cleangt.com (Zoho)](#9-dominio)
10. [Flujo de trabajo diario](#10-flujo)
11. [Solución de problemas comunes](#11-troubleshoot)

---

## 1. PREPARACIÓN DEL ENTORNO {#1-preparacion}

### 1.1 Verificar herramientas instaladas

Abre una terminal en Fedora y ejecuta:

```bash
# Verificar versiones
node --version     # Debe ser v22.x ✅
npm --version      # Debe ser 10.x ✅
git --version      # Debe ser 2.53.x ✅
code --version     # VSCode instalado ✅
```

### 1.2 Verificar SSH con GitHub

```bash
ssh -T git@github.com
# Respuesta esperada: Hi T-bird214! You've successfully authenticated
```

Si dice "Permission denied", configura la clave SSH:

```bash
# Generar nueva clave SSH (solo si no tienes)
ssh-keygen -t ed25519 -C "tu-email@gmail.com"

# Ver la clave pública para copiarla
cat ~/.ssh/id_ed25519.pub

# Luego: GitHub → Settings → SSH and GPG Keys → New SSH Key → Pegar
```

---

## 2. CLONAR Y CONFIGURAR EL PROYECTO {#2-proyecto}

### 2.1 Clonar el repositorio

```bash
# Navegar a donde quieres el proyecto
cd ~/Documentos   # o la carpeta que prefieras

# Clonar el repositorio
git clone git@github.com:T-bird214/ultra-cleanGT-Landing-Page.git

# Entrar al directorio
cd ultra-cleanGT-Landing-Page
```

### 2.2 Copiar los archivos del proyecto

Los archivos que descargaste de esta sesión van en la raíz del repositorio. La estructura debe quedar así:

```
ultra-cleanGT-Landing-Page/
├── src/
│   ├── app/
│   │   ├── api/leads/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LeadForm.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── BenefitsSection.tsx
│   │       ├── ValueSection.tsx
│   │       ├── SocialProofSection.tsx
│   │       └── CtaSection.tsx
│   ├── lib/
│   │   ├── supabase/client.ts
│   │   ├── supabase/server.ts
│   │   ├── hubspot/client.ts
│   │   └── validations/lead.ts
│   └── types/index.ts
├── supabase/migrations/001_initial_schema.sql
├── .github/workflows/ci.yml
├── public/logo.png          ← Coloca aquí el Logo-500.png
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
├── .env.local               ← NUNCA commitear
└── .env.local.example
```

### 2.3 Instalar dependencias

```bash
npm install
```

### 2.4 Configurar variables de entorno

```bash
# Copiar el template
cp .env.local.example .env.local

# Abrir en VSCode para editar
code .env.local
```

Llenar los valores en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://oilfwbelavdvlscvmpbi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY_AQUI   ← Ver sección 3

HUBSPOT_ACCESS_TOKEN=pat-na1-NUEVO_TOKEN_AQUI         ← Ver sección 4
HUBSPOT_PORTAL_ID=51347086

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Ultra-CleanGT
NOTIFICATION_EMAIL=servicios@ultra-cleangt.com
```

---

## 3. CONFIGURAR SUPABASE {#3-supabase}

### 3.1 Obtener la Service Role Key

1. Ir a: https://supabase.com/dashboard
2. Seleccionar tu proyecto: `oilfwbelavdvlscvmpbi`
3. Ir a: **Settings** (icono de engranaje) → **API**
4. Copiar el valor de: **`service_role`** (sección "Project API keys")
5. ⚠️ Esta clave tiene acceso total. NUNCA ponerla en código del frontend.
6. Pegarla en `.env.local` como `SUPABASE_SERVICE_ROLE_KEY`

### 3.2 Ejecutar la migración SQL

1. Ir a: https://supabase.com/dashboard/project/oilfwbelavdvlscvmpbi/sql/new
2. Copiar y pegar el contenido completo del archivo: `supabase/migrations/001_initial_schema.sql`
3. Hacer clic en **"Run"** (o Ctrl+Enter)
4. Verificar que no hay errores en la consola

### 3.3 Verificar la tabla

1. Ir a: **Table Editor** en el menú izquierdo
2. Debes ver la tabla `leads` con las columnas:
   - `id`, `name`, `email`, `phone`, `role`, `company`, `source`, `hubspot_id`, `metadata`, `created_at`, `updated_at`
3. ✅ RLS está activo — la tabla no es accesible desde el cliente directamente

### 3.4 (Opcional) Activar autenticación para panel admin

1. Ir a: **Authentication** → **Providers**
2. Activar **Email** provider
3. En **Settings** → **Auth** → URL Configuration:
   - Site URL: `https://www.ultra-cleangt.com`
   - Redirect URLs: `https://www.ultra-cleangt.com/auth/callback`

---

## 4. CONFIGURAR HUBSPOT {#4-hubspot}

### 4.1 ⚠️ IMPORTANTE: Rotar el token comprometido

El token anterior fue compartido en esta sesión. Debes rotarlo inmediatamente:

1. Ir a: https://app.hubspot.com/private-apps/51347086
2. Seleccionar tu Private App actual
3. Hacer clic en **"Rotate token"** → confirmar
4. Copiar el nuevo token
5. Actualizar `.env.local` con el nuevo valor

### 4.2 Verificar los scopes de la Private App

Tu Private App debe tener estos permisos. Para verificar o ajustar:

1. Ir a: HubSpot → **Settings** (engranaje) → **Integrations** → **Private Apps**
2. Seleccionar tu app → pestaña **Scopes**
3. Verificar que están marcados:
   - ✅ `crm.objects.contacts.write`
   - ✅ `crm.objects.contacts.read`
   - ✅ `crm.schemas.contacts.read`

### 4.3 Crear el Pipeline "Leads Ultra-CleanGT Web"

1. Ir a: HubSpot → **CRM** → **Contacts** → **Lifecycle Stages**
2. O ir a: **Settings** → **CRM** → **Deals** → **Pipelines**
3. Crear nuevo pipeline con nombre: `Leads Ultra-CleanGT Web`
4. Etapas sugeridas:
   - `Nuevo Lead` (entrada automática)
   - `Contactado`
   - `Diagnóstico Agendado`
   - `Propuesta Enviada`
   - `Cliente`

### 4.4 Probar la integración

Una vez el servidor local esté corriendo (sección 5), enviar un lead de prueba y verificar que aparece en HubSpot → **Contacts**.

---

## 5. EJECUTAR EL PROYECTO LOCALMENTE {#5-local}

```bash
# Desde la raíz del proyecto
npm run dev
```

Abrir en el navegador: **http://localhost:3000**

### Verificaciones

```bash
# Verificar que la API responde
curl http://localhost:3000/api/leads
# Respuesta esperada: {"status":"ok","endpoint":"/api/leads"}

# Probar envío de lead (en otra terminal)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Usuario",
    "role": "Gerente de Operaciones",
    "company": "Edificio Test GT",
    "email": "test@empresa.gt",
    "whatsapp": "+502 1234-5678"
  }'
# Respuesta esperada: {"data":{"id":"..."},"error":null,"message":"Lead registrado correctamente"}
```

Luego verificar:
1. En Supabase → **Table Editor** → `leads`: debe aparecer el registro
2. En HubSpot → **Contacts**: debe aparecer "Test Usuario" en unos segundos

---

## 6. EXTENSIONES DE VSCODE RECOMENDADAS {#6-vscode}

Ejecutar en terminal para instalar todas:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension prisma.prisma
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension eamodio.gitlens
code --install-extension ms-vsliveshare.vsliveshare
```

### Configurar VSCode para el proyecto

Crear `.vscode/settings.json` (NO se commitea):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 7. FLUJO DE TRABAJO CON GITHUB {#7-github}

### 7.1 Configurar protección de la rama main

1. Ir a: GitHub → `T-bird214/ultra-cleanGT-Landing-Page`
2. **Settings** → **Branches** → **Add branch ruleset**
3. Branch name pattern: `main`
4. Activar:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass (seleccionar: lint, test, security, build)
   - ✅ Require branches to be up to date before merging
   - ✅ Do not allow bypassing the above settings
5. **Save changes**

### 7.2 Añadir secretos de GitHub Actions

1. GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
2. Añadir:

| Nombre | Valor |
|--------|-------|
| `ANTHROPIC_API_KEY` | Tu API key de Anthropic (para AI Review) |

### 7.3 Flujo diario de trabajo

```bash
# 1. Siempre partir desde main actualizado
git checkout main
git pull origin main

# 2. Crear rama para tu cambio
git checkout -b feature/nombre-del-cambio
# Ejemplos:
# git checkout -b feature/agregar-fotos-trabajos
# git checkout -b fix/responsive-mobile-hero
# git checkout -b content/actualizar-clientes

# 3. Hacer cambios en VSCode
# ... editar archivos ...

# 4. Revisar cambios antes de commitear
git diff
git status

# 5. Commitear
git add .
git commit -m "feat: descripción clara del cambio"
# Prefijos: feat: fix: docs: style: refactor: chore:

# 6. Subir la rama
git push origin feature/nombre-del-cambio

# 7. Ir a GitHub y crear el Pull Request
# El CI se ejecutará automáticamente (lint + test + security + AI review)

# 8. Revisar el AI Code Review en el PR
# 9. Si todo pasa ✅ → Merge a main
# 10. Vercel desplegará automáticamente en ~2 minutos
```

---

## 8. DESPLEGAR EN VERCEL {#8-vercel}

### 8.1 Configurar Variables de Entorno en Vercel

1. Ir a: https://vercel.com/t-bird214/ultra-cleangt-landing-page/settings/environment-variables
2. Añadir **cada variable** de `.env.local` en el panel de Vercel:

| Variable | Entornos |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview |
| `HUBSPOT_ACCESS_TOKEN` | Production, Preview |
| `HUBSPOT_PORTAL_ID` | Production, Preview |
| `NEXT_PUBLIC_APP_URL` | Production = `https://www.ultra-cleangt.com` |
| `NOTIFICATION_EMAIL` | Production, Preview |

⚠️ `SUPABASE_SERVICE_ROLE_KEY` y `HUBSPOT_ACCESS_TOKEN` solo en Production y Preview, NO en Development.

### 8.2 Configurar Build Settings en Vercel

1. **Settings** → **Build & Development Settings**
2. Framework Preset: `Next.js` (auto-detectado)
3. Build Command: `npm run build`
4. Output Directory: `.next`
5. Install Command: `npm ci`

### 8.3 Verificar el deploy

1. Hacer un commit y push a `main`
2. Ir a Vercel → Deployments → Ver el build en tiempo real
3. Si pasa, la URL de producción se actualiza automáticamente

---

## 9. CONFIGURAR EL DOMINIO ultra-cleangt.com (Zoho) {#9-dominio}

### 9.1 Agregar dominio en Vercel

1. Vercel → **Settings** → **Domains** → **Add Domain**
2. Escribir: `www.ultra-cleangt.com`
3. Vercel mostrará registros DNS para configurar

### 9.2 Configurar DNS en Zoho

1. Ir a: https://domains.zoho.com → Mis Dominios → `ultra-cleangt.com`
2. Ir a: **DNS** → **Manage DNS Records**
3. Añadir/Modificar los registros que Vercel indica:

Para `www.ultra-cleangt.com`:
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com.
TTL: 300
```

Para el dominio raíz `ultra-cleangt.com`:
```
Tipo: A
Nombre: @
Valor: 76.76.21.21   (IP de Vercel)
TTL: 300
```

4. Guardar y esperar 5-15 minutos para propagación
5. En Vercel → Domains → Verificar que muestra ✅

### 9.3 Actualizar NEXT_PUBLIC_APP_URL

En Vercel → Environment Variables:
```
NEXT_PUBLIC_APP_URL = https://www.ultra-cleangt.com
```

---

## 10. FLUJO DE TRABAJO DIARIO {#10-flujo}

### Para añadir tus 8 fotos de trabajos reales:

1. Coloca las fotos en: `public/images/trabajos/`
2. Nombrarlas: `antes-1.jpg`, `despues-1.jpg`, `antes-2.jpg`, etc.
3. En `SocialProofSection.tsx` reemplazar las URLs de Unsplash con: `/images/trabajos/antes-1.jpg`
4. Para `CtaSection.tsx` (Before/After): usar `/images/trabajos/antes-1.jpg` y `/images/trabajos/despues-1.jpg`

### Para añadir logotipos de clientes reales (Casa de Dios, Gaura, Meraki 10):

1. Coloca los logos en: `public/images/clientes/`
2. Nombrarlos: `casa-de-dios.png`, `edificio-gaura.png`, `meraki-10.png`
3. En `SocialProofSection.tsx`, reemplaza los divs de placeholder con:
```tsx
import Image from 'next/image'
<Image src="/images/clientes/casa-de-dios.png" alt="Casa de Dios" width={140} height={50} className="h-10 w-auto object-contain" />
```

### Para ver los leads capturados:

**Opción A — Supabase Dashboard:**
1. https://supabase.com/dashboard/project/oilfwbelavdvlscvmpbi/editor
2. Ejecutar: `SELECT * FROM leads ORDER BY created_at DESC;`

**Opción B — HubSpot CRM:**
1. https://app.hubspot.com/contacts/51347086
2. Ver contactos ordenados por "Fecha de creación"

---

## 11. SOLUCIÓN DE PROBLEMAS COMUNES {#11-troubleshoot}

### Error: "Cannot find module '@supabase/ssr'"
```bash
npm install @supabase/ssr @supabase/supabase-js
```

### Error: "SUPABASE_SERVICE_ROLE_KEY is undefined"
- Verificar que `.env.local` existe en la raíz
- Verificar que el nombre de la variable es exactamente `SUPABASE_SERVICE_ROLE_KEY`
- Reiniciar el servidor: `Ctrl+C` → `npm run dev`

### Error 401 de HubSpot
- El token venció o fue rotado
- Regenerar en HubSpot → Private Apps → Rotate Token
- Actualizar `.env.local` y las variables en Vercel

### El formulario envía pero no aparece en Supabase
- Verificar en Terminal el log del servidor: busca `[Supabase] Error`
- Verificar que la migración SQL fue ejecutada correctamente
- Verificar que `SUPABASE_SERVICE_ROLE_KEY` es correcto (no la anon key)

### El formulario envía pero no aparece en HubSpot
- HubSpot tiene un delay de 10-30 segundos
- Verificar logs del servidor: busca `[HubSpot]`
- Verificar que el token tiene los scopes correctos (sección 4.2)

### Build falla en Vercel: "Module not found"
```bash
# Localmente
npm run build
# Ver el error específico y corregirlo antes de hacer push
```

### Imágenes no cargan en producción
- Verificar que `next.config.js` tiene el dominio en `remotePatterns`
- Las imágenes locales deben estar en `/public/` y referenciadas como `/nombre-imagen.png`

---

## CONTACTO DEL PROYECTO

- **Repositorio:** https://github.com/T-bird214/ultra-cleanGT-Landing-Page
- **Sitio en producción:** https://www.ultra-cleangt.com
- **Supabase:** https://supabase.com/dashboard/project/oilfwbelavdvlscvmpbi
- **HubSpot:** https://app.hubspot.com/contacts/51347086
- **Vercel:** https://vercel.com/t-bird214

---

*Manual generado para Ultra-CleanGT S.A. — Versión 1.0*
