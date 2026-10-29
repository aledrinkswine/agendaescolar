# Agenda Escolar Acoandes

Web app de agenda estudiantil para el Colegio Acoandes. Sin build, sin
dependencias de npm — HTML/CSS/JS plano organizado en arquitectura **MVC**.
Se puede abrir directamente con doble clic sobre cualquiera de los `.html`
(no requiere servidor) o servirse con cualquier servidor estático.

## Páginas

| Archivo | Qué es |
|---|---|
| `index.html` | Landing pública — punto de entrada del sitio |
| `login.html` | Inicio de sesión — redirige a `app.html` |
| `app.html` | La aplicación (el SPA de la agenda en sí) |

## Estructura

```
index.html                 # landing pública
login.html                 # inicio de sesión
app.html                    # shell de la app: sidebar, header, contenedores vacíos
css/
  marketing.css              # landing + login (hero oscuro, tipografía serif)
  tokens.css                # variables de color, tipografía, radios, sombras (claro/oscuro)
  layout.css                # armazón: sidebar, header, mobile menu
  components.css            # piezas reutilizables: cards, botones, listas, modal
  pages.css                 # estilos propios de cada página
  responsive.css            # breakpoints de tablet/móvil
js/
  config/                   # datos estáticos: SUBJECTS, NAV_GROUPS, ICONS…
  utils/                    # funciones puras compartidas (fechas, ids, etc.)
  models/       *.model.js  # única fuente de verdad: leen/escriben DATA y localStorage
  views/        *.view.js   # funciones puras que devuelven HTML a partir del Model
  controllers/  *.controller.js  # responden a clics/eventos, llaman al Model y re-renderizan
  main.js                   # bootstrap: aplica tema, construye el nav, pinta la 1ª página
assets/
  logo-acoandes.png
```

## Cómo fluyen los datos

1. Un clic en la UI llama a una función de **controller** (ej. `deleteTask(id)`).
2. El controller llama al **model** correspondiente (`TaskModel.remove(id)`),
   que muta la variable global `DATA` — la única fuente de verdad, respaldada
   en `localStorage` vía `saveData()`.
3. El controller pide un nuevo render (`renderPage()`), que delega en la
   **view** de la página activa (`renderTareas()`), la cual vuelve a leer del
   model (`TaskModel.filtered(...)`) para construir el HTML actualizado.

No hay build ni módulos ES — todos los `<script>` son clásicos y comparten un
mismo ámbito global, cargados en `app.html` en orden de dependencia
(config → utils → models → views → controllers → main). Esto es intencional:
mantiene la app abrible con doble clic sin servidor, algo que un bundler o
`type="module"` rompería (los módulos ES no cargan sobre `file://`).

## Datos de ejemplo

Los datos son de ejemplo y se generan en `js/models/store.model.js`
(`getDefaultData()`) la primera vez que se abre la app; después viven en
`localStorage` bajo la llave `acoandes_agenda_v1`. "Configuración → Datos →
Restablecer" los borra y vuelve a generar los de ejemplo.
