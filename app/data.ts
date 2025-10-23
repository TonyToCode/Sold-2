import type { ImagePlaceholder } from './lib/placeholder-images';
import { PlaceHolderImages } from './lib/placeholder-images';

export const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      id: 'default',
      description: 'Default image',
      imageUrl: `https://picsum.photos/seed/default/600/400`,
      imageHint: 'abstract',
    };
  }
  return image;
};

export const artistData = {
  ARTIST_NAME: 'Sold',
  BASE_CITY: 'Moscow',
  FORMATS: 'сольное выступление',
  TG_LINK: 'https://t.me/YoungBoySold',
  LOGOS: [
    {...getImage('logo1'), name: 'Яндекс'},
    {...getImage('logo2'), name: 'Сбер'},
    {...getImage('logo3'), name: 'VK'},
    {...getImage('logo4'), name: 'Газпром'},
    {...getImage('logo5'), name: 'Тинькофф'},
  ],
  ALL_LOGOS: [
    {...getImage('logo1'), name: 'Яндекс'},
    {...getImage('logo2'), name: 'Сбер'},
    {...getImage('logo3'), name: 'VK'},
    {...getImage('logo4'), name: 'Газпром'},
    {...getImage('logo5'), name: 'Тинькофф'},
    {...getImage('logo6'), name: 'МТС'},
    {...getImage('logo7'), name: 'Avito'},
    {...getImage('logo8'), name: 'Ozon'},
  ],
  VIDEOS: [
    { ...getImage('video1'), title: 'Сольное выступление на Самуи', description: 'Полная отдача и невероятная энергетика', videoUrl: 'https://www.youtube.com/watch?v=dzTZzc8nUGM' },
    { ...getImage('video2'), title: 'Выступление на свадьбе', description: 'Создание волшебной атмосферы для особенного дня', videoUrl: 'https://www.youtube.com/watch?v=l7l4NmbALug' },
    { ...getImage('video3'), title: 'Клип собственного трека', description: 'Творчество и душа в каждой ноте', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ],
  QUOTES: [
    { text: 'Sold привнес невероятную энергию на нашу площадку. По-настоящему профессиональный и талантливый артист.', source: 'Иван, Арт-директор, The Grand Hall' },
    { text: 'Наша свадьба была идеальной, и музыка сыграла в этом огромную роль. Спасибо!', source: 'Анна и Михаил, молодожены' },
    { text: 'Это было лучшее корпоративное мероприятие за последние годы. Sold зажег публику!', source: 'Елена, HR-директор, "Технокорп"' },
    { text: 'Каждое выступление — это магия. Гости были в восторге, а мы получили массу комплиментов.', source: 'Дмитрий, владелец ресторана "La Belle"' },
  ],
  TECH_RIDER_URL: '/tech-rider-placeholder.pdf',
  PRESS_KIT_URL: '/repertoire-placeholder.pdf',
  STAGEPLOT_URL: getImage('stageplot'),
  PHONE: '+7 977 416-86-96',
  YOUTUBE: 'https://youtube.com/@bigchinatown',
  YOUTUBE2: 'https://www.youtube.com/channel/UCIAk9EobM8zOcz8o3BOBHjg',
  INSTAGRAM: 'https://www.instagram.com/still.sold',
  TELEGRAM: 'https://t.me/YoungBoySold',
  TIKTOK: 'https://www.tiktok.com/@kak_byt_psy',
  SLA_MIN: '15',
  DATES_SNIPPET: 'Доступен для бронирования в октябре. Количество мест ограничено!',
  VOICE_TOKENS: 'Леди и Джентльмены. Здравствуй, Мир.',
  BENEFITS: [
    'Интеллигентный драйв',
    'Джаз-сердце, R&B-ритм',
    'Душевная атмосфера',
  ],
  REPERTOIRE: {
    ru: [
      { title: 'Город', artist: 'Танцы Минус', hint: 'Welcome', tempo: 'Medium', mood: 'Drive' },
      { title: 'Мой рок-н-ролл', artist: 'Би-2', hint: 'Late evening', tempo: 'Slow', mood: 'Lyrical' },
      { title: 'Последний танец', artist: 'Агата Кристи', hint: 'Dance floor', tempo: 'Fast', mood: 'Drive' },
      { title: 'Владивосток 2000', artist: 'Мумий Тролль', hint: 'Dance floor', tempo: 'Medium', mood: 'Drive' },
      { title: 'Вечно молодой', artist: 'Смысловые Галлюцинации', hint: 'Late evening', tempo: 'Slow', mood: 'Lyrical' },
    ],
    en: [
      { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', hint: 'Welcome', tempo: 'Slow', mood: 'Lyrical' },
      { title: 'My Way', artist: 'Frank Sinatra', hint: 'Late evening', tempo: 'Slow', mood: 'Lyrical' },
      { title: 'What a Wonderful World', artist: 'Louis Armstrong', hint: 'Welcome', tempo: 'Slow', mood: 'Lyrical' },
      { title: 'Autumn Leaves', artist: 'Joseph Kosma', hint: 'Late evening', tempo: 'Medium', mood: 'Lyrical' },
      { title: 'All of Me', artist: 'Gerald Marks & Seymour Simons', hint: 'Dance floor', tempo: 'Fast', mood: 'Drive' },
      { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', hint: 'Dance floor', tempo: 'Fast', mood: 'Drive' },
      { title: 'Valerie', artist: 'Amy Winehouse', hint: 'Dance floor', tempo: 'Fast', mood: 'Drive' },
      { title: 'Wonderwall', artist: 'Oasis', hint: 'Welcome', tempo: 'Medium', mood: 'Lyrical' },
      { title: 'Cry Me a River', artist: 'Arthur Hamilton', hint: 'Late evening', tempo: 'Slow', mood: 'Lyrical' },
      { title: 'Feeling Good', artist: 'Nina Simone', hint: 'Welcome', tempo: 'Medium', mood: 'Drive' },
      { title: 'Summertime', artist: 'George Gershwin', hint: 'Welcome', tempo: 'Slow', mood: 'Lyrical' },
      { title: 'Georgia on My Mind', artist: 'Ray Charles', hint: 'Late evening', tempo: 'Slow', mood: 'Lyrical' },
      { title: 'The Girl from Ipanema', artist: 'Antônio Carlos Jobim', hint: 'Welcome', tempo: 'Medium', mood: 'Lyrical' },
      { title: 'Take Five', artist: 'Dave Brubeck Quartet', hint: 'Dance floor', tempo: 'Fast', mood: 'Drive' },
      { title: 'So What', artist: 'Miles Davis', hint: 'Late evening', tempo: 'Medium', mood: 'Drive' },
      { title: 'Cheek to Cheek', artist: 'Irving Berlin', hint: 'Dance floor', tempo: 'Fast', mood: 'Lyrical'},
      { title: 'Blue Bossa', artist: 'Kenny Dorham', hint: 'Welcome', tempo: 'Medium', mood: 'Drive'},
      { title: 'Round Midnight', artist: 'Thelonious Monk', hint: 'Late evening', tempo: 'Slow', mood: 'Lyrical'},
      { title: 'Spain', artist: 'Chick Corea', hint: 'Dance floor', tempo: 'Fast', mood: 'Drive'},
      { title: 'Cantaloupe Island', artist: 'Herbie Hancock', hint: 'Welcome', tempo: 'Medium', mood: 'Drive'},
      { title: 'Lullaby of Birdland', artist: 'George Shearing', hint: 'Welcome', tempo: 'Medium', mood: 'Lyrical'},
      { title: 'Misty', artist: 'Erroll Garner', hint: 'Late evening', tempo: 'Slow', mood: 'Lyrical'},
      { title: 'Body and Soul', artist: 'Johnny Green', hint: 'Late evening', tempo: 'Slow', mood: 'Lyrical'}
    ],
  },
  tempos: ['Slow', 'Medium', 'Fast'],
  moods: ['Lyrical', 'Drive'],
  compositions: [],
};
