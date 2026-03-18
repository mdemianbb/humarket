# Humarket 🛒

Marketplace de Apps de Partners para Humand.

## Stack

- **Next.js 14** (App Router + TypeScript)
- **Supabase** (base de datos + panel visual para cargar datos)
- **Tailwind CSS**

---

## Setup inicial (Brian)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Ir a [supabase.com](https://supabase.com) y crear una cuenta gratuita
2. Crear un nuevo proyecto (guardá la contraseña)
3. Ir a **SQL Editor** → **New query**
4. Pegar el contenido de `supabase/schema.sql` y ejecutar (▶ Run)
5. Volver a **SQL Editor** → **New query**
6. Pegar el contenido de `supabase/seed.sql` y ejecutar (▶ Run)

### 3. Variables de entorno

1. En Supabase: ir a **Settings → API**
2. Copiar **Project URL** y **anon public key**
3. En la raíz del proyecto, crear el archivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
```

### 4. Correr el proyecto

```bash
npm run dev
```

Abrir en el navegador: http://localhost:3000

---

## Cómo cargar datos fake (Matías, Rodolfo, Elder)

No necesitan tocar código. Todo se hace desde el panel de Supabase.

### Acceder al panel

1. Ir a [supabase.com](https://supabase.com) → iniciar sesión
2. Seleccionar el proyecto Humarket
3. En el menú izquierdo, hacer clic en **Table Editor**

### Tablas disponibles

| Tabla | Para qué sirve |
|-------|---------------|
| `partners` | Empresas que publican apps |
| `apps` | Apps del marketplace |
| `communities` | Empresas clientes de Humand |
| `installations` | Qué apps están activas en cada comunidad |

### Agregar una nueva app (ejemplo)

1. En Table Editor → seleccionar tabla `apps`
2. Hacer clic en **Insert row**
3. Completar los campos:
   - `partner_id`: copiar el id de un partner de la tabla `partners`
   - `name`: nombre de la app (ej: "PayFlex")
   - `description`: descripción corta
   - `category`: RRHH / Payroll / Capacitación / Beneficios / Productividad / Bienestar
   - `type`: `saas` o `service`
   - `logo_url`: URL de una imagen (opcional, podés buscar en Google Images y usar el link)
   - `price`: precio en USD
   - `price_model`: `monthly`, `per_seat`, o `commission`
   - `commission_pct`: porcentaje de comisión (si aplica)
   - `status`: poner `published` para que aparezca en el marketplace
4. Guardar

### Tip para logos

Podés usar logos reales con este formato:
```
https://img.logo.dev/DOMINIO.com?token=pk_X8lWevjHQAqHbHXEhIz5Ng
```
Por ejemplo: `https://img.logo.dev/slack.com?token=pk_X8lWevjHQAqHbHXEhIz5Ng`

---

## Estructura del proyecto

```
humarket/
├── app/
│   ├── page.tsx                        ← Landing (elige portal)
│   ├── partner/
│   │   ├── apps/page.tsx               ← Lista de apps del partner
│   │   └── apps/new/page.tsx           ← Formulario nueva app
│   └── admin/
│       ├── apps/page.tsx               ← Marketplace completo
│       └── communities/
│           ├── page.tsx                ← Lista de comunidades
│           └── [id]/page.tsx           ← Detalle + activar/desactivar apps
├── lib/
│   ├── supabase.ts                     ← Cliente de Supabase
│   └── types.ts                        ← Tipos TypeScript
└── supabase/
    ├── schema.sql                      ← Estructura de la base de datos
    └── seed.sql                        ← Datos de ejemplo
```

## URLs

| URL | Descripción |
|-----|-------------|
| `/` | Landing |
| `/partner/apps` | Portal de partners |
| `/partner/apps/new` | Publicar nueva app |
| `/admin/communities` | Back-office: comunidades |
| `/admin/apps` | Back-office: marketplace |
| `/admin/communities/[id]` | Gestionar apps de una comunidad |
