// In your "schemas" folder, create a file, e.g., "cardButton.js"
import {BiSolidCard} from 'react-icons/bi'

export default {
  name: 'cardButton',
  title: 'Card Button',
  type: 'object',
  icon: BiSolidCard,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image', // Store the icon name as a string
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string', // Store the icon name as a string
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'isMain',
      title: 'Is Main',
      type: 'boolean',
      description: 'Set as the main card button (default is false)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare(selection) {
      const {title, icon} = selection
      return {
        title,
      }
    },
  },
}
