import {MdAccessTime} from 'react-icons/md'

export default {
  name: 'datumField',
  title: 'Termine',
  type: 'object',

  fields: [
    {
      name: 'startDateTime',
      title: 'Startdatum und -uhrzeit',
      type: 'datetime',
      description: 'Der Startzeitpunkt der Veranstaltung',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endDateTime',
      title: 'Enddatum und -uhrzeit',
      type: 'datetime',
      description: 'Der Endzeitpunkt der Veranstaltung',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      startDateTime: 'startDateTime',
      endDateTime: 'endDateTime',
    },
    prepare(selection) {
      const {startDateTime, endDateTime} = selection

      const formattedStartDate = new Date(startDateTime).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })

      const formattedEndDate = new Date(endDateTime).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })

      return {
        title: `${formattedStartDate} - ${formattedEndDate}`,
        media: MdAccessTime,
      }
    },
  },

  description: 'Die Termine der Veranstaltung',
  validation: (Rule) => Rule.required(),
}
