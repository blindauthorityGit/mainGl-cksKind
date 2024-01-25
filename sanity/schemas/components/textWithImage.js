// schemas/textWithImage.js
import {FaImage} from 'react-icons/fa'

export default {
  name: 'textWithImage',
  title: 'Text mit Bild',
  type: 'object',
  icon: FaImage,
  fields: [
    {
      name: 'headline',
      title: 'Überschrift',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'array',
      of: [{type: 'image'}], // Reference to the card schema
    },
    {
      name: 'rightImage',
      title: 'Bild rechts anzeigen',
      type: 'boolean',
      description: 'Setzen Sie dies auf true, um das Bild rechts anzuzeigen.',
      initialValue: false,
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
      rightImage: 'rightImage',
    },
    prepare(selection) {
      const {title, media, rightImage} = selection
      const subtitle = rightImage ? 'Bild rechts' : 'Bild links'

      return {
        title: 'Text mit Bild',
        subtitle: title,
        FaImage,
      }
    },
  },
}
