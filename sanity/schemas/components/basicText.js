import {FaFileAlt} from 'react-icons/fa'

export default {
  name: 'basicText',
  title: 'Basic Text',
  type: 'object',
  icon: FaFileAlt, // Use the FaFileAlt icon
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
              // Add color option
              {title: 'Text Color', value: 'textColor'},
            ],
          },
        },
        {
          type: 'imageGallery', // Custom type for the image gallery
        },
      ],
    },
  ],
  preview: {
    select: {
      blocks: 'content',
    },
    prepare(value) {
      const block = (value.blocks || []).find((block) => block._type === 'block')
      return {
        title: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No text',
      }
    },
  },
}
