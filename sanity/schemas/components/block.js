// schemas/hero.js
export default {
  name: 'eventBlock',
  title: 'Block',
  type: 'object',
  fields: [
    {
      name: 'blockTitle',
      title: 'Block Titel',
      type: 'string',
    },
    {
      name: 'blockSubline',
      title: 'Block Subtitel',
      type: 'string',
    },

    {
      name: 'dates',
      title: 'Termine',
      type: 'array',
      of: [
        {
          type: 'datumField', // Reference to the existing button component
        },
      ],
    },
    {
      name: 'ausgebucht',
      title: 'Ausgebucht',
      type: 'boolean',
    },
    {
      name: 'warteliste',
      title: 'Warteliste',
      type: 'boolean',
    },
    {
      name: 'einstieg',
      title: 'Späterer Einstieg möglich',
      type: 'boolean',
    },
  ],
}
