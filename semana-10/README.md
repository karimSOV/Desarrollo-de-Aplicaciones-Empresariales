# Semana 10 — ReactJS: componentes reutilizables, estado y eventos

Continuación de la cartelera de CineLab de la [semana 9](../semana-09). Se
agregan un botón reutilizable, las películas favoritas, un buscador con
retardo dentro del banner, el estado vacío y el guardado de las favoritas en
el navegador.

## Cómo ejecutarlo

Requiere Node.js 20 o superior.

```powershell
cd semana-10
npm install
npm run dev
```

Luego abrir <http://localhost:5173/>.

Otros comandos: `npm run build` (versión de producción en `dist/`) y
`npm run lint` (revisión del código con oxlint).

## Estructura

```text
semana-10/
├── index.html
├── public/posters/         pósters de las 10 películas
└── src/
    ├── main.jsx
    ├── App.jsx             estado de la aplicación y composición
    ├── components/
    │   ├── Button/         botón reutilizable (children + variant)
    │   ├── Header/
    │   ├── Hero/           banner; recibe el buscador por children
    │   ├── MovieSearch/    buscador como entrada controlada
    │   ├── MovieList/      filtra la cartelera y dibuja el estado vacío
    │   ├── MovieCard/      tarjeta con el botón de favorita
    │   └── Footer/
    ├── hooks/
    │   └── useDebounce.js  retardo del buscador
    ├── data/movies.js
    └── styles/
        ├── variables.css
        └── global.css      base, tipografía, formularios y utilidades
```

## Componente reutilizable: Button

`Button` recibe el texto por `children` y el aspecto por la prop `variant`.
El mismo componente se usa en tres lugares con props distintas:

| Dónde | Uso | Variante |
| --- | --- | --- |
| `MovieSearch` | Botón «Buscar» del banner (`type="submit"`) | `primary` |
| `MovieCard` | Botón de favorita, con `pressed` para mostrar su estado | `favorite` |
| `MovieList` | «Ver toda la cartelera» en el estado vacío | `soft` |

## Qué datos recuerda la aplicación y dónde viven

| Dato | Componente | Por qué |
| --- | --- | --- |
| `selectedMovie` (película del banner) | `App` | La usa `Hero` y la cambia `MovieCard`; vive en el padre común |
| `favoriteIds` (favoritas) | `App`, guardado en `localStorage` | Lo cambia `MovieCard` y lo leen `MovieList` y `MovieCard`; se guarda en el navegador para que sobreviva a una recarga |
| `searchText` (texto del buscador) | `App` | `MovieSearch` es una entrada controlada que lo actualiza con `onChange`, y el estado vacío necesita poder borrarlo |
| `searchQuery` (texto con retardo) | `App`, con `useDebounce` | Se calcula a partir de `searchText` 400 ms después de la última tecla; `MovieList` filtra con él |

Los hijos no cambian el estado directamente: avisan al padre con las
funciones que reciben por props (`onToggleFavorite`, `onChange`,
`onSelectMovie`, `onClearSearch`).

## Dependencias

- `react` y `react-dom` 19.
- Desarrollo: `vite` 8, `@vitejs/plugin-react` y `oxlint`.
