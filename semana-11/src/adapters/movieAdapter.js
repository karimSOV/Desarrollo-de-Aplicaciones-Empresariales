const POSTERS_PATH = '/posters/'

// Adapter pattern: turns a movie as the API sends it into the model the app
// uses. If the API changes a name, only this function has to change.
export function adaptMovie(raw) {
  return {
    id: raw.movie_id,
    title: raw.title,
    image: raw.poster_path ? POSTERS_PATH + raw.poster_path : null,
    synopsis: raw.overview ?? '',
    classification: raw.age_rating ?? 'APT',
    genre: raw.genres?.[0] ?? 'Sin género',
    duration: raw.runtime_min ?? 0,
    rating: raw.vote_average ?? null,
    showtimes: raw.schedule ? raw.schedule.split(',') : [],
    featured: Boolean(raw.is_featured),
    releaseDate: raw.release_date ?? null,
  }
}

export function adaptMovies(list) {
  return list.map(adaptMovie)
}
