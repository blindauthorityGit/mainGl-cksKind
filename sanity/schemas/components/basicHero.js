// schemas/hero.js
export default {
  name: 'basicHero',
  title: 'BasicHero',
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
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
}
