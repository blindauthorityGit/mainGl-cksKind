// schemas/card.js
import {FiCreditCard} from 'react-icons/fi' // You can replace this with your preferred icon

export default {
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: FiCreditCard, // Icon for the card schema
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{type: 'block'}], // You can customize this based on your requirements
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button', // Assuming you've defined a button schema
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'farbe',
      title: 'Farbe',
      type: 'simplerColor',
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare(selection) {
      const {title, image} = selection

      return {
        title,
        media: image,
      }
    },
  },
}
