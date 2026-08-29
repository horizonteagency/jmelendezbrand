# GUÍA DE PUBLICACIÓN — JMELENDEZBRAND

## Arquitectura definitiva de recuperación

**Hosting:** GitHub Pages  
**Dominio/DNS:** Cloudflare  
**Panel gráfico:** Pages CMS  
**Fuente maestra:** repositorio GitHub  

Esta combinación mantiene el coste de hosting en $0 y evita que el sitio dependa de una sesión de ChatGPT Work.

## Flujo normal después de publicar

1. Entras a Pages CMS.
2. Añades o editas contenido.
3. Guardas.
4. Pages CMS escribe el cambio en GitHub.
5. GitHub Pages actualiza el sitio.

No tienes que editar HTML para publicar un nuevo proyecto o recurso.

## Respaldo recomendado

Una vez al mes:
GitHub → Code → Download ZIP.

Adicionalmente, puedes crear una Release en GitHub cuando cierres una versión importante, por ejemplo:
`v1.1`, `v1.2`, `v2.0`.

Así tendrás puntos de restauración independientes de ChatGPT, Pages CMS y tu computadora.
