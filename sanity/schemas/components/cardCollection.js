// schemas/cardCollection.js
import {FaStream} from 'react-icons/fa' // You can replace this with your preferred icon

export default {
  name: 'cardCollection',
  title: 'Card Collection',
  type: 'object',
  icon: FaStream, // Icon for the card collection schema
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{type: 'card'}], // Reference to the card schema
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
