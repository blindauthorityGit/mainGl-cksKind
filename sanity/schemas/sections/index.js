// schemas/section.js
export default {
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    {
      name: 'component',
      title: 'Component',
      type: 'reference',
      to: [{type: 'mainHero'}], // Add other custom component types as needed
    },
  ],
}
