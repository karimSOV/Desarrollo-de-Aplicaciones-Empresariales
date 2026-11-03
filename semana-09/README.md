# Semana 9 — ReactJS: cartelera de CineLab

Página de cartelera de un cine hecha con **React + Vite**. Usa las mismas
películas y pósters del catálogo CineLab de la semana 7, guardados en un
archivo de datos.

## Cómo ejecutarlo

Requiere Node.js 20 o superior.

```powershell
cd semana-09
npm install
npm run dev
```

Luego abrir <http://localhost:5173/>.

Otros comandos: `npm run build` (versión de producción en `dist/`) y
`npm run lint` (revisión del código con oxlint).

## Estructura

```text
semana-09/
├── index.html
├── public/
│   ├── favicon.svg
│   └── posters/            pósters de las 10 películas
└── src/
    ├── main.jsx            punto de entrada
    ├── App.jsx             compone la página
    ├── components/         una carpeta por componente (JSX + CSS)
    │   ├── Header/
    │   ├── Hero/
    │   ├── MovieList/
    │   ├── MovieCard/
    │   └── Footer/
    ├── data/
    │   └── movies.js       datos del cine y cartelera
    └── styles/
        ├── variables.css   colores y medidas
        └── global.css      estilos base, botones y etiquetas
```

## Recorte en componentes

| Componente | Responsabilidad | Props que recibe |
| --- | --- | --- |
| `App` | Toma los datos, guarda con `useState` la película elegida y arma la página | — |
| `Header` | Nombre del cine y navegación | `cinemaName` |
| `Hero` | Banner de la película destacada o de la elegida en la cartelera | `movie` |
| `MovieList` | Recorre la cartelera con `map` y usa `key={movie.id}` | `movies`, `selectedId`, `onSelectMovie` |
| `MovieCard` | Imagen, título, valoración y horarios; al hacer clic en el póster avisa a `App` | `movie`, `isSelected`, `onSelect` |
| `Footer` | Contacto e información | `cinema` |

Los datos solo se importan en `App.jsx`; los hijos reciben por props lo que
necesitan y no saben de dónde vienen. Al hacer clic en un póster, `MovieCard`
llama a `onSelect`, `App` cambia la película elegida y `Hero` se vuelve a
dibujar con ella.

## Dependencias

- `react` y `react-dom` 19.
- Desarrollo: `vite` 8, `@vitejs/plugin-react` y `oxlint`.
