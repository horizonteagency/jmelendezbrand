# JMELENDEZBRAND — Sitio Web v1.1 RECUPERADO

Esta versión reconstruye el sitio perdido de Work con la arquitectura estratégica aprobada para JMELENDEZBRAND.

## Qué incluye

- Sitio estático, rápido y sin coste de servidor.
- Home.
- Sobre mí.
- Proyectos / casos.
- Recursos.
- Página puente de Servicios hacia Agencia Horizonte.
- Gracias.
- 404.
- Privacidad y Términos como plantillas pendientes de completar.
- `admin.html` con acceso/instrucciones del panel.
- `.pages.yml` para Pages CMS.
- Datos editables en JSON.
- CNAME para `jmelenedezbrand.com`.
- Sitemap y robots.txt.

## Cómo funciona el panel sin código

Se usa **Pages CMS**. No necesitas instalar un CMS en tu hosting.

1. El sitio vive en GitHub.
2. Pages CMS se conecta a ese repositorio.
3. Editas proyectos, recursos y datos generales desde una interfaz gráfica.
4. Pages CMS guarda el cambio en GitHub.
5. GitHub Pages publica la nueva versión.

Los contenidos editables están en:
- `data/site.json`
- `data/projects.json`
- `data/resources.json`

Las imágenes y documentos que subas desde Pages CMS se guardan en:
- `assets/media/`

## Publicar en GitHub Pages

### 1. Crear repositorio
En GitHub crea un repositorio, por ejemplo:
`jmelenedezbrand-site`

Puede ser público. GitHub Pages en cuentas gratuitas funciona de forma sencilla con repositorios públicos.

### 2. Subir el contenido
Sube **todos los archivos que están dentro de esta carpeta** a la raíz del repositorio:
`index.html`, `.pages.yml`, `assets/`, `data/`, etc.

No subas la carpeta contenedora como un único nivel adicional.

### 3. Activar Pages
En el repositorio:
- Settings
- Pages
- Build and deployment
- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Guarda.

### 4. Conectar el dominio
En GitHub Pages, en **Custom domain**, escribe:

`jmelenedezbrand.com`

El archivo `CNAME` ya viene incluido.

### 5. DNS en Cloudflare
En Cloudflare → DNS, crea para el dominio raíz estos cuatro registros A, todos inicialmente como **DNS only**:

- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

Y para `www`:

- Tipo: CNAME
- Nombre: `www`
- Destino: `<TU_USUARIO_GITHUB>.github.io`

Cuando GitHub valide el dominio, activa **Enforce HTTPS**.

> Sustituye `<TU_USUARIO_GITHUB>` por tu usuario real de GitHub.

## Activar Pages CMS

1. Ve a `https://app.pagescms.org`
2. Inicia sesión con GitHub.
3. Instala/autoriza la GitHub App de Pages CMS en el repositorio del sitio.
4. Abre el repositorio dentro de Pages CMS.
5. Pages CMS detectará `.pages.yml`.

Tendrás un panel con:

- **Datos generales**
- **Proyectos**
- **Recursos**
- **Imágenes**
- **Documentos**

## Agregar un proyecto

En Pages CMS:

1. Gestión del sitio → Proyectos.
2. Añade un elemento.
3. Completa:
   - Nombre.
   - Categoría.
   - Año.
   - Resumen.
   - Imagen.
   - URL de Behance.
   - Rol.
   - Publicado.
   - Destacado.
4. Guarda.

El sitio lo mostrará automáticamente.

## Agregar un recurso

En Pages CMS:

1. Gestión del sitio → Recursos.
2. Añade un elemento.
3. Sube PDF/documento desde el campo Archivo.
4. Activa Publicado.
5. Activa Destacado si quieres que aparezca en Home.
6. Guarda.

## Checklist Antes del Logo

La tarjeta inicial ya está creada en `data/resources.json`, pero el PDF no se incluye en este ZIP recuperado porque el archivo original no formaba parte del Work recuperable.

Para activarlo:
1. Pages CMS → Recursos → Checklist Antes del Logo.
2. En Archivo o enlace, sube el PDF.
3. Cambia CTA a `Descargar checklist`.
4. Guarda.

## Conectar newsletter

En:
Pages CMS → Datos generales → URL del formulario/newsletter

Pega la URL de tu formulario o endpoint de Systeme.io/MailerLite/otra plataforma cuando lo tengas.

Mientras esté vacío, el formulario del Home no envía datos y muestra un aviso.

## Conectar Agencia Horizonte

En:
Pages CMS → Datos generales → URL Agencia Horizonte

Pega allí la landing o sitio de Horizonte. Los botones de Servicios quedarán activos automáticamente.

## Editar enlaces sociales

Pages CMS → Datos generales:
- Instagram
- LinkedIn
- YouTube
- Behance

Los enlaces vacíos no aparecen en el footer.

## Vista local

Por seguridad del navegador, los JSON no siempre cargan correctamente si abres `index.html` directamente como `file://`.

Para verlo localmente:
- súbelo a GitHub Pages, o
- usa un servidor local sencillo.

En GitHub Pages funciona sin pasos de compilación.

## Qué NO depende ya de Work

A partir de esta versión:
- GitHub es la fuente maestra.
- Cada edición queda registrada en el historial de Git.
- Puedes descargar el repositorio como ZIP en cualquier momento.
- Pages CMS solo es el panel de edición; si dejara de funcionar, el sitio y los contenidos siguen en GitHub.

## Pendientes antes de lanzamiento comercial

- Añadir tus proyectos reales y enlaces Behance.
- Subir el PDF final del Checklist.
- Completar email y redes.
- Pegar URL de Agencia Horizonte.
- Conectar newsletter.
- Completar Privacidad/Términos con los datos legales aplicables.
