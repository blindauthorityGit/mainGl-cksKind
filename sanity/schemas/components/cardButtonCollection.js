// In your "schemas" folder, create a file, e.g., "cardCollection.js"

export default {
  name: 'cardButtonCollection',
  title: 'Card Button Collection',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'cardButtons',
      title: 'Card Buttons',
      type: 'array',
      of: [
        {
          type: 'cardButton', // Reference the object type directly
        },
      ],
    },
    // Add other fields or components as needed
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title,
      }
    },
  },
}
