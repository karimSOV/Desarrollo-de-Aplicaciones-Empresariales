# Semana 11 — React: comunicación entre componentes

Continuación de la cartelera de CineLab de la [semana 10](../semana-10). Se
trabaja en la rama `semana-11` del repositorio. Se agregan:

- el patrón adaptador para los datos de las películas;
- avisos emergentes con la biblioteca `react-hot-toast`;
- los hooks propios `useDebounce`, `useWindowSize` y `usePremieres`;
- la sección de estrenos con esqueleto de carga, carrusel con pósters y estado de error;
- el contador de favoritas en la cabecera y el botón para limpiar el filtro.

## Cómo ejecutarlo

Requiere Node.js 20 o superior.

```powershell
cd semana-11
npm install
npm run dev
```

Luego abrir <http://localhost:5173/>. Para ver el estado de error de los
estrenos, abrir <http://localhost:5173/?estrenos=error>: el primer intento
falla a propósito y «Reintentar» carga los datos.

## Estructura

```text
src/
├── App.jsx                  ancestro común: estado compartido y composición
├── adapters/
│   └── movieAdapter.js      adapta los datos de la API al modelo de la app
├── data/
│   ├── movies.js            cartelera en formato de API
│   └── premieres.js         estrenos en formato de API
├── hooks/
│   ├── useDebounce.js       retardo del buscador
│   ├── useWindowSize.js     ancho y alto de la ventana
│   └── usePremieres.js      petición simulada: cargando, datos o error
├── components/
│   ├── Button/  Header/  Hero/  MovieSearch/  MovieList/  MovieCard/  Footer/
│   ├── PremieresSection/    sección que muestra cada estado de la petición
│   ├── PremiereCarousel/    carrusel de estrenos
│   └── Skeleton/            bloque de carga
└── styles/
    ├── variables.css
    └── global.css           base, tipografía, formularios y utilidades
```

## Árbol de componentes y dónde vive cada dato

```text
App            selectedMovie, favoriteIds, searchText (+ searchQuery con useDebounce)
├── Header           recibe favoriteCount (solo el número)
├── Hero             recibe movie (selectedMovie)
│   └── MovieSearch  recibe searchText y avisa con onChange y onClear
├── PremieresSection usePremieres (status, premieres, error) y useWindowSize
│   └── PremiereCarousel recibe premieres y cardsPerView
├── MovieList        recibe searchQuery y favoriteIds; useWindowSize para las columnas
│   └── MovieCard    recibe isFavorite y avisa con onToggleFavorite
└── Footer           recibe cinema
```

El contador de favoritas no puede vivir en `Header`: quien cambia las
favoritas es `MovieCard`, que está en otra rama del árbol, y los hermanos no se
comunican directamente. Por eso la lista vive en `App`, el ancestro común, y
`Header` recibe solo `favoriteIds.length`.

## Hooks propios

| Hook | Qué lógica extrae | Quién lo usa |
| --- | --- | --- |
| `useDebounce` | Esperar a que el valor deje de cambiar | `App` (buscador) |
| `useWindowSize` | Escuchar el tamaño de la ventana | `MovieList` y `PremieresSection` |
| `usePremieres` | Petición con estados de carga, datos y error | `PremieresSection` |

## Dependencias

- `react`, `react-dom` 19 y `react-hot-toast` (avisos emergentes).
- Desarrollo: `vite` 8, `@vitejs/plugin-react` y `oxlint`.
