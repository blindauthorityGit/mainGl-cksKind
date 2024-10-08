// schemas/event.js
import {MdEvent, MdAccessTime} from 'react-icons/md'

export default {
  name: 'event',
  title: 'Veranstaltung',
  type: 'document',
  icon: MdEvent,

  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
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
      name: 'blocks',
      title: 'Blöcke',
      type: 'array',
      of: [{type: 'eventBlock'}],
      description: 'Blöcke mit Terminen für die Veranstaltung',
    },
    {
      name: 'recurringDates',
      title: 'Dauerhafte Termine',
      type: 'array', // Change this to array to allow multiple recurring events
      of: [{type: 'recurringEvent'}],
      description: 'Blöcke mit wiederkehrenden Terminen für die Veranstaltung',
    },
    {
      name: 'datum',
      title: 'Einzel-Termine',
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
      description: 'Die Einzeltermine der Veranstaltung',
      // validation: (Rule) => Rule.required(),
    },
    {
      name: 'isBlock',
      title: 'Ist Block',
      type: 'boolean',
      description: 'Gibt an, ob die Veranstaltung ein Blockangebot hat',
    },
    {
      name: 'blockLength',
      title: 'Blocklänge',
      type: 'number',
      description: 'Die Länge der Blocks in EInheiten',
      validation: (Rule) =>
        Rule.min(1).max(24).warning('Die Blocklänge sollte zwischen 1 und 24 Stunden liegen.'),
    },
    {
      name: 'anfrage',
      title: 'Anfrage',
      type: 'boolean',
      description: 'Gibt an, ob die Veranstaltung auf Anfrage ist',
    },
    {
      name: 'produkte',
      title: 'Produkte',
      type: 'array',
      of: [{type: 'product'}],
      description: 'Liste der Produkte mit Titel und Preis',
    },
    {
      name: 'image',
      title: 'Hauptbild',
      type: 'image',
      description: 'Das Hauptbild für die Veranstaltung, optimale Auflösung 1600px x 1068px',
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
      name: 'description',
      title: 'Kurzbeschreibung',
      type: 'text',

      description: 'Der Inhalt der Veranstaltung (Text und Bilder, max 80 Zeichen)',
    },
    {
      name: 'pdfUploads',
      title: 'PDF Uploads',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'pdfFile',
              title: 'PDF Datei',
              type: 'file',
              options: {
                accept: '.pdf',
              },
            },
            {
              name: 'pdfTitle',
              title: 'Titel der PDF',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'pdfText',
              title: 'Text für PDF',
              type: 'text', // Assuming you have a 'blockContent' type for rich text
              // validation: (Rule) => Rule.required(),
            },
            {
              name: 'buttonLabel',
              title: 'Button Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: 'Liste der hochgeladenen PDFs mit Titel, Text und Button-Beschriftung',
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
