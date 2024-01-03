import {BiFoodMenu} from 'react-icons/bi'

export default {
  name: 'speisekarte',
  title: 'Speisekarte',
  type: 'document',
  icon: BiFoodMenu,
  fields: [
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'speiseKategorie',
        },
      ],
    },
  ],
}
