// exceptions.js
export default {
  name: 'exceptions',
  type: 'object',
  title: 'Öffnungszeiten Ausnahmen',
  fields: [
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      description: 'Datum geschlossen',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      description: 'Grund für Schließung (optional)',
    },
  ],
}
