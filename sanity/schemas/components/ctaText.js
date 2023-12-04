// schemas/ctaText.js
import {MdTextFields} from 'react-icons/md' // You can replace this with your preferred icon

export default {
  name: 'ctaText',
  title: 'CTA Text',
  type: 'object',
  icon: MdTextFields, // Icon for the ctaText schema
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
      name: 'button',
      title: 'Button',
      type: 'button', // Assuming 'button' is the name of your button schema
    },
  ],
}
