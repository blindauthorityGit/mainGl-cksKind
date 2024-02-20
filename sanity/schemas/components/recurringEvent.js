export default {
  name: 'recurringEvent',
  title: 'Recurring Event',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      description: 'For weekly events, the day of the week the event occurs on',
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
    // Include any other fields relevant to the event
  ],
}
