// Cinema information.
export const cinema = {
  name: 'CineLab',
  address: 'Av. Los Cines 123, Lima',
  phone: '(01) 555-0199',
  hours: 'Lunes a domingo, de 10:00 a 23:30',
  email: 'karim@campus.test',
}

// Billboard as a movie API would send it: the field names and formats are not
// the ones the app uses, so every movie goes through adaptMovie first.
// The movies and posters come from the CineLab catalog of week 7.
export const billboardResponse = [
  {
    movie_id: 1,
    title: 'Demon Slayer: Infinity Castle',
    poster_path: 'demon_slayer_infinity_castle.jpg',
    overview:
      'Tanjiro y el Cuerpo de Cazadores de Demonios caen en el Castillo Infinito, la fortaleza de Muzan, donde comienza la batalla final contra las Lunas Superiores.',
    age_rating: '+14',
    genres: ['Acción', 'Animación'],
    runtime_min: 155,
    vote_average: 10,
    schedule: '14:30,17:45,21:00',
    is_featured: true,
  },
  {
    movie_id: 2,
    title: 'El Rey León',
    poster_path: 'el_rey_leon.webp',
    overview:
      'Simba, heredero del trono de la sabana, huye tras la muerte de su padre y debe volver para enfrentar a su tío Scar y recuperar su lugar.',
    age_rating: 'APT',
    genres: ['Familiar'],
    runtime_min: 88,
    vote_average: 9,
    schedule: '11:00,13:15,15:30',
  },
  {
    movie_id: 3,
    title: 'Gladiador',
    poster_path: 'gladiador.jpg',
    overview:
      'Máximo, general romano traicionado por el emperador Cómodo, se convierte en gladiador para vengar a su familia en el Coliseo.',
    age_rating: '+14',
    genres: ['Acción', 'Drama'],
    runtime_min: 155,
    vote_average: 9,
    schedule: '16:00,19:20,22:30',
  },
  {
    movie_id: 4,
    title: 'La razón de estar contigo',
    poster_path: 'la_razon_de_estar_contigo.jpg',
    overview:
      'Un perro vive varias vidas junto a distintos dueños y en cada una busca el propósito que lo une a Ethan, su primer amigo.',
    age_rating: 'APT',
    genres: ['Drama'],
    runtime_min: 100,
    vote_average: 8.5,
    schedule: '12:00,14:40,17:10',
  },
  {
    movie_id: 5,
    title: 'Mad Max: Furia en el camino',
    poster_path: 'mad_max.jpg',
    overview:
      'En un desierto sin ley, Max y la comandante Furiosa escapan del tirano Immortan Joe en una persecución sin descanso.',
    age_rating: '+14',
    genres: ['Acción'],
    runtime_min: 120,
    vote_average: 8.1,
    schedule: '18:00,20:30,22:50',
  },
  {
    movie_id: 6,
    title: 'Mi pobre angelito',
    poster_path: 'mi_pobre_angelito.jpg',
    overview:
      'Kevin, de ocho años, se queda solo en casa durante Navidad y debe defenderla de dos ladrones con trampas ingeniosas.',
    age_rating: 'APT',
    genres: ['Comedia'],
    runtime_min: 103,
    vote_average: 8,
    schedule: '10:30,12:45,15:00',
  },
  {
    movie_id: 7,
    title: 'Siempre a tu lado, Hachiko',
    poster_path: 'hachiko.jpg',
    overview:
      'Un profesor adopta a Hachi, un perro akita que lo espera cada tarde en la estación de tren, incluso cuando él ya no vuelve.',
    age_rating: 'APT',
    genres: ['Drama'],
    runtime_min: 93,
    vote_average: 10,
    schedule: '13:00,15:20,19:00',
  },
  {
    movie_id: 8,
    title: 'Top Gun: Maverick',
    poster_path: 'top_gun_maverick.jpg',
    overview:
      'Treinta años después, Maverick vuelve a la escuela Top Gun para entrenar a un grupo de pilotos en una misión casi imposible.',
    age_rating: '+14',
    genres: ['Acción', 'Drama'],
    runtime_min: 131,
    vote_average: 8.2,
    schedule: '15:45,18:40,21:30',
  },
  {
    movie_id: 9,
    title: 'Toy Story',
    poster_path: 'toy_story.jpg',
    overview:
      'Woody, el vaquero favorito de Andy, se siente desplazado cuando llega Buzz Lightyear, un guardián espacial que no sabe que es un juguete.',
    age_rating: 'APT',
    genres: ['Familiar', 'Animación'],
    runtime_min: 81,
    vote_average: 9,
    schedule: '10:00,12:10,14:20',
  },
  {
    movie_id: 10,
    title: '¿Qué pasó ayer?',
    poster_path: 'que_paso_ayer.jpg',
    overview:
      'Tres amigos despiertan en Las Vegas sin recordar la noche anterior y con el novio desaparecido a pocas horas de la boda.',
    age_rating: '+14',
    genres: ['Comedia'],
    runtime_min: 100,
    vote_average: 7.7,
    schedule: '19:30,21:40,23:15',
  },
]
