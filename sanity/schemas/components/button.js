// schemas/button.js
import {FiLink} from 'react-icons/fi'

export default {
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: FiLink, // Icon for the button schema
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'HauptButton',
      title: 'HauptButton',
      type: 'boolean',
      description: 'Set this to true if it is the main button.',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      label: 'label',
      link: 'link',
      HauptButton: 'HauptButton',
    },
    prepare(selection) {
      const {label, link, HauptButton} = selection
      const icon = HauptButton ? FiLink : undefined // Show link icon for the main button

      return {
        title: label,
        subtitle: link,
        media: icon,
      }
    },
  },
}
