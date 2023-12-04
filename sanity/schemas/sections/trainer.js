// schemas/trainer.js
export default {
  name: 'trainer',
  title: 'Trainer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'kurs',
      title: 'Course',
      type: 'string',
    },
    {
      name: 'beschreibung',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}], // Using 'block' for rich text
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
}
