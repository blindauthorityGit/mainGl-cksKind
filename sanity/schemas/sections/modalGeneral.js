// schemas/locations.js
export default {
  name: 'modalGeneral',
  title: 'Start Modal',
  type: 'document',
  fields: [
    {name: 'active', type: 'boolean', title: 'Aktiv?'},
    // {
    //   name: 'icon',
    //   title: 'Icon',
    //   type: 'string',
    //   inputComponent: 'iconPicker',
    // },
    {
      name: 'text',
      title: 'text',
      type: 'array',
      of: [{type: 'block'}], // Using 'block' for rich text, multiple locations possible
    },
  ],
}
