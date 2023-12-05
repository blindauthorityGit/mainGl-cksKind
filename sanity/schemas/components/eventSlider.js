// schemas/components/eventSlider.js
import {FaCalendar} from 'react-icons/fa'

export default {
  name: 'eventslider',
  title: 'Event Slider',
  type: 'object',
  icon: FaCalendar,
  fields: [
    {
      name: 'isActive',
      title: 'Ist aktiv',
      type: 'boolean',
      initialValue: true, // Set initially to true
      description: 'Aktivieren Sie den Event-Slider.',
    },
  ],
  preview: {
    select: {
      title: 'isActive',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: 'Event Slider',
        subtitle: subtitle || 'Aktuelle Events anzeigen',
        media: FaCalendar, // Add your logic here to display the icon as media
      }
    },
  },
}
