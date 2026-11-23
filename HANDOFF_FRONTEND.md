# DOCUMENTO DE TRASPASO TÉCNICO Y DE DISEÑO FRONTEND
**Proyecto:** Web Oficial Asociación Enlacemos Nuestras Manos  
**Dominio de Producción:** [enlacemosnuestrasmanos.org](https://enlacemosnuestrasmanos.org/) (y versión en catalán [/ca/](https://enlacemosnuestrasmanos.org/ca/))  
**Repositorio GitHub:** [isaac-velcar/web-enlacemos-nuestras-manos](https://github.com/isaac-velcar/web-enlacemos-nuestras-manos) (`main`)  
**Fecha de Emisión:** 24 de Noviembre de 2026  
**Versión de Producción:** v1.7  

---

> [!IMPORTANT]
> Este documento está dividido en dos partes complementarias:
> 1. **Parte 1 (Humana):** Explicación contextual, diseño, neuromarketing, compromisos estéticos, SEO y gestión de accesos.
> 2. **Parte 2 (Agente IA):** Especificación técnica formal, tokens CSS exactos, comandos de compilación/minificación, contratos de desbordamiento cero, conectores de analítica (Cloudflare y GA4) y checklist de validación pre/post despliegue.

---

# PARTE 1: GUÍA EJECUTIVA Y DE DISEÑO (PARA EL COMPAÑERO HUMANO)

Bienvenido al frontend de **Enlacemos Nuestras Manos**. La web representa la labor social, solidaria y comunitaria vinculada a la **Iglesia Evangélica Ebenezer** en el corazón del barrio de la Sagrada Família (Barcelona). Atendemos a personas y familias vulnerables mediante reparto de alimentos, ropero solidario, podología sanitaria, formación sociolaboral y apoyo personal.

El objetivo visual de esta web es transmitir **dignidad, calidez humana, rigor institucional y transparencia**, alejándose de cualquier estética estridente, comercial o descuidada.

---

## 1. Resumen de Todo lo Realizado Hoy (Hitos Completados)

Durante la sesión de trabajo intensiva de hoy se ha acometido una modernización integral del sitio:

1. **Reestructuración de la Cabecera y Navegación:**
   - **Retirada del enlace "Inicio / Inici":** El logotipo corporativo ya ejerce la función de retorno a la home. Suprimir ese botón liberó espacio horizontal crítico, equilibró la barra y evitó la saturación del menú en pantallas de escritorio y portátiles.
   - **Eliminación de duplicidades:** Se retiró el selector de idioma redundante que existía en la topbar superior, dejando un único conmutador limpio `ES | CA` en el menú principal.

2. **Sustitución de la Card Hero por el "Panel Activo de Servicio y Próximas Citas":**
   - Se eliminó una tarjeta central con transiciones automáticas que resultaba pesada y poco útil.
   - En su lugar se diseñó un **panel de servicio público** que informa en tiempo real de los horarios clave: **Alimentos** (Miércoles 09:00 - 12:30), **Ropero y Acogida** (2º Viernes de mes 16:00 - 19:00), con pastilla dinámica de estado ("Hoy Abierto" / "Próxima cita") y botón directo para solicitar cita o consultar el calendario.

3. **Corrección Radical del Responsive y Desbordamiento en Móvil:**
   - **Diagnóstico del fallo:** En teléfonos móviles la web permitía desplazarse lateralmente dejando una franja blanca vacía en el lateral derecho al hacer scroll o zoom hacia fuera. La causa raíz era la cabecera: el logo + el nombre de la asociación en una sola línea inflexible (`white-space: nowrap`) sumaba un ancho mínimo forzado de 477px, desbordando pantallas de 320px a 390px.
   - **Solución implementada:** Se aplicó `overflow-x: hidden` a nivel de raíz (`html`), se permitió el quiebre responsivo del título institucional en móviles y se reajustaron márgenes. El desbordamiento actual es de **0 px exactos** en cualquier resolución móvil.

4. **Rediseño Corporativo y Neuromarketing:**
   - Se definió una paleta basada en psicología del color para ONGs:
     - **Carmesí Fraterno (`#C81D25`):** Pasión solidaria, cercanía humana y dignidad institucional.
     - **Melocotón / Arcilla Cálida (`#E07A5F` / `#F4A261`):** Calidez, empatía y acogida.
     - **Azul Pizarra Noche (`#0F172A` - `#1E293B`):** Estabilidad, seriedad institucional y descanso visual.
   - **Transformación de la Card de Identidad (`#nosotros`):** Se sustituyó el antiguo bloque de fondo rojo brillante por un degradado Azul Pizarra Noche con tipografía blanca y slate. Esto erradicó la sensación de "alarma" visual y equilibró la sección con el hero oscuro y el footer.
   - **Depuración de bordes:** Se eliminaron bordes rosáceos discordantes en los botones de "Primera Acogida" y "Red Comunitaria", dejando un marco neutro limpio y un acento carmesí refinado.

5. **Traducción y Soporte Bilingüe Pleno (Catalán `/ca/`):**
   - Se tradujo la totalidad de los contenidos al catalán natural (*Associació Enllacem les Nostres Mans*), incluyendo modales, formularios, atributos `alt` de imágenes y avisos legales.
   - Rutas absolutas (`/img/...`, `/styles.min.css`) para evitar enlaces rotos en el subdirectorio `/ca/`.

6. **Infraestructura Legal y SEO Técnico:**
   - Creación de páginas dedicadas e indexables: `aviso-legal.html`, `politica-privacidad.html`, `politica-cookies.html` (y sus homólogas en `/ca/`).
   - Implementación de etiquetas bidireccionales `rel="alternate" hreflang="es"` y `hreflang="ca"` más `x-default`.
   - `sitemap.xml` bilingüe y `robots.txt` optimizado.
   - Datos estructurados Schema.org (`NGO`, `SocialSupportCenter`) enriquecidos con coordenadas, teléfono, horarios y catálogo de servicios.

7. **Pipeline de Rendimiento y Despliegue:**
   - Minificación automática de CSS y JS.
   - Control de caché estricto mediante versionado (`?v=1.7`).
   - Despliegue automático vía GitHub Pages y purga instantánea en Cloudflare CDN.

---

## 2. Compromisos y Criterios Estéticos para el Futuro

Para que el frontend mantenga el mismo nivel de excelencia, todo cambio futuro debe respetar estas reglas:

* **Ritmo visual de fondos por sección:**
  1. Hero (`#inicio`): Oscuro institucional (`#140205` / degradado vino profundo).
  2. Métricas (`.stats-bar`): Blanco neutro.
  3. Identidad (`#nosotros`): Fondo lino cálido (`#FDFBF9`) con card destacada en Azul Pizarra (`#0F172A`).
  4. Proyectos (`#proyectos`): Blanco neutro.
  5. Colaboradores (`#colaboradores`): Lino grisáceo suave (`#F8FAFC`).
  6. Actividades (`#actividades`): Azul Pizarra Noche profundo (`#0F172A`).
  7. Contacto (`#contacto`): Blanco neutro con panel de servicio en contraste.
  8. Footer: Azul oscuro profundo (`#0B1120`).
* **Jerarquía cromática en cards:** No uses colores saturados primarios como fondos de contenedores grandes (>300px). El rojo carmesí se reserva para botones principales (CTA), badges de alta prioridad, acentos de 3-4px y elementos interactivos activos.
* **Consistencia semántica de proyectos:**
  - *Salud / Alimentos:* Verde Esmeralda (`#059669`).
  - *Formación / Empleo:* Azul Competencia (`#2563EB`).
  - *Internacional / Misiones:* Ámbar (`#D97706`).
  - *Comunidad / Ropero:* Púrpura Fraternidad (`#7C3AED`).
* **Tipografía:** Usar siempre `Playfair Display` para los encabezados solemnes (h1, h2) e `Inter` para subtítulos, párrafos, datos numéricos y etiquetas de servicio.
* **Regla de oro bilingüe:** Cualquier texto nuevo añadido a `index.html` **debe incorporarse de forma inmediata e idéntica** en `ca/index.html` (y en las páginas legales si aplica).

---

## 3. Cuentas, Accesos y Conectores

> [!NOTE]
> Por políticas estrictas de seguridad, ninguna contraseña privada se almacena en este repositorio ni en las conversaciones. Para cualquiera de las siguientes herramientas, **debes solicitar el acceso o invitación a Isaac**.

| Servicio | Función en el Proyecto | Identificador / Recurso | Cómo solicitar acceso a Isaac |
|---|---|---|---|
| **GitHub** | Código fuente y hosting estático (GitHub Pages) | Repositorio: `isaac-velcar/web-enlacemos-nuestras-manos` (rama `main`) | Pedir ser añadido como colaborador al repo con permisos de `push` |
| **Cloudflare** | DNS, SSL universal, cortafuegos, Web Analytics y purga de caché edge | Zone ID: `b4b3ed06e15e11a1d5980c894480bde6`<br>Dominio: `enlacemosnuestrasmanos.org` | Solicitar a Isaac una API Token con permiso `Zone:Cache Purge:Edit` o invitación de miembro a la cuenta de Cloudflare |
| **Google Analytics 4** | Medición de tráfico, eventos de contacto y comportamiento de usuarios | Cuenta: `417253269`<br>Propiedad: `properties/565635086`<br>Measurement ID: `G-1ZMS4861KT` | Pedir a Isaac que añada tu email de Google como usuario con rol "Analista" o "Editor" en GA4 |
| **Google Tag Manager** | Contenedor de etiquetas y consent mode | Contenedor ID: `GTM-P6SK82MS` | Pedir invitación como usuario con rol "Lectura" o "Publicación" |
| **Google Search Console** | Indexación, sitemap, rendimiento de búsqueda orgánica | Dominio verificado: `enlacemosnuestrasmanos.org` | Pedir a Isaac delegación de propiedad o permisos de consulta |

---

## 4. Cómo Analizar el Rendimiento con Analytics y Cloudflare

### A. Google Analytics 4 (GA4)
El sitio tiene implementada una capa de medición de alta precisión en `script.js` sincronizada con el banner de cookies (Consent Mode v2).

* **Dónde ver los datos en tiempo real:**
  1. Entra en [analytics.google.com](https://analytics.google.com/) con la cuenta autorizada.
  2. Selecciona la propiedad **"ONG enlacemos nuestras manos" (565635086)**.
  3. Ve a **Informes > Tiempo real**.
* **Eventos clave ya configurados que debes vigilar:**
  - `click_telefono`: Clics en el teléfono directo de atención social.
  - `click_email`: Consultas enviadas por correo electrónico.
  - `click_maps`: Clics para abrir la dirección en Google Maps.
  - `click_instagram`: Visitas a la red social oficial.
  - `submit_formulario`: Envíos del formulario de contacto o voluntariado.
  - `cambio_pestana` y `ver_galeria`: Interacción con proyectos y visualizador de imágenes.

### B. Cloudflare Web Analytics y Edge Metrics
Cloudflare ofrece telemetría sin cookies y métricas de seguridad en el borde:
1. Accede a [dash.cloudflare.com](https://dash.cloudflare.com/) > `enlacemosnuestrasmanos.org`.
2. **Analytics & Logs > Web Traffic:** Muestra peticiones totales, ancho de banda servido desde caché (debe ser >85-90%) y visitas de bots.
3. **Core Web Vitals:** Verifica LCP (Largest Contentful Paint < 2.5s), FID/INP (< 200ms) y CLS (< 0.1).

---

# PARTE 2: ESPECIFICACIÓN TÉCNICA FORMAL (PARA AGENTES DE IA)

```yaml
system_metadata:
  target_project: "web-enlacemos-nuestras-manos"
  workspace_path: "C:\\Users\\isaac\\Desktop\\web-enlacemos-nuestras-manos"
  git_remote: "https://github.com/isaac-velcar/web-enlacemos-nuestras-manos.git"
  production_branch: "main"
  hosting_provider: "GitHub Pages (Root /)"
  cdn_proxy: "Cloudflare"
  cloudflare_zone_id: "b4b3ed06e15e11a1d5980c894480bde6"
  cache_busting_version: "v1.7"
  ga4_property_id: "565635086"
  ga4_measurement_id: "G-1ZMS4861KT"
  gtm_container_id: "GTM-P6SK82MS"
```

## 1. Tokens de Diseño CSS (Contrato Inmutable)

Todo nuevo componente o refactorización visual debe usar estrictamente las variables CSS declaradas en `:root` dentro de `styles.css`:

```css
:root {
  /* Marca Corporativa Primaria (Carmesí Fraterno) */
  --primary: #C81D25;
  --primary-hover: #A8141B;
  --primary-dark: #880E14;
  --primary-light: #FBEAEB;
  --primary-subtle: #FFF5F5;
  --primary-border: #F3C2C5;

  /* Marca Secundaria (Melocotón / Arcilla Cálida) */
  --secondary: #E07A5F;
  --secondary-hover: #CC654A;
  --secondary-light: #F4A261;
  --secondary-subtle: #FFF7ED;
  --secondary-border: #FED7AA;

  /* Fondos y Superficies */
  --bg-dark: #0F172A;        /* Azul Pizarra Noche (para cards oscuras y hero/actividades) */
  --bg-darker: #0B1120;      /* Footer y fondos profundos */
  --bg-light: #FFFFFF;       /* Contenedores y secciones claras estándar */
  --bg-alt: #F8FAFC;         /* Lino pizarra claro (colaboradores y alternancias) */
  --bg-warm: #FDFBF9;        /* Lino cálido de fondo (#nosotros) */

  /* Textos */
  --text-primary: #1E293B;   /* Encabezados y texto de alto contraste */
  --text-secondary: #475569; /* Cuerpo de párrafo principal */
  --text-muted: #64748B;     /* Metadatos, fechas, notas secundarias */
  --text-light: #F8FAFC;     /* Texto sobre fondos oscuros */
  --text-slate: #CBD5E1;     /* Texto secundario sobre fondos oscuros */

  /* Bordes y Sombras */
  --border-light: #E2E8F0;   /* Borde estándar para tarjetas y divisores */
  --border-subtle: #F1F5F9;  /* Divisores internos suaves */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Acentos Semánticos por Categoría de Proyecto */
  --accent-health: #059669;
  --accent-health-subtle: #ECFDF5;
  --accent-health-border: #A7F3D0;

  --accent-training: #2563EB;
  --accent-training-subtle: #EFF6FF;
  --accent-training-border: #BFDBFE;

  --accent-intl: #D97706;
  --accent-intl-subtle: #FFFBEB;
  --accent-intl-border: #FDE68A;

  --accent-comm: #7C3AED;
  --accent-comm-subtle: #FAF5FF;
  --accent-comm-border: #DDD6FE;
}
```

---

## 2. Contrato de Cero Desbordamiento Horizontal (Mobile Viewport)

**Regla Inquebrantable:** `document.documentElement.scrollWidth <= window.innerWidth` en todas las resoluciones (320px, 360px, 375px, 390px, 412px, 768px, 1024px, 1280px).

Para garantizar esto:
1. El elemento `html` posee `overflow-x: hidden; width: 100%; max-width: 100vw;`.
2. Las clases `.site-header`, `.header-container` y `.brand-link` **NUNCA** deben tener anchos fijos (`width: Xpx`), `white-space: nowrap` forzado en títulos de más de 10 caracteres, ni `flex-shrink: 0` que impida la contracción.
3. Los contenedores usan `box-sizing: border-box;` y anchos fluidos `width: 100%; max-width: 1200px; padding: 0 20px;`.
4. El script de validación pre-commit en DevTools o emulador debe devolver `diff <= 0`:
```javascript
(() => {
  const diff = document.documentElement.scrollWidth - window.innerWidth;
  if (diff > 0) throw new Error(`OVERFLOW DETECTED: ${diff}px`);
  return { status: "PASS", innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth };
})();
```

---

## 3. Pipeline de Compilación, Minificación y Despliegue

Cada cambio en código fuente (`styles.css` o `script.js`) requiere ejecutar el pipeline estricto de 4 pasos:

### Paso 1: Minificación
Ejecutar desde PowerShell en la raíz del repositorio:
```powershell
# Minificar CSS
npx clean-css-cli "C:\Users\isaac\Desktop\web-enlacemos-nuestras-manos\styles.css" -o "C:\Users\isaac\Desktop\web-enlacemos-nuestras-manos\styles.min.css"

# Minificar JS
npx terser "C:\Users\isaac\Desktop\web-enlacemos-nuestras-manos\script.js" -o "C:\Users\isaac\Desktop\web-enlacemos-nuestras-manos\script.min.js" -c -m
```

### Paso 2: Incremento de Versión (Cache Busting)
Al actualizar archivos minificados, incrementar el parámetro de versión `?v=1.x` en los 8 archivos HTML:
- `index.html`
- `aviso-legal.html`
- `politica-privacidad.html`
- `politica-cookies.html`
- `ca/index.html`
- `ca/avis-legal.html`
- `ca/politica-privadesa.html`
- `ca/politica-galetes.html`

Snippet de automatización en Python:
```python
import glob, re

target_v = "1.8" # Actualizar al siguiente número menor
pattern_css = re.compile(r'styles\.min\.css\?v=[0-9.]+')
pattern_js = re.compile(r'script\.min\.js\?v=[0-9.]+')

for f in glob.glob(r'C:\Users\isaac\Desktop\web-enlacemos-nuestras-manos\**\*.html', recursive=True):
    with open(f, 'r', encoding='utf-8') as fh:
        c = fh.read()
    new_c = pattern_css.sub(f'styles.min.css?v={target_v}', c)
    new_c = pattern_js.sub(f'script.min.js?v={target_v}', new_c)
    if new_c != c:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new_c)
        print(f"Updated cache bust to v={target_v} in {f}")
```

### Paso 3: Git Commit & Push
```powershell
cd C:\Users\isaac\Desktop\web-enlacemos-nuestras-manos
git add -A
git commit -m "feat(scope): descripcion concisa del cambio"
git push origin main
```
*Nota:* GitHub Pages compila automáticamente en ~25 a 45 segundos tras el push.

### Paso 4: Purga de Caché en Cloudflare CDN
Una vez que GitHub Pages finaliza la compilación (comprobable verificando respuesta HTTP con el nuevo tag o esperando 35s), purgar Cloudflare:
```bash
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/b4b3ed06e15e11a1d5980c894480bde6/purge_cache" \
     -H "Authorization: Bearer <CLOUDFLARE_API_TOKEN>" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
```
*(Si no dispones del token de Cloudflare, solicitar a Isaac o esperar la expiración TTL de 4 horas).*

---

## 4. Arquitectura de Analítica y Registro de Eventos

La web utiliza una técnica híbrida dual en `script.js`:

```javascript
function trackInteraction(eventName, eventDetails = {}) {
  // 1. Envío silencioso a Cloudflare Edge (GET keepalive para evitar errores 405 en hosting estático)
  try {
    const endpoint = `/api/event/${eventName}.json`;
    fetch(endpoint, { method: 'GET', keepalive: true, cache: 'no-store' }).catch(() => {});
  } catch (e) {}

  // 2. Google Analytics 4 (activo y sincronizado con gtag y dataLayer)
  const gaEventName = eventName.replace(/-/g, '_');
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', gaEventName, eventDetails);
    }
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: gaEventName }, eventDetails));
    }
  } catch (e) {}
}
```

### Catálogo de Eventos Registrados:
| Evento Web | Evento GA4 (`gaEventName`) | Parámetros Enviados | Activador |
|---|---|---|---|
| `click-telefono` | `click_telefono` | `{ telefono: "+34635095301", origen: "..." }` | Clic en cualquier enlace `tel:` |
| `click-email` | `click_email` | `{ email: "info@enlacemosnuestrasmanos.org" }` | Clic en cualquier enlace `mailto:` |
| `click-maps` | `click_maps` | `{ direccion: "Passatge de Gaiolà, 8, 12..." }` | Clic en enlace a Google Maps |
| `click-instagram` | `click_instagram` | `{ destino: "instagram.com/..." }` | Clic en enlace a red social |
| `submit-formulario`| `submit_formulario` | `{ tipo: "contacto" \| "voluntariado" }` | Envío validado de formulario |
| `cambio-pestana` | `cambio_pestana` | `{ categoria: "salud" \| "formacion" \| ... }` | Filtro de proyectos por categoría |
| `ver-galeria` | `ver_galeria` | `{ imagen: "...", indice: 1 }` | Apertura de lightbox/modal de imagen |

### Consulta Programática vía Google Analytics MCP:
Si el agente dispone del servidor MCP `google-analytics-mcp`:
```json
{
  "ServerName": "google-analytics-mcp",
  "ToolName": "run_realtime_report",
  "Arguments": {
    "property_id": "565635086",
    "dimensions": ["country", "unifiedScreenName"],
    "metrics": ["activeUsers", "eventCount"]
  }
}
```

---

## 5. Checklist de Verificación para Agentes (Pre & Post Despliegue)

Antes de dar por finalizada cualquier tarea en este repositorio, el agente **DEBE** verificar:

1. [ ] **Consistencia Bilingüe:** Si se editó `index.html`, ¿se editó su equivalente en `ca/index.html`?
2. [ ] **Rutas Absolutas en Catalán:** ¿Todas las imágenes y enlaces estáticos en `/ca/` apuntan a rutas absolutas (ej. `/img/logo.webp`, `/styles.min.css`) y no a relativas (`img/logo.webp`)?
3. [ ] **Minificación:** ¿Se compilaron `styles.min.css` y `script.min.js` a partir de sus fuentes?
4. [ ] **Busting de Versión:** ¿Coincide el parámetro `?v=X.Y` en todos los archivos HTML?
5. [ ] **Auditoría de Desbordamiento:** En Chrome DevTools (o MCP), emular `360x740` y `390x844`. Ejecutar `document.documentElement.scrollWidth - window.innerWidth`. El resultado **debe ser <= 0**.
6. [ ] **Inspección Visual de Contrastes:** Ninguna card o bloque de texto debe tener fondos que resten legibilidad (< 4.5:1 en texto regular, < 3.0:1 en títulos grandes).
7. [ ] **Validación de Enlaces Legales:** Comprobar que el modal legal y las páginas dedicadas (`aviso-legal.html`, `ca/avis-legal.html`) abren sin errores 404.
