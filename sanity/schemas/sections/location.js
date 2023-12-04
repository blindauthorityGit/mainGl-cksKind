// schemas/locations.js
export default {
  name: 'locations',
  title: 'Locations',
  type: 'document',
  fields: [
    {
      name: 'location',
      title: 'Location',
      type: 'array',
      of: [{type: 'block'}], // Using 'block' for rich text, multiple locations possible
    },
  ],
}
