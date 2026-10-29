/* ==========================================================================
   main.js — Punto de arranque de la app.
   Se ejecuta al final, después de que todos los módulos (config, utils,
   models, views, controllers) ya están cargados y disponibles en el ámbito
   global. Aplica el tema guardado, construye el sidebar y pinta la primera
   página.
   ========================================================================== */

if (DATA.settings.darkMode) document.documentElement.setAttribute('data-theme', 'dark');
buildNav();
renderPage();
