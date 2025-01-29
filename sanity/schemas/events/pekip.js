// schemas/pekip.js
import {MdEvent} from 'react-icons/md'

export default {
  name: 'pekip',
  title: 'PEKiP-Kurs',
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
      title: 'Kursname',
      type: 'string',
      description: 'Name des PEKiP-Kurses',
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
      validation: (Rule) => Rule.required(),
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
      name: 'pekipSingle',
      title: 'Pekip Einzelseite',
      type: 'boolean',
    },
    {
      name: 'recurringSessions',
      title: 'Dauerhafte Termine',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'subTitle',
              title: 'SUb Title',
              type: 'string',
            },
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description: 'Leave empty if the event does not end',
            },
            {
              name: 'recurrence',
              title: 'Recurrence',
              type: 'string',
              options: {
                list: [
                  {title: 'Weekly', value: 'weekly'},
                  // Add other recurrence patterns as needed
                ],
              },
            },
            {
              name: 'dayOfWeek',
              title: 'Day of Week',
              type: 'number',
              description:
                'For weekly events, the day of the week the event occurs on: 0 = Sunday, 1= Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday',
              validation: (Rule) => Rule.min(0).max(6).integer(),
            },
            {
              name: 'timeslot',
              title: 'Timeslot',
              type: 'object',
              fields: [
                {
                  name: 'startTime',
                  title: 'Start Time',
                  type: 'string',
                  description: 'Format: HH:mm',
                  validation: (Rule) =>
                    Rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                      name: 'valid time format',
                      invert: false,
                    }),
                },
                {
                  name: 'endTime',
                  title: 'End Time',
                  type: 'string',
                  description: 'Format: HH:mm',
                  validation: (Rule) =>
                    Rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                      name: 'valid time format',
                      invert: false,
                    }),
                },
              ],
            },
            {
              name: 'anfrage',
              title: 'Anfrage',
              type: 'boolean',
              description: 'Gibt an, ob die Veranstaltung auf Anfrage ist',
            },
            {
              name: 'trainer',
              title: 'Trainer',
              type: 'reference',
              to: [{type: 'partner'}],
              description: 'Trainer, der diesen Termin leitet',
            },
          ],
        },
      ],
      description: 'Wiederkehrende Termine für diesen Kurs',
    },
    {
      name: 'singleSessions',
      title: 'Einzelne Termine',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Datum',
              type: 'date',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'timeSlot',
              title: 'Uhrzeit',
              type: 'object',
              fields: [
                {
                  name: 'startTime',
                  title: 'Startzeit',
                  type: 'string',
                  description: 'Format: HH:mm',
                  validation: (Rule) =>
                    Rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                      name: 'valid time format',
                      invert: false,
                    }),
                },
                {
                  name: 'endTime',
                  title: 'Endzeit',
                  type: 'string',
                  description: 'Format: HH:mm',
                  validation: (Rule) =>
                    Rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                      name: 'valid time format',
                      invert: false,
                    }),
                },
              ],
            },
            // {
            //   name: 'trainer',
            //   title: 'Trainer',
            //   type: 'reference',
            //   to: [{type: 'trainer'}],
            //   description: 'Trainer, der diesen Termin leitet',
            // },
          ],
        },
      ],
      description: 'Einzeltermine für diesen Kurs',
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
      name: 'image',
      title: 'Kursbild',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Bild für den Kurs',
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'description',
      media: 'image',
    },
  },
}
