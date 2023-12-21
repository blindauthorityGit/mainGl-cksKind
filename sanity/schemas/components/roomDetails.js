// Import the desired icon
import {MdOutlineMeetingRoom} from 'react-icons/md'

export default {
  name: 'roomDetails',
  title: 'Room Details',
  type: 'object',
  icon: MdOutlineMeetingRoom, // Set the icon for this component type
  fields: [
    {
      name: 'flaeche',
      title: 'Fläche',
      type: 'text',
    },
    {
      name: 'raumaufteilung',
      title: 'Raumaufteilung',
      type: 'text',
    },
    {
      name: 'besucherkapazitaet',
      title: 'Besucherkapazität',
      type: 'text',
    },
    {
      name: 'ausstattung',
      title: 'Ausstattung',
      type: 'text',
    },
    {
      name: 'ansprechpartner',
      title: 'Ansprechpartner',
      type: 'array',
      of: [
        {
          name: 'kontaktperson',
          title: 'Kontaktperson',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
          ],
        },
      ],
    },
  ],
}
