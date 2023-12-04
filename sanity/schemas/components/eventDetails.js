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
      type: 'array',
      of: [{type: 'block'}], // Using 'block' for rich text
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
      name: 'kursleiter',
      title: 'Instructor',
      type: 'reference',
      to: [{type: 'trainer'}], // Assuming 'trainer' is a valid reference type
    },
  ],
}
