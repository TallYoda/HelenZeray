export type Publication = {
  id: string
  title: string
  outlet: string
  year: string
  url: string
  description: string
}

export const publications: Publication[] = [
  {
    id: 'artamine-profile',
    title: 'Helen Zeray — Artist Profile',
    outlet: 'Artamine',
    year: '2024',
    url: 'https://www.artamine.com/pages/artist/helen-zeray',
    description:
      'Gallery profile featuring the View from Beyond series and selected works available through Artamine.',
  },
  {
    id: 'artamine-interview',
    title: 'In Conversation with Helen Zeray',
    outlet: 'Artamine Editorial',
    year: '2024',
    url: 'https://www.artamine.com/blogs/in-conversation-with/in-conversation-with-helen-zeray',
    description:
      'Editorial interview on shifting perspectives, trompe-l’oeil collage, and building a presence in the international art scene.',
  },
]
