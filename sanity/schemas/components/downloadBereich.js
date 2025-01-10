export default {
  name: 'downloadBereich',
  title: 'Download Bereich',
  type: 'document',
  fields: [
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Einführungstext für den Download Bereich',
    },
    {
      name: 'downloads',
      title: 'Dateien',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'fileName',
              title: 'Dateiname',
              type: 'string',
              description: 'Name der Datei, der angezeigt werden soll',
            },
            {
              name: 'file',
              title: 'Datei',
              type: 'file',
              options: {
                accept: '.pdf',
              },
              description: 'Lade hier die PDF-Datei hoch',
            },
          ],
          preview: {
            select: {
              title: 'fileName',
              media: 'file',
            },
          },
        },
      ],
      description: 'Liste der Dateien, die heruntergeladen werden können',
    },
  ],
  preview: {
    select: {
      title: 'introText',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title && title[0] ? title[0].children[0].text : 'Download Bereich',
      }
    },
  },
}
