// schemas/event.js
import {MdEvent, MdAccessTime} from 'react-icons/md'

export default {
  name: 'event',
  title: 'Veranstaltung',
  type: 'document',
  icon: MdEvent,

  fields: [
    {
      name: 'headline',
      title: 'Überschrift',
      type: 'string',
      description: 'Die Hauptüberschrift der Veranstaltung',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subline',
      title: 'Unterüberschrift',
      type: 'string',
      description: 'Die Unterüberschrift der Veranstaltung',
    },
    {
      name: 'kategorie',
      title: 'Kategorie',
      type: 'reference',
      to: [{type: 'kategorie'}],
      description: 'Die Kategorie, zu der die Veranstaltung gehört',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'headline',
        maxLength: 200,
      },
      description: 'Der Slug für die Veranstaltung (automatisch generiert aus der Überschrift)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'datum',
      title: 'Termine',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'startDateTime',
              title: 'Startdatum und -uhrzeit',
              type: 'datetime',
              description: 'Der Startzeitpunkt der Veranstaltung',
              validation: (Rule) => Rule.required(),
              options: {
                icon: MdAccessTime, // Icon for the startDateTime field
              },
            },
            {
              name: 'endDateTime',
              title: 'Enddatum und -uhrzeit',
              type: 'datetime',
              description: 'Der Endzeitpunkt der Veranstaltung',
              validation: (Rule) => Rule.required(),
              options: {
                icon: MdAccessTime, // Icon for the startDateTime field
              },
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
                // subtitle: 'bubu', // Add a subtitle here
                media: MdAccessTime,
              }
            },
          },
        },
      ],
      description: 'Die Termine der Veranstaltung',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Hauptbild',
      type: 'image',
      description: 'Das Hauptbild für die Veranstaltung',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventDetails',
      title: 'Details',
      type: 'eventDetails',
      description: 'Weitere Details zur Veranstaltung',
    },

    {
      name: 'content',
      title: 'Inhalt',
      type: 'basicText',
      description: 'Der Inhalt der Veranstaltung (Text und Bilder)',
    },
    {
      name: 'galerie',
      title: 'Galerie',
      type: 'array',
      of: [{type: 'image'}],
      description: 'Bildergalerie zur Veranstaltung',
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'datum.0',
      media: 'image',
    },
  },
}
