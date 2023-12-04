// schemas/fullImageWidthText.js
import {FaFileImage} from 'react-icons/fa' // You can replace this with your preferred icon

export default {
  name: 'fullImageWidthText',
  title: 'Text mit voller Bildbreite',
  type: 'object',
  icon: FaFileImage, // Different icon for the fullImageWidthText schema
  fields: [
    {
      name: 'headline',
      title: 'Überschrift',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button',
      description: 'Optionaler Button für zusätzliche Aktionen.',
    },
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection

      return {
        title: 'Text mit voller Bildbreite',
        subtitle: title,
        FaFileImage,
      }
    },
  },
}
