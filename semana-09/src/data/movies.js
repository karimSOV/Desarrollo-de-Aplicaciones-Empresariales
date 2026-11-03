// Billboard of the cinema. The movies and posters come from the CineLab
// catalog of week 7; rating is the average score out of 10.
export const cinema = {
  name: 'CineLab',
  address: 'Av. Los Cines 123, Lima',
  phone: '(01) 555-0199',
  hours: 'Lunes a domingo, de 10:00 a 23:30',
  email: 'karim@campus.test',
}

export const movies = [
  {
    id: 1,
    title: 'Demon Slayer: Infinity Castle',
    image: '/posters/demon_slayer_infinity_castle.jpg',
    synopsis:
      'Tanjiro y el Cuerpo de Cazadores de Demonios caen en el Castillo Infinito, la fortaleza de Muzan, donde comienza la batalla final contra las Lunas Superiores.',
    classification: '+14',
    genre: 'Acción',
    duration: 155,
    rating: 10,
    showtimes: ['14:30', '17:45', '21:00'],
    featured: true,
  },
  {
    id: 2,
    title: 'El Rey León',
    image: '/posters/el_rey_leon.webp',
    synopsis:
      'Simba, heredero del trono de la sabana, huye tras la muerte de su padre y debe volver para enfrentar a su tío Scar y recuperar su lugar.',
    classification: 'APT',
    genre: 'Familiar',
    duration: 88,
    rating: 9,
    showtimes: ['11:00', '13:15', '15:30'],
  },
  {
    id: 3,
    title: 'Gladiador',
    image: '/posters/gladiador.jpg',
    synopsis:
      'Máximo, general romano traicionado por el emperador Cómodo, se convierte en gladiador para vengar a su familia en el Coliseo.',
    classification: '+14',
    genre: 'Acción',
    duration: 155,
    rating: 9,
    showtimes: ['16:00', '19:20', '22:30'],
  },
  {
    id: 4,
    title: 'La razón de estar contigo',
    image: '/posters/la_razon_de_estar_contigo.jpg',
    synopsis:
      'Un perro vive varias vidas junto a distintos dueños y en cada una busca el propósito que lo une a Ethan, su primer amigo.',
    classification: 'APT',
    genre: 'Drama',
    duration: 100,
    rating: 8.5,
    showtimes: ['12:00', '14:40', '17:10'],
  },
  {
    id: 5,
    title: 'Mad Max: Furia en el camino',
    image: '/posters/mad_max.jpg',
    synopsis:
      'En un desierto sin ley, Max y la comandante Furiosa escapan del tirano Immortan Joe en una persecución sin descanso.',
    classification: '+14',
    genre: 'Acción',
    duration: 120,
    rating: 8.1,
    showtimes: ['18:00', '20:30', '22:50'],
  },
  {
    id: 6,
    title: 'Mi pobre angelito',
    image: '/posters/mi_pobre_angelito.jpg',
    synopsis:
      'Kevin, de ocho años, se queda solo en casa durante Navidad y debe defenderla de dos ladrones con trampas ingeniosas.',
    classification: 'APT',
    genre: 'Comedia',
    duration: 103,
    rating: 8,
    showtimes: ['10:30', '12:45', '15:00'],
  },
  {
    id: 7,
    title: 'Siempre a tu lado, Hachiko',
    image: '/posters/hachiko.jpg',
    synopsis:
      'Un profesor adopta a Hachi, un perro akita que lo espera cada tarde en la estación de tren, incluso cuando él ya no vuelve.',
    classification: 'APT',
    genre: 'Drama',
    duration: 93,
    rating: 10,
    showtimes: ['13:00', '15:20', '19:00'],
  },
  {
    id: 8,
    title: 'Top Gun: Maverick',
    image: '/posters/top_gun_maverick.jpg',
    synopsis:
      'Treinta años después, Maverick vuelve a la escuela Top Gun para entrenar a un grupo de pilotos en una misión casi imposible.',
    classification: '+14',
    genre: 'Acción',
    duration: 131,
    rating: 8.2,
    showtimes: ['15:45', '18:40', '21:30'],
  },
  {
    id: 9,
    title: 'Toy Story',
    image: '/posters/toy_story.jpg',
    synopsis:
      'Woody, el vaquero favorito de Andy, se siente desplazado cuando llega Buzz Lightyear, un guardián espacial que no sabe que es un juguete.',
    classification: 'APT',
    genre: 'Familiar',
    duration: 81,
    rating: 9,
    showtimes: ['10:00', '12:10', '14:20'],
  },
  {
    id: 10,
    title: '¿Qué pasó ayer?',
    image: '/posters/que_paso_ayer.jpg',
    synopsis:
      'Tres amigos despiertan en Las Vegas sin recordar la noche anterior y con el novio desaparecido a pocas horas de la boda.',
    classification: '+14',
    genre: 'Comedia',
    duration: 100,
    rating: 7.7,
    showtimes: ['19:30', '21:40', '23:15'],
  },
]
