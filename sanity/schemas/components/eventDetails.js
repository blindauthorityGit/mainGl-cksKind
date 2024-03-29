// schemas/details.js
export default {
  name: 'eventDetails',
  title: 'Event Details',
  type: 'object',
  fields: [
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'locations'}], // Assuming 'locations' is a valid reference type
    },
    {
      name: 'preis',
      title: 'Price',
      type: 'text',
    },
    {
      name: 'teilnehmeranzahl',
      title: 'Number of Participants',
      type: 'array',
      of: [{type: 'block'}], // Using 'block' for rich text
    },
    {
      name: 'altersgruppe',
      title: 'Age Group',
      type: 'array',
      of: [{type: 'block'}], // Using 'block' for rich text
    },
    {
      name: 'partner',
      title: 'Kursleiter',
      type: 'reference',
      to: [{type: 'partner'}], // Assuming 'trainer' is a valid reference type
    },
  ],
}
