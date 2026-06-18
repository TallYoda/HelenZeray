export type Publication = {
  id: string
  title: string
  outlet: string
  year: string
  url: string
  description: string
  previewImage: string
}

export const publications: Publication[] = [
  {
    id: 'artamine-interview',
    title: 'In Conversation with Helen Zeray',
    outlet: 'Artamine Editorial',
    year: '2024',
    url: 'https://www.artamine.com/blogs/in-conversation-with/in-conversation-with-helen-zeray',
    description:
      'Editorial interview on shifting perspectives, trompe-l’oeil collage, and building a presence in the international art scene.',
    previewImage: '/press/artamine.jpg',
  },
  {
    id: 'jerusalem-post',
    title: 'Jerusalem highlights: November 1–7',
    outlet: 'The Jerusalem Post',
    year: '2024',
    url: 'https://www.jpost.com/must/article-826969',
    description:
      'Featured among Jerusalem’s cultural highlights, with coverage of Helen Zeray’s work and presence in the city’s art scene.',
    previewImage: '/press/jpost.png',
  },
  {
    id: 'reporter-ethiopia',
    title: 'Idiomatic expression',
    outlet: 'The Reporter Ethiopia',
    year: '2022',
    url: 'https://www.thereporterethiopia.com/24673/',
    description:
      'Coverage of Helen Zeray’s solo exhibition Idiomatic Expression at Hager Fiker Gallery, Addis Ababa.',
    previewImage: '/press/reporter.png',
  },
]
