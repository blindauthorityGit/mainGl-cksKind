// schemas/hero.js
export default {
  name: 'mainHero',
  title: 'MainHero',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'button', // Reference to the existing button component
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
}
